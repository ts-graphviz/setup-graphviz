import { setFailed } from '@actions/core';
import { Installer } from './Installer.js';

async function run() {
  try {
    const installer = new Installer();
    await installer.get();
  } catch (error) {
    setFailed((error as Error).message);
  }
}

run();
