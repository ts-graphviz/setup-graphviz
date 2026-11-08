import { getBooleanInput, getInput, info, warning } from "@actions/core";
import { exec } from "@actions/exec";

/** How many times `choco install graphviz` is tried on Windows. */
const WINDOWS_INSTALL_ATTEMPTS = 3;

/** The wait before the next attempt: 30 s, then 60 s. */
const WINDOWS_RETRY_DELAY_MS = 30_000;

export interface GraphvizInstallerOptions {
  /** Waits before a retry; replaced in tests. */
  sleep?: (ms: number) => Promise<void>;
}

export class GraphvizInstaller {
  private readonly sleep: (ms: number) => Promise<void>;

  constructor(options: GraphvizInstallerOptions = {}) {
    this.sleep =
      options.sleep ??
      ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  }

  public async get() {
    await this.install();
  }
  private async install() {
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

  private async brewInstall() {
    const skipBrewUpdate = getBooleanInput("macos-skip-brew-update");
    if (skipBrewUpdate === false) {
      await exec("brew", ["update"]);
    }
    await exec("brew", ["install", "graphviz"]);
  }

  private async getAptInstall() {
    const skipAptUpdate = getBooleanInput("ubuntu-skip-apt-update");
    const graphvizVersion = getInput("ubuntu-graphviz-version");
    const libgraphvizdevVersion = getInput("ubuntu-libgraphvizdev-version");
    if (skipAptUpdate === false) {
      await exec("sudo", ["apt-get", "update"]);
    }
    await exec("sudo", [
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

  /**
   * `choco install` can exit 0 having installed nothing ("installed 0/0
   * packages") when the Chocolatey community feed answers 503 or 504, so
   * an attempt counts only when choco exits 0 and `dot -V` runs after it
   * (a `dot` already on the PATH does not make a failed install pass);
   * otherwise it is tried again.
   */
  private async chocoInstall() {
    const graphvizVersion = getInput("windows-graphviz-version");
    const args = [
      "install",
      "graphviz",
      ...(graphvizVersion ? [`--version=${graphvizVersion}`] : []),
    ];
    let failure = "";
    for (let attempt = 1; attempt <= WINDOWS_INSTALL_ATTEMPTS; attempt++) {
      const code = await exec(
        "choco",
        attempt === 1 ? args : [...args, "--force"],
        { ignoreReturnCode: true },
      );
      if (code !== 0) {
        failure = `'choco install' exits with code ${code}`;
      } else if (!(await this.dotRuns())) {
        failure = "'dot -V' fails";
      } else {
        return;
      }
      if (attempt < WINDOWS_INSTALL_ATTEMPTS) {
        const delay = WINDOWS_RETRY_DELAY_MS * attempt;
        warning(
          `Graphviz is not installed after attempt ${attempt} of ${WINDOWS_INSTALL_ATTEMPTS} (${failure}); trying again in ${
            delay / 1000
          } s.`,
        );
        await this.sleep(delay);
      }
    }
    throw new Error(
      `Graphviz is not installed after ${WINDOWS_INSTALL_ATTEMPTS} attempts of 'choco install graphviz' (${failure}). The Chocolatey community feed may be unavailable; see https://github.com/ts-graphviz/setup-graphviz/issues/649.`,
    );
  }

  /** Whether `dot -V` runs: false when dot is missing or fails. */
  private async dotRuns(): Promise<boolean> {
    try {
      return (await exec("dot", ["-V"], { ignoreReturnCode: true })) === 0;
    } catch (error) {
      // @actions/exec throws when the executable is not on the PATH.
      info(`dot is not available: ${(error as Error).message}`);
      return false;
    }
  }
}
