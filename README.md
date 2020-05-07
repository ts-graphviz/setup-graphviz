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
```
