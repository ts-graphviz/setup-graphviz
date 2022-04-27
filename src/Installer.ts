import { exec } from '@actions/exec';

export class Installer {
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
    await exec('brew', ['install', 'graphviz@3.0.0']);
  }

  private async getAptInstall() {
    await exec('apt-get', ['update']);
    await exec('apt-get', [
      'install',
      'graphviz=3.0.0',
      // https://github.com/pygraphviz/pygraphviz/issues/163#issuecomment-570770201
      'libgraphviz-dev=2.42.2',
      'pkg-config',
    ]);
  }

  private async chocoInstall() {
    await exec('choco', ['install', 'graphviz', '--version=2.49.3']);
  }
}
