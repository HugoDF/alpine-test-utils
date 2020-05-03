![Build](https://github.com/HugoDF/buttondown/workflows/Build%20&%20test/badge.svg)

DESCRIBE THE LIBRARY

LINK TO OTHER RESOURCES

**This library allows you to quickly and easily do @todo via Node.js.**

This project is not officially affiliated with @todo, it's maintained by community members. For any feedback, questions or issues, please create [issues](https://github.com/HugoDF/microbundle-ts-pkg/issues) and [pull requests](https://github.com/HugoDF/microbundle-ts-pkg/blob/master/README.md#contributing) or merely upvote or comment on existing issues or pull requests.

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Obtain an API Key](#obtain-an-api-key)
  - [Setup Environment Variables](#setup-environment-variables)
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
<!-- - A Buttondown account, [sign up for free](https://buttondown.email/register?source=buttondown-nodejs) free for your first thousand subscribers or check out [the pricing page](https://buttondown.email/pricing?source=buttondown-nodejs). -->

## Obtain an API Key

Grab your API Key from the [@todo](@todo).

## Setup Environment Variables

Do not hardcode your [API Key](@todo) into your code. Instead, use an environment variable or some other secure means of protecting your API Key. Following is an example of using an environment variable.

Update the development environment with your [@todo](@todo), for example:

<!--
```bash
echo "export BUTTONDOWN_API_KEY='YOUR_API_KEY'" > buttondown.env
echo "buttondown.env" >> .gitignore
source ./buttondown.env
```
-->

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh
npm install --save @todo
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add @todo
```

<a name="quick-start"></a>
# Quick Start, Create a Draft

The following is the minimum needed code to use this library. Use this example, and modify the `to` and `from` variables:

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

