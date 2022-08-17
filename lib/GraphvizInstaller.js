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
            case 'darwin':
                await this.brewInstall();
                break;
            case 'linux':
                await this.getAptInstall();
                break;
            case 'win32':
                await this.chocoInstall();
                break;
            default:
                throw new Error(`platform '${process.platform}' is not yet supported`);
        }
    }
    async brewInstall() {
        const graphvizVersion = (0, core_1.getInput)('macos-graphviz-version');
        await (0, exec_1.exec)('brew', ['update']);
        await (0, exec_1.exec)('brew', [
            'install',
            graphvizVersion ? `graphviz@${graphvizVersion}` : 'graphviz',
        ]);
    }
    async getAptInstall() {
        const graphvizVersion = (0, core_1.getInput)('ubuntu-graphviz-version');
        const libgraphvizdevVersion = (0, core_1.getInput)('ubuntu-libgraphvizdev-version');
        await (0, exec_1.exec)('sudo', ['apt-get', 'update']);
        await (0, exec_1.exec)('sudo', [
            'apt-get',
            'install',
            graphvizVersion ? `graphviz=${graphvizVersion}` : 'graphviz',
            // https://github.com/pygraphviz/pygraphviz/issues/163#issuecomment-570770201
            libgraphvizdevVersion ? `libgraphviz-dev=${libgraphvizdevVersion}` : 'libgraphviz-dev',
            'pkg-config',
        ]);
    }
    async chocoInstall() {
        const graphvizVersion = (0, core_1.getInput)('window-graphviz-version');
        await (0, exec_1.exec)('choco', [
            'install',
            'graphviz',
            ...(graphvizVersion ? [`--version=${graphvizVersion}`] : [])
        ]);
    }
}
exports.GraphvizInstaller = GraphvizInstaller;
