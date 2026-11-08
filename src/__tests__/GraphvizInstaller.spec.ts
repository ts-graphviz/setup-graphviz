import {
  type MockInstance,
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
  vi,
} from "vitest";
vi.mock("@actions/core");
vi.mock("@actions/exec");

import { getBooleanInput, getInput } from "@actions/core";
import * as exec from "@actions/exec";
import { GraphvizInstaller } from "../GraphvizInstaller";

describe("class GraphvizInstaller", () => {
  let installer: GraphvizInstaller;
  const sleep = vi.fn(async (_ms: number) => {});
  const originalPlatform = process.platform;

  const setPlatform = (platform: NodeJS.Platform) => {
    Object.defineProperty(process, "platform", { value: platform });
  };

  const mockNamedInputs = (
    mock: MockInstance,
    name: string,
    value: string | boolean,
  ) => {
    mock.mockImplementation((input: string) => {
      if (input === name) return value;
      return typeof value === "string" ? "" : false;
    });
  };

  beforeEach(() => {
    installer = new GraphvizInstaller({ sleep });
    vi.clearAllMocks();
  });

  describe("Supported platforms", () => {
    describe('Work on "darwin"', () => {
      beforeAll(() => {
        setPlatform("darwin");
      });

      it('brewInstall method called on "darwin" platform', async () => {
        const brewInstall = vi.fn();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (installer as any).brewInstall = brewInstall;

        await installer.get();

        expect(brewInstall.mock.calls.length).toBe(1);
      });

      describe("inputs works", () => {
        test("default", async () => {
          mockNamedInputs(
            getBooleanInput as unknown as MockInstance,
            "macos-skip-brew-update",
            false,
          );
          const execSpy = vi.spyOn(exec, "exec");

          await installer.get();

          expect(execSpy).toBeCalledTimes(2);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            [
              "brew",
              [
                "update",
              ],
            ]
          `);
          expect(execSpy.mock.calls[1]).toMatchInlineSnapshot(`
            [
              "brew",
              [
                "install",
                "graphviz",
              ],
            ]
          `);
        });
        test("skip brew update", async () => {
          mockNamedInputs(
            getBooleanInput as unknown as MockInstance,
            "macos-skip-brew-update",
            true,
          );
          const execSpy = vi.spyOn(exec, "exec");

          await installer.get();

          expect(execSpy).toBeCalledTimes(1);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            [
              "brew",
              [
                "install",
                "graphviz",
              ],
            ]
          `);
        });
      });
    });

    describe('Work on "linux"', () => {
      beforeAll(() => {
        setPlatform("linux");
      });

      it('getAptInstall method called on "linux" platform', async () => {
        const getAptInstall = vi.fn();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (installer as any).getAptInstall = getAptInstall;

        await installer.get();

        expect(getAptInstall.mock.calls.length).toBe(1);
      });

      describe("inputs works", () => {
        test("skip apt update", async () => {
          mockNamedInputs(
            getBooleanInput as unknown as MockInstance,
            "ubuntu-skip-apt-update",
            true,
          );
          const execSpy = vi.spyOn(exec, "exec");

          await installer.get();

          expect(execSpy.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "sudo",
                [
                  "apt-get",
                  "install",
                  "-y",
                  "graphviz",
                  "libgraphviz-dev",
                  "pkg-config",
                ],
              ],
            ]
          `);
        });

        test("graphviz version not set", async () => {
          (getInput as unknown as MockInstance).mockReturnValue("");
          (getBooleanInput as unknown as MockInstance).mockReturnValue(false);
          const execSpy = vi.spyOn(exec, "exec");

          await installer.get();

          expect(execSpy.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "sudo",
                [
                  "apt-get",
                  "update",
                ],
              ],
              [
                "sudo",
                [
                  "apt-get",
                  "install",
                  "-y",
                  "graphviz",
                  "libgraphviz-dev",
                  "pkg-config",
                ],
              ],
            ]
          `);
        });

        test('input graphviz version set to "1.1.1" and libgraphviz_dev version set to "2.2.2"', async () => {
          (getInput as unknown as MockInstance).mockImplementation((input) => {
            switch (input) {
              case "ubuntu-graphviz-version":
                return "1.1.1";
              case "ubuntu-libgraphvizdev-version":
                return "2.2.2";
              default:
                return "";
            }
          });
          (getBooleanInput as unknown as MockInstance).mockReturnValue(false);
          const execSpy = vi.spyOn(exec, "exec");

          await installer.get();

          expect(execSpy.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "sudo",
                [
                  "apt-get",
                  "update",
                ],
              ],
              [
                "sudo",
                [
                  "apt-get",
                  "install",
                  "-y",
                  "graphviz=1.1.1",
                  "libgraphviz-dev=2.2.2",
                  "pkg-config",
                ],
              ],
            ]
          `);
        });

        test('input graphviz version set to "3.3.3" and libgraphviz_dev version not set', async () => {
          (getInput as unknown as MockInstance).mockImplementation((input) => {
            switch (input) {
              case "ubuntu-graphviz-version":
                return "3.3.3";
              default:
                return "";
            }
          });
          (getBooleanInput as unknown as MockInstance).mockReturnValue(false);
          const execSpy = vi.spyOn(exec, "exec");

          await installer.get();

          expect(execSpy.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "sudo",
                [
                  "apt-get",
                  "update",
                ],
              ],
              [
                "sudo",
                [
                  "apt-get",
                  "install",
                  "-y",
                  "graphviz=3.3.3",
                  "libgraphviz-dev",
                  "pkg-config",
                ],
              ],
            ]
          `);
        });

        test("input graphviz not set and libgraphviz_dev set to 4.4.4", async () => {
          (getInput as unknown as MockInstance).mockImplementation((input) => {
            switch (input) {
              case "ubuntu-libgraphvizdev-version":
                return "4.4.4";
              default:
                return "";
            }
          });
          (getBooleanInput as unknown as MockInstance).mockReturnValue(false);
          const execSpy = vi.spyOn(exec, "exec");

          await installer.get();

          expect(execSpy.mock.calls).toMatchInlineSnapshot(`
            [
              [
                "sudo",
                [
                  "apt-get",
                  "update",
                ],
              ],
              [
                "sudo",
                [
                  "apt-get",
                  "install",
                  "-y",
                  "graphviz",
                  "libgraphviz-dev=4.4.4",
                  "pkg-config",
                ],
              ],
            ]
          `);
        });
      });
    });

    describe('Work on "win32"', () => {
      beforeAll(() => {
        setPlatform("win32");
      });

      it('chocoInstall method called on "win32" platform', async () => {
        const chocoInstall = vi.fn();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (installer as any).chocoInstall = chocoInstall;

        await installer.get();

        expect(chocoInstall.mock.calls.length).toBe(1);
      });

      describe("inputs works", () => {
        beforeEach(() => {
          // choco and `dot -V` succeed.
          vi.spyOn(exec, "exec").mockResolvedValue(0);
        });

        test("graphviz version not set", async () => {
          (getInput as unknown as MockInstance).mockReturnValue("");

          await installer.get();

          expect(vi.mocked(exec.exec).mock.calls).toMatchInlineSnapshot(`
            [
              [
                "choco",
                [
                  "install",
                  "graphviz",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
              [
                "dot",
                [
                  "-V",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
            ]
          `);
        });

        test('graphviz version seted to "1.1.1"', async () => {
          mockNamedInputs(
            getInput as unknown as MockInstance,
            "windows-graphviz-version",
            "1.1.1",
          );

          await installer.get();

          expect(vi.mocked(exec.exec).mock.calls).toMatchInlineSnapshot(`
            [
              [
                "choco",
                [
                  "install",
                  "graphviz",
                  "--version=1.1.1",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
              [
                "dot",
                [
                  "-V",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
            ]
          `);
        });
      });

      describe("checks the install and tries again", () => {
        beforeEach(() => {
          (getInput as unknown as MockInstance).mockReturnValue("");
        });

        /** `dot -V` exits with these codes in turn; choco always exits 0. */
        const dotExits = (...codes: (number | Error)[]) => {
          const results = [...codes];
          vi.spyOn(exec, "exec").mockImplementation(async (command) => {
            if (command !== "dot") return 0;
            const next = results.shift() ?? 1;
            if (next instanceof Error) throw next;
            return next;
          });
        };

        test("installed at the first attempt: no retry", async () => {
          dotExits(0);

          await installer.get();

          expect(vi.mocked(exec.exec).mock.calls.map(([c]) => c)).toEqual([
            "choco",
            "dot",
          ]);
          expect(sleep).not.toHaveBeenCalled();
        });

        test("missing after a silent choco failure, installed on retry with --force", async () => {
          dotExits(new Error("Unable to locate executable file: dot."), 0);

          await installer.get();

          expect(vi.mocked(exec.exec).mock.calls).toMatchInlineSnapshot(`
            [
              [
                "choco",
                [
                  "install",
                  "graphviz",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
              [
                "dot",
                [
                  "-V",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
              [
                "choco",
                [
                  "install",
                  "graphviz",
                  "--force",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
              [
                "dot",
                [
                  "-V",
                ],
                {
                  "ignoreReturnCode": true,
                },
              ],
            ]
          `);
          expect(sleep.mock.calls).toEqual([[30_000]]);
        });

        test("fails after three attempts, waiting 30 s and 60 s", async () => {
          dotExits(1, 1, 1);

          await expect(installer.get()).rejects.toThrow(
            /Graphviz is not installed after 3 attempts of 'choco install graphviz' \('dot -V' fails\)\. The Chocolatey community feed may be unavailable/,
          );
          expect(
            vi.mocked(exec.exec).mock.calls.filter(([c]) => c === "choco"),
          ).toHaveLength(3);
          expect(sleep.mock.calls).toEqual([[30_000], [60_000]]);
        });

        test("installed at the third attempt", async () => {
          dotExits(1, 1, 0);

          await installer.get();

          expect(sleep.mock.calls).toEqual([[30_000], [60_000]]);
        });

        test("retries keep the pinned version", async () => {
          mockNamedInputs(
            getInput as unknown as MockInstance,
            "windows-graphviz-version",
            "1.1.1",
          );
          dotExits(1, 0);

          await installer.get();

          expect(
            vi
              .mocked(exec.exec)
              .mock.calls.filter(([c]) => c === "choco")
              .map(([, args]) => args),
          ).toEqual([
            ["install", "graphviz", "--version=1.1.1"],
            ["install", "graphviz", "--version=1.1.1", "--force"],
          ]);
        });

        test("a dot already on the PATH does not make a failed install pass", async () => {
          vi.spyOn(exec, "exec").mockImplementation(async (command) =>
            command === "choco" ? 1 : 0,
          );

          await expect(installer.get()).rejects.toThrow(
            /after 3 attempts of 'choco install graphviz' \('choco install' exits with code 1\)/,
          );
          expect(
            vi.mocked(exec.exec).mock.calls.filter(([c]) => c === "dot"),
          ).toHaveLength(0);
        });

        test("a failing choco exit code does not stop the retries", async () => {
          let chocoRuns = 0;
          vi.spyOn(exec, "exec").mockImplementation(async (command) => {
            if (command === "choco") return ++chocoRuns === 1 ? 1 : 0;
            return chocoRuns === 1 ? 1 : 0;
          });

          await installer.get();

          expect(chocoRuns).toBe(2);
        });
      });
    });
  });

  describe("Unsupported platforms", () => {
    const unsupportedPlatforms: NodeJS.Platform[] = [
      "aix",
      "android",
      "freebsd",
      "openbsd",
      "sunos",
      "cygwin",
      "netbsd",
    ];
    test.each(unsupportedPlatforms)(
      '"%s" is not supported',
      async (platform: NodeJS.Platform) => {
        setPlatform(platform);
        await expect(installer.get()).rejects.toThrow(
          `platform '${platform}' is not yet supported`,
        );
      },
    );
  });

  afterAll(() => {
    Object.defineProperty(process, "platform", {
      value: originalPlatform,
    });
  });
});
