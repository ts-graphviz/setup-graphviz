"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = require("@actions/exec");
class Installer {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.install();
        });
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (process.platform) {
                case 'darwin':
                    yield this.brewInstall();
                    break;
                case 'linux':
                    yield this.getAptInstall();
                    break;
                case 'win32':
                    yield this.chocoInstall();
                    break;
                default:
                    throw new Error(`platform '${process.platform}' is not yet supported`);
            }
        });
    }
    brewInstall() {
        return __awaiter(this, void 0, void 0, function* () {
            yield exec_1.exec('brew', ['update']);
            yield exec_1.exec('brew', ['install', 'graphviz']);
        });
    }
    getAptInstall() {
        return __awaiter(this, void 0, void 0, function* () {
            yield exec_1.exec('sudo', ['apt-get', 'update']);
            yield exec_1.exec('sudo', ['apt-get', 'install', 'graphviz']);
        });
    }
    chocoInstall() {
        return __awaiter(this, void 0, void 0, function* () {
            yield exec_1.exec('choco', ['install', 'graphviz']);
        });
    }
}
exports.Installer = Installer;
