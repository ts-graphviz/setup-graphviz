# `ts-graphviz/setup-graphviz` action

GitHub Action to set up Graphviz cross-platform(Linux, macOS, Windows).

## Example usage

```yml
name: Graphviz CI
on: [push]
jobs:
  test:
    name: Test on node ${{ matrix.node-version }} and ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
    - uses: actions/checkout@v1
    - name: Setup Graphviz
      uses: ts-graphviz/setup-graphviz@v1
    ...
    # In the steps below this you can use Graphviz dot command.
```

## See Also

Graphviz-dot Test and Integration

- [ts-graphviz](https://github.com/ts-graphviz/ts-graphviz)
  - Graphviz library for TypeScript.
- [@ts-graphviz/react](https://github.com/ts-graphviz/react)
  - Graphviz-dot Renderer for React.
- [jest-graphviz](https://github.com/ts-graphviz/jest-graphviz)
  - Jest matchers that supports graphviz integration.

## Contributing

For more info on how to contribute to setup-graphviz, see the [CONTRIBUTING](./CONTRIBUTING.md).

## License

This software is released under the MIT License, see [LICENSE](./LICENSE).
