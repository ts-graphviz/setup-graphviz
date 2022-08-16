import { Installer } from '../Installer.js';

describe('class Installer', () => {
  let installer: Installer;
  const originalPlatform = process.platform;

  const setPlatform = (platform: NodeJS.Platform) => {
    Object.defineProperty(process, 'platform', { value: platform });
  };

  beforeEach(() => {
    installer = new Installer();
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
