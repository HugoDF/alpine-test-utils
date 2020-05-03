![Build](https://github.com/HugoDF/buttondown/workflows/Build%20&%20test/badge.svg)

Utilities for testing Alpine.js components.

**This library allows you to quickly and easily write tests for Alpine.js applications via Node.js using any testing library.**

This project is not officially affiliated with Alpine.js, it's maintained by community members. For any feedback, questions or issues, please create [issues](https://github.com/HugoDF/alpine-test-utils/issues) and [pull requests](https://github.com/HugoDF/alpine-test-utils/blob/master/README.md#contributing) or merely upvote or comment on existing issues or pull requests.

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install Package](#install-package)
- [Quick Start, Create a Draft](#quick-start-create-a-draft)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [npm scripts](#npm-scripts)
- [About](#about)
  - [Acknowledgments](#acknowledgments)
- [LICENSE](#license)

# Installation

## Prerequisites

- Node.js version 10 or 12

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh
npm install --save-dev alpine-test-utils
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add --dev alpine-test-utils
```

> **Note**: if you're using Alpine.js from CDN you will also need to install it using npm or Yarn

```sh
npm install --save alpinejs
# or for Yarn users
yarn add alpinejs
```

<a name="quick-start"></a>
# Quick Start, Create a Draft

Here's an example to render an Alpine.js component that's situated in the `test.html` file:

```js
import {load, render} from 'alpine-test-utils';

test('render and override x-data', () => {
  const componentHtml = `<div x-data="{foo: 'hello'}">
    <span x-text="foo"></span>
  </div>`
  const component = render(componentHtml, { foo: 'world' });
  expect(component.querySelector('span').innerText).toEqual('world');
});
```

For more complex use cases, please see [USE_CASES.md](./USE_CASES.md).


# Roadmap

If you are interested in the future direction of this project, please take a look at the open [issues](https://github.com/HugoDF/microbundle-ts-pkg/issues) and [pull requests](https://github.com/HugoDF/microbundle-ts-pkg/pulls). I would love to hear your feedback!

# Contributing

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

