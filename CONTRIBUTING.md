# Contribution Guide

## Code in Master

Install the dependencies

```bash
yarn install
```

Build the typescript

```bash
yarn build
```

Run the tests :heavy_check_mark:

```bash
yarn test

 PASS  src/__test__/installer.spec.ts
  class Installer
    Supported platforms
      Work on "darwin"
        ✓ brewInstall method called on "darwin" platform (3ms)
      Work on "linux"
        ✓ getAptInstall method called on "linux" platform (1ms)
      Work on "win32"
        ✓ chocoInstall method called on "win32" platform
...
```

## Publish to a distribution branch

Actions are run from GitHub repos. We will create a releases branch and only checkin production modules (core in this case).

Comment out node_modules in .gitignore and create a releases/v1 branch

```plain
# comment out in distribution branches
# node_modules/
# lib
```

```bash
git checkout -b releases/v1
git commit -a -m "prod dependencies"
```

```bash
npm prune --production
git add node_modules
git commit -a -m "prod dependencies"
git push origin releases/v1
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing the releases/v1 branch

```yaml
uses: ts-graphviz/setup-graphviz@releases/v1
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

## Usage

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and tested action

```yaml
uses: ts-graphviz/setup-graphviz@v1
```
