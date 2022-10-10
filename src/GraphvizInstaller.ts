import { getInput } from '@actions/core';
import { exec } from '@actions/exec';

export class GraphvizInstaller {
  public async get() {
    await this.install();
  }
  private async install() {
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

  private async brewInstall() {
    await exec('brew', ['update']);
    await exec('brew', [
      'install',
      'graphviz',
    ]);
  }

  private async getAptInstall() {
    const graphvizVersion = getInput('ubuntu-graphviz-version');
    const libgraphvizdevVersion = getInput('ubuntu-libgraphvizdev-version');
    await exec('sudo', ['apt-get', 'update']);
    await exec('sudo', [
      'apt-get',
      'install',
      '-y',
      graphvizVersion ? `graphviz=${graphvizVersion}` : 'graphviz',
      // https://github.com/pygraphviz/pygraphviz/issues/163#issuecomment-570770201
      libgraphvizdevVersion ? `libgraphviz-dev=${libgraphvizdevVersion}` : 'libgraphviz-dev',
      'pkg-config',
    ]);
  }

  private async chocoInstall() {
    const graphvizVersion = getInput('window-graphviz-version');
    await exec('choco', [
      'install',
      'graphviz',
      ...(graphvizVersion ? [`--version=${graphvizVersion}`]: [])
    ]);
  }
}
