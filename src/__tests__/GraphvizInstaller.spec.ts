jest.mock('@actions/core');
jest.mock('@actions/exec');

import { getInput } from '@actions/core';
import * as exec from '@actions/exec';
import { GraphvizInstaller } from '../GraphvizInstaller';

describe('class GraphvizInstaller', () => {
  let installer: GraphvizInstaller;
  const originalPlatform = process.platform;

  const setPlatform = (platform: NodeJS.Platform) => {
    Object.defineProperty(process, 'platform', { value: platform });
  };

  beforeEach(() => {
    installer = new GraphvizInstaller();
    jest.clearAllMocks();
  });

  describe('Supported platforms', () => {
    describe('Work on "darwin"', () => {
      beforeAll(() => {
        setPlatform('darwin');
      });

      it('brewInstall method called on "darwin" platform', async () => {
        const brewInstall = jest.fn();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (installer as any).brewInstall = brewInstall;

        await installer.get();

        expect(brewInstall.mock.calls.length).toBe(1);
      });
    });

    describe('Work on "linux"', () => {
      beforeAll(() => {
        setPlatform('linux');
      });

      it('getAptInstall method called on "linux" platform', async () => {
        const getAptInstall = jest.fn();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (installer as any).getAptInstall = getAptInstall;

        await installer.get();

        expect(getAptInstall.mock.calls.length).toBe(1);
      });

      describe('inputs works', () => {
        test('graphviz version not seted', async () => {
          (getInput as jest.Mock).mockReturnValue('');
          const execSpy = jest.spyOn(exec, 'exec');

          await installer.get();

          expect(execSpy).toBeCalledTimes(2);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "update",
              ],
            ]
          `);
          expect(execSpy.mock.calls[1]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "install",
                "graphviz",
                "libgraphviz-dev",
                "pkg-config",
              ],
            ]
          `);
        });

        test('input graphviz version seted to "1.1.1" and libgraphviz_dev version seted to "2.2.2"', async () => {
          (getInput as jest.Mock).mockImplementation((input) => {
            switch (input) {
              case 'ubuntu-graphviz-version':
                return '1.1.1';
              case 'ubuntu-libgraphvizdev-version':
                return '2.2.2';
              default:
                return '';
            }
          });
          const execSpy = jest.spyOn(exec, 'exec');

          await installer.get();

          expect(execSpy).toBeCalledTimes(2);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "update",
              ],
            ]
          `);
          expect(execSpy.mock.calls[1]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "install",
                "graphviz=1.1.1",
                "libgraphviz-dev=2.2.2",
                "pkg-config",
              ],
            ]
          `);
        });

        test('input graphviz version seted to "3.3.3" and libgraphviz_dev version not seted', async () => {
          (getInput as jest.Mock).mockImplementation((input) => {
            switch (input) {
              case 'ubuntu-graphviz-version':
                return '3.3.3';
              default:
                return '';
            }
          });
          const execSpy = jest.spyOn(exec, 'exec');

          await installer.get();

          expect(execSpy).toBeCalledTimes(2);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "update",
              ],
            ]
          `);
          expect(execSpy.mock.calls[1]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "install",
                "graphviz=3.3.3",
                "libgraphviz-dev",
                "pkg-config",
              ],
            ]
          `);
        });

        test('input graphviz not seted and libgraphviz_dev seted to 4.4.4', async () => {
          (getInput as jest.Mock).mockImplementation((input) => {
            switch (input) {
              case 'ubuntu-libgraphvizdev-version':
                return '4.4.4';
              default:
                return '';
            }
          });
          const execSpy = jest.spyOn(exec, 'exec');

          await installer.get();

          expect(execSpy).toBeCalledTimes(2);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "update",
              ],
            ]
          `);
          expect(execSpy.mock.calls[1]).toMatchInlineSnapshot(`
            Array [
              "sudo",
              Array [
                "apt-get",
                "install",
                "graphviz",
                "libgraphviz-dev=4.4.4",
                "pkg-config",
              ],
            ]
          `);
        });
      });
    });

    describe('Work on "win32"', () => {
      beforeAll(() => {
        setPlatform('win32');
      });

      it('chocoInstall method called on "win32" platform', async () => {
        const chocoInstall = jest.fn();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (installer as any).chocoInstall = chocoInstall;

        await installer.get();

        expect(chocoInstall.mock.calls.length).toBe(1);
      });

      describe('inputs works', () => {
        test('graphviz version not seted', async () => {
          (getInput as jest.Mock).mockReturnValue('');
          const execSpy = jest.spyOn(exec, 'exec');

          await installer.get();

          expect(execSpy).toBeCalledTimes(1);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            Array [
              "choco",
              Array [
                "install",
                "graphviz",
              ],
            ]
          `);
        });

        test('graphviz version seted to "1.1.1"', async () => {
          (getInput as jest.Mock).mockReturnValue('1.1.1');
          const execSpy = jest.spyOn(exec, 'exec');

          await installer.get();

          expect(execSpy).toBeCalledTimes(1);
          expect(execSpy.mock.calls[0]).toMatchInlineSnapshot(`
            Array [
              "choco",
              Array [
                "install",
                "graphviz",
                "--version=1.1.1",
              ],
            ]
          `);
        });
      });
    });
  });

  describe('Unsupported platforms', () => {
    const unsupportedPlatforms: NodeJS.Platform[] = [
      'aix',
      'android',
      'freebsd',
      'openbsd',
      'sunos',
      'cygwin',
      'netbsd',
    ];
    test.each(unsupportedPlatforms)('"%s" is not supported', async (platform: NodeJS.Platform) => {
      setPlatform(platform);
      await expect(installer.get()).rejects.toThrow(`platform '${platform}' is not yet supported`);
    });
  });

  afterAll(() => {
    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
    });
  });
});
