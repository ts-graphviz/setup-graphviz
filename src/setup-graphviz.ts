import core from '@actions/core';
import { Installer } from './Installer';

async function run() {
  try {
    const installer = new Installer();
    await installer.get();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
