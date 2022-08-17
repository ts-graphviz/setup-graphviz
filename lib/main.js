"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const GraphvizInstaller_1 = require("./GraphvizInstaller");
async function run() {
    try {
        const installer = new GraphvizInstaller_1.GraphvizInstaller();
        await installer.get();
    }
    catch (error) {
        (0, core_1.setFailed)(error.message);
    }
}
run();
