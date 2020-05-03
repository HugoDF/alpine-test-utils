![Build](https://github.com/HugoDF/buttondown/workflows/Build%20&%20test/badge.svg)

microbundle-ts-pkg: A TypeScript npm package skeleton/starter project with microbundle, AVA and XO

Comes with:

- [SAMPLE_README.md](./SAMPLE_README.md) and [USE_CASES.md](./USE_CASES.md) for documentation.
- AVA for testing (see [./tests](./tests))
- XO for linting/formatting
- microbundle for compiling TypeScript to UMD, ESM, CJS

## Requirements

- Node 10
- Yarn 1.x or npm

## Setup

1. Clone the repository
2. Run `yarn` or `npm install` installs all required dependencies.
3. Run `yarn build` to build from TypeScript to common JavaScript distribution formats.
4. Run `yarn test` to run all tests :D.

## npm scripts

> Equivalent `npm run <script>` should also work

- `yarn test` run tests against **built output** with [ava](https://github.com/avajs/ava). **Important**: runs against build output so run `yarn build` beforehand.
- `yarn build` run build from TypeScript to UMD, CJS, ESM with [microbundle](https://github.com/developit/microbundle)
- `yarn watch` runs build in watch mode with [microbundle](https://github.com/developit/microbundle)
- `yarn lint` will lint all of the files with [xo](https://github.com/xojs/xo)
- `yarn format` will run lint with `--fix` option on all the examples files (and tests).
- `yarn release`, run clean, production build and release with `np`.

# About

This package is maintained by Hugo from [Code with Hugo](https://codewithhugo.com) and [Alpine.js Weekly](https://alpinejs.codewithhugo.com/newsletter).

## Acknowledgments


Special thanks to:

- The developers behind
  - [ava](https://avajs.dev)
  - [esm](https://github.com/standard-things/esm#readme)
  - [microbundle](https://github.com/developit/microbundle#readme)
  - [np](https://github.com/sindresorhus/np#readme)
  - [xo](https://github.com/xojs/xo#readme)

# LICENSE

Code is licensed under the [MIT License](./LICENSE).

