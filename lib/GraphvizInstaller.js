"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphvizInstaller = void 0;
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
class GraphvizInstaller {
    async get() {
        await this.install();
    }
    async install() {
        switch (process.platform) {
            case "darwin":
                await this.brewInstall();
                break;
            case "linux":
                await this.getAptInstall();
                break;
            case "win32":
                await this.chocoInstall();
                break;
            default:
                throw new Error(`platform '${process.platform}' is not yet supported`);
        }
    }
    async brewInstall() {
        const skipBrewUpdate = (0, core_1.getBooleanInput)("macos-skip-brew-update");
        if (skipBrewUpdate === false) {
            await (0, exec_1.exec)("brew", ["update"]);
        }
        await (0, exec_1.exec)("brew", ["install", "graphviz"]);
    }
    async getAptInstall() {
        const skipAptUpdate = (0, core_1.getBooleanInput)("ubuntu-skip-apt-update");
        const graphvizVersion = (0, core_1.getInput)("ubuntu-graphviz-version");
        const libgraphvizdevVersion = (0, core_1.getInput)("ubuntu-libgraphvizdev-version");
        if (skipAptUpdate === false) {
            await (0, exec_1.exec)("sudo", ["apt-get", "clean"]);
            // https://github.com/actions/runner-images/issues/9733#issuecomment-2074565599
            await (0, exec_1.exec)("sudo", [
                "sudo",
                "rm",
                "/etc/apt/sources.list.d/microsoft-prod.list",
            ]);
            await (0, exec_1.exec)("sudo", ["apt-get", "update"]);
        }
        await (0, exec_1.exec)("sudo", [
            "apt-get",
            "install",
            "-y",
            graphvizVersion ? `graphviz=${graphvizVersion}` : "graphviz",
            // https://github.com/pygraphviz/pygraphviz/issues/163#issuecomment-570770201
            libgraphvizdevVersion
                ? `libgraphviz-dev=${libgraphvizdevVersion}`
                : "libgraphviz-dev",
            "pkg-config",
        ]);
    }
    async chocoInstall() {
        const graphvizVersion = (0, core_1.getInput)("windows-graphviz-version");
        await (0, exec_1.exec)("choco", [
            "install",
            "graphviz",
            ...(graphvizVersion ? [`--version=${graphvizVersion}`] : []),
        ]);
    }
}
exports.GraphvizInstaller = GraphvizInstaller;
