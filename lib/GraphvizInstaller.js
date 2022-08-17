"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphvizInstaller = void 0;
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
        await (0, exec_1.exec)('brew', ['update']);
        await (0, exec_1.exec)('brew', ['install', 'graphviz']);
    }
    async getAptInstall() {
        await (0, exec_1.exec)('apt-get', ['-y', 'update']);
        await (0, exec_1.exec)('apt-get', [
            '-y',
            'install',
            'graphviz',
            // https://github.com/pygraphviz/pygraphviz/issues/163#issuecomment-570770201
            'libgraphviz-dev',
            'pkg-config',
        ]);
    }
    async chocoInstall() {
        await (0, exec_1.exec)('choco', ['install', 'graphviz']);
    }
}
exports.GraphvizInstaller = GraphvizInstaller;
