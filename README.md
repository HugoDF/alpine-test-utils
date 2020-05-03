![test](https://github.com/HugoDF/alpine-test-utils/workflows/test/badge.svg)
# Alpine.js Test Utils

Utilities for testing Alpine.js components.

**This library allows you to quickly and easily write tests for Alpine.js applications via Node.js using _any testing library_.**

This project is not officially affiliated with Alpine.js, it's maintained by community members. For any feedback, questions or issues, please create [issues](https://github.com/HugoDF/alpine-test-utils/issues) and [pull requests](https://github.com/HugoDF/alpine-test-utils/blob/master/README.md#contributing) or merely upvote or comment on existing issues or pull requests.

# Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install Package](#install-package)
  - [Peer Dependencies](#peer-dependencies)
- [Quick Start, Write your first test](#quick-start-write-your-first-test)
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

## Peer Dependencies

**IMPORTANT**: If you're loading Alpine.js from CDN (using a `script` tag) you'll need to install `alpinejs` in order to use `alpine-test-utils`. It should be the same version as the version of Alpine.js you are loading from CDN. using.

```sh
npm install --save-dev alpinejs
# or for Yarn users
yarn add --dev alpinejs
```

<a name="quick-start"></a>
# Quick Start, Write your first test

Here's an example to render an Alpine.js component that's situated in the `test.html` file:

```js
import {render} from 'alpine-test-utils';

test('test foo component', () => {
  const componentHtml = `<div x-data="{foo: 'hello'}">
    <span x-text="foo"></span>
  </div>`
  const component = render(componentHtml);
  expect(component.querySelector('span').innerText).toEqual('bar');
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
3. Run `yarn test` to run all tests :D.

## npm scripts

> Equivalent `npm run <script>` should also work

- `yarn test` run tests with [ava](https://github.com/avajs/ava).
- `yarn build` will run JSDoc -> TypeScript typing conversion with [jsdoc](https://github.com/jsdoc/jsdoc) and [tsd-jsdoc](https://github.com/englercj/tsd-jsdoc), changes to [./types.d.ts](./types.d.ts) shoud be committed.
- `yarn lint` will lint all of the files with [xo](https://github.com/xojs/xo)
- `yarn format` will run lint with `--fix` option on all the examples files (and tests).
- `yarn release`, run clean, production build and release with `np`.

# About

This package is maintained by Hugo from [Code with Hugo](https://codewithhugo.com) and [Alpine.js Weekly](https://alpinejs.codewithhugo.com/newsletter).

## Acknowledgments


Special thanks to:

- The developers behind
  - [Alpine.js](https://github.com/alpinejs/alpine)
  - [ava](https://avajs.dev)
  - [jsdoc](https://github.com/jsdoc/jsdoc)
  - [tsd-jsdoc](https://github.com/englercj/tsd-jsdoc)
  - [esm](https://github.com/standard-things/esm#readme)
  - [np](https://github.com/sindresorhus/np#readme)
  - [xo](https://github.com/xojs/xo#readme)

# LICENSE

Code is licensed under the [MIT License](./LICENSE).

