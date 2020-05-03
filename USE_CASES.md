This documentation provides examples for specific use cases in Node.js. Please [open an issue](https://github.com/HugoDF/alpine-test-utils/issues) or make a pull request for any other use cases you would like us to document here. Thank you!


## Table of contents

- [Clicking a button to toggle visibility](#clicking-a-button-to-toggle-visibility)
- [Intercepting `fetch` calls & waiting for re-renders](#intercepting-fetch-calls--waiting-for-re-renders)
- [Loading & rendering a PHP template that injects into x-data](#loading--rendering-a-php-template-that-injects-into-x-data)
- [Loading & rendering an HTML file and running it](#loading--rendering-an-html-file-and-running-it)

### Clicking a button to toggle visibility

```js
import test from 'ava';
import {render} from 'alpine-test-utils';

test('use-case - clicking a button to toggle visibility', async (t) => {
  const component = render(`<div x-data="{ isOpen: false }">
    <button @click="isOpen = !isOpen"></button>
    <span x-show="isOpen"></span>
  </div>`);

  t.is(component.querySelector('span').style.display, 'none');
  component.querySelector('button').click();
  await component.$nextTick();
  t.is(component.querySelector('span').style.display, '');
});
```

### Intercepting `fetch` calls & waiting for re-renders

```js
import test from 'ava';
import {render, setGlobal} from 'alpine-test-utils';

test('use-case - intercepting fetch calls', async (t) => {
  setGlobal({
    fetch: () =>
      Promise.resolve({
        json: () => Promise.resolve(['data-1', 'data-2'])
      })
  });
  const component = render(`<div
    x-data="{ data: [] }"
    x-init="fetch().then(r => r.json()).then(d => {
      data = d;
    })"
  >
    <template x-for="d in data" :key="d">
      <span data-testid="text-el" x-text="d"></span>
    </template>
  </div>`);
  // Flushes the Promises
  await component.$nextTick();
  t.deepEqual(component.$data.data, ['data-1', 'data-2']);
  // Lets the re-render run
  await component.$nextTick();
  const textNodes = component.querySelectorAll('[data-testid=text-el]');
  t.is(textNodes.length, 2);
  t.is(textNodes[0].innerText, 'data-1');
  t.is(textNodes[1].innerText, 'data-2');
});
```

### Loading & rendering a PHP template that injects into x-data

```js
import test from 'ava';
import path from 'path';
import {load, loadSync, render} from 'alpine-test-utils';

test('use-case - PHP template - async', async (t) => {
  const markup = await load(path.join(__dirname, '../fixtures/template.php'));
  // Overwrite `x-data` since it's set by a PHP expression
  const component = render(markup, {
    foo: 'baz'
  });
  t.is(component.querySelector('span').innerText, 'baz');
});

test('use-case - PHP template - sync', (t) => {
  const markup = loadSync(path.join(__dirname, '../fixtures/template.php'));
  // Overwrite `x-data` since it's set by a PHP expression
  const component = render(markup, {
    foo: 'baz'
  });
  t.is(component.querySelector('span').innerText, 'baz');
});
```

### Loading & rendering an HTML file and running it

```js
import test from 'ava';
import path from 'path';
import {load, loadSync, render} from 'alpine-test-utils';

test('use-case - load from HTML file - async', async (t) => {
  const markup = await load(path.join(__dirname, '../fixtures/template.html'));
  const component = render(markup);
  t.is(component.querySelector('span').innerText, 'bar');
});

test('use-case - load from HTML file - sync', (t) => {
  const markup = loadSync(path.join(__dirname, '../fixtures/template.html'));
  const component = render(markup);
  t.is(component.querySelector('span').innerText, 'bar');
});
```
