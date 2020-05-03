![test](https://github.com/HugoDF/alpine-test-utils/workflows/test/badge.svg)
# Alpine.js Test Utils

Utilities for testing Alpine.js components.

**This library allows you to quickly and easily write tests for Alpine.js applications via Node.js using _any testing library_.**

That means you can use AVA, Tape, Mocha, Jest or whatever other testing library you enjoy using.

This project is not officially affiliated with Alpine.js, it's maintained by community members. For any feedback, questions or issues, please create [issues](https://github.com/HugoDF/alpine-test-utils/issues) and [pull requests](https://github.com/HugoDF/alpine-test-utils/blob/master/README.md#contributing) or merely upvote or comment on existing issues or pull requests.

# Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install Package](#install-package)
  - [Peer Dependencies](#peer-dependencies)
- [Quick Start, Write your first test](#quick-start-write-your-first-test)
- [API](#api)
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

Here's an example to render a simple Alpine.js component using Jest/Jasmine syntax:

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

For more complex use cases, please see [USE_CASES.md](./USE_CASES.md) or for the full API, see the following section.

# API

| Method | Description |
| --- | --- |
| [render](#render) | Render & run Alpine.js component markup |
| [load](#loadloadsync) | Extract Alpine.js component markup from files |
| [loadSync](#loadloadsync) | Synchronous variant of `load` |
| [$nextTick](#nexttick) | Wait for a re-render or async work to happen |
| [setGlobal](#setglobal) | Override globals using an object |
| [setMutationObserver](#setmutationobserver) | Set a custom MutationObserver implementation |

## render

Render Alpine.js Component Markup to JSDOM & initialise Alpine.js.

Parameters:

- markup - string - the Alpine.js markup to render
- data - (Optional) object or string - data to use to override contents of x-data

Returns:

- an AlpineElement - an Element with added Alpine.js `$data` and `$el` properties and Alpine Test Utils `$nextTick` function.

Usage Example: render a component and check text is displayed as per x-data.

```js
test('component renders content of "foo" in span', () => {
  const component = render(`<div x-data="{ foo: 'bar' }">
    <span x-text="foo"></span>
  </div>`);
  expect(component.querySelector('span').innerText).toEqual('bar');
});
```

For a more advanced example see [Clicking a button to toggle visibility](./USE_CASES.md#clicking-a-button-to-toggle-visibility).

## load/loadSync

Load markup from a file asynchronously using a path.

> Note: when a single `x-data` Alpine.js component is found in the file, it is returned. If multiple components are found, all are returned in an Array.

Parameters:

- filePath - Path to the HTML/template file to load components from

Returns:

- in the async case, a `Promise<string[]|string>` (a Promise that resolves to a string or an array of strings)
- in the sync case, a `string[]|string`.

Usage Example: load a PHP template, see [the full use-case](./USE_CASES.md##loading--rendering-a-php-template-that-injects-into-x-data).

```ts
test('my test', async () => {
  const markupAsync = await load(path.join(__dirname, '../fixtures/template.php'));
  const markupSync = loadSync(path.join(__dirname, '../fixtures/template.php'));
});
```

## $nextTick

Function to wait until a render/async operation happens.

Parameters: none.

Returns: 

- a Promise that resolves after the next async operation has completed (ie. on the next tick of the event loop)

> Note this exported as a global from the Alpine Test Utils module _and_ is attached to components during `render`, see [render](#render).

Usage example: for more advanced use-cases see [Clicking a button to toggle visibility](./USE_CASES.md#clicking-a-button-to-toggle-visibility) and [Intercepting `fetch` calls & waiting for re-renders](./USE_CASES.md#intercepting-fetch-calls--waiting-for-re-renders)

```js
test('clicking a button to toggle visibility', async () => {
  const component = render(`<div x-data="{ isOpen: false }">
    <button @click="isOpen = !isOpen"></button>
    <span x-show="isOpen"></span>
  </div>`);

  expect(component.querySelector('span').style.display).toEqual('none');
  component.querySelector('button').click();
  await component.$nextTick();
  expect(component.querySelector('span').style.display).toEqual('');
});
```


## setGlobal

Override Node.js `global` using passed `override` object.

The implementation is literally `Object.assign(global, override)`.

Parameters:

- an object with keys to override on the `global` object

Returns: none.

Usage example: overring `global.fetch`, see the full use case [Intercepting `fetch` calls & waiting for re-renders](./USE_CASES.md#intercepting-fetch-calls--waiting-for-re-renders).

```js
test('intercepting fetch calls', async () => {
  setGlobal({
    fetch: () =>
      Promise.resolve({
        json: () => Promise.resolve(['data-1', 'data-2'])
      })
  });
});
```


# Roadmap

If you are interested in the future direction of this project, please take a look at the open [issues](https://github.com/HugoDF/alpine-test-utils/issues) and [pull requests](https://github.com/HugoDF/alpine-test-utils/pulls). I would love to hear your feedback!

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

