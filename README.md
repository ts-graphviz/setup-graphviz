# `ts-graphviz/setup-graphviz` action
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

GitHub Action to set up Graphviz cross-platform(Linux, macOS, Windows).

## Example usage

With `ts-graphviz/setup-graphviz`, you can set up a GitHub Action environment
that allows you to use `Graphviz` on all operating systems.

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
    - uses: actions/checkout@v3
    - name: Setup Graphviz
      uses: ts-graphviz/setup-graphviz@v1
    ...
    # In the steps below this you can use Graphviz dot command.
```

If you want a fixed version of Graphviz,
you can specify a specific version for each operating system (not macOS).

```yaml
- name: Setup Graphviz
  uses: ts-graphviz/setup-graphviz@v1
  with:
    # graphviz version on Ubuntu.
    ubuntu-graphviz-version: '2.42.2-3build2'
    # libgraphviz-dev version on Ubuntu.
    ubuntu-libgraphvizdev-version: '2.42.2-3build2'
    # Skip to run apt update command on Ubuntu.
    ubuntu-skip-apt-update: 'true' # default false
    #  graphviz version on Windows.
    windows-graphviz-version: '2.49.3'
    # Skip to run brew update command on macOS.
    macos-skip-brew-update: 'true' # default false
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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.kamiazya.tech/"><img src="https://avatars0.githubusercontent.com/u/35218186?v=4?s=100" width="100px;" alt="Yuki Yamazaki"/><br /><sub><b>Yuki Yamazaki</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=kamiazya" title="Code">💻</a> <a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=kamiazya" title="Tests">⚠️</a> <a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=kamiazya" title="Documentation">📖</a> <a href="#example-kamiazya" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mhtb32"><img src="https://avatars3.githubusercontent.com/u/24754239?v=4?s=100" width="100px;" alt="Mohammad Hussein Tavakoli Bina "/><br /><sub><b>Mohammad Hussein Tavakoli Bina </b></sub></a><br /><a href="#ideas-mhtb32" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://smcleod.net"><img src="https://avatars.githubusercontent.com/u/862951?v=4?s=100" width="100px;" alt="Sam"/><br /><sub><b>Sam</b></sub></a><br /><a href="#maintenance-sammcj" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mohawk2"><img src="https://avatars.githubusercontent.com/u/7308181?v=4?s=100" width="100px;" alt="mohawk2"/><br /><sub><b>mohawk2</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/issues?q=author%3Amohawk2" title="Bug reports">🐛</a> <a href="#ideas-mohawk2" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/leadelngalame1611"><img src="https://avatars.githubusercontent.com/u/39901966?v=4?s=100" width="100px;" alt="leadelngalame1611"/><br /><sub><b>leadelngalame1611</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/issues?q=author%3Aleadelngalame1611" title="Bug reports">🐛</a> <a href="#ideas-leadelngalame1611" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/stunney"><img src="https://avatars.githubusercontent.com/u/609012?v=4?s=100" width="100px;" alt="S. Tunney"/><br /><sub><b>S. Tunney</b></sub></a><br /><a href="#ideas-stunney" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://paul.kishimoto.name"><img src="https://avatars.githubusercontent.com/u/1634164?v=4?s=100" width="100px;" alt="Paul Natsuo Kishimoto"/><br /><sub><b>Paul Natsuo Kishimoto</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/issues?q=author%3Akhaeru" title="Bug reports">🐛</a> <a href="#research-khaeru" title="Research">🔬</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jbms"><img src="https://avatars.githubusercontent.com/u/4211946?v=4?s=100" width="100px;" alt="Jeremy Maitin-Shepard"/><br /><sub><b>Jeremy Maitin-Shepard</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/issues?q=author%3Ajbms" title="Bug reports">🐛</a> <a href="#ideas-jbms" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mvrueden"><img src="https://avatars.githubusercontent.com/u/4202259?v=4?s=100" width="100px;" alt="mvrueden"/><br /><sub><b>mvrueden</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/issues?q=author%3Amvrueden" title="Bug reports">🐛</a> <a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=mvrueden" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dhimmel.com"><img src="https://avatars.githubusercontent.com/u/1117703?v=4?s=100" width="100px;" alt="Daniel Himmelstein"/><br /><sub><b>Daniel Himmelstein</b></sub></a><br /><a href="#question-dhimmel" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/deining"><img src="https://avatars.githubusercontent.com/u/18169566?v=4?s=100" width="100px;" alt="Andreas Deininger"/><br /><sub><b>Andreas Deininger</b></sub></a><br /><a href="https://github.com/ts-graphviz/setup-graphviz/commits?author=deining" title="Documentation">📖</a> <a href="#maintenance-deining" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

This software is released under the MIT License, see [LICENSE](./LICENSE).
