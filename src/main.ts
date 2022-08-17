import { setFailed } from '@actions/core';
import { GraphvizInstaller } from './GraphvizInstaller';

async function run() {
  try {
    const installer = new GraphvizInstaller();
    await installer.get();
  } catch (error) {
    setFailed((error as Error).message);
  }
}

run();
