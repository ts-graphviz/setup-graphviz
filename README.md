# `ts-graphviz/setup-graphviz` action
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://blog.kamiazya.tech/"><img src="https://avatars0.githubusercontent.com/u/35218186?v=4" width="100px;" alt=""/><br /><sub><b>Yuki Yamazaki</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=kamiazya" title="Code">💻</a> <a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=kamiazya" title="Tests">⚠️</a> <a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=kamiazya" title="Documentation">📖</a> <a href="#example-kamiazya" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!