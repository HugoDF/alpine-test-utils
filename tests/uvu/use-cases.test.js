import {test} from 'uvu';
import * as assert from 'uvu/assert';
import path from 'path';
import {load, loadSync, render, setGlobal, waitFor} from '../../src/main.js';

console.warn = () => {};

test('use-case - clicking a button to toggle visibility', async () => {
  const component = render(`<div x-data="{ isOpen: false }">
    <button @click="isOpen = !isOpen"></button>
    <span x-show="isOpen"></span>
  </div>`);
  assert.is(component.querySelector('span').style.display, 'none');
  component.querySelector('button').click();
  await waitFor(() => {
    assert.is(component.querySelector('span').style.display, '');
  });
});

test('use-case - intercepting fetch calls', async () => {
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
  await waitFor(() => {
    assert.equal(component.$data.data, ['data-1', 'data-2']);
  });
  await waitFor(() => {
    const textNodes = component.querySelectorAll('[data-testid=text-el]');
    assert.is(textNodes.length, 2);
    assert.is(textNodes[0].textContent, 'data-1');
    assert.is(textNodes[1].textContent, 'data-2');
  });
});

test('use-case - PHP template - async', async () => {
  const markup = await load(path.join(__dirname, '../fixtures/template.php'));
  // Overwrite `x-data` since it's set by a PHP expression
  const component = render(markup, {
    foo: 'baz'
  });
  assert.is(component.querySelector('span').textContent, 'baz');
});

test('use-case - PHP template - sync', () => {
  const markup = loadSync(path.join(__dirname, '../fixtures/template.php'));
  // Overwrite `x-data` since it's set by a PHP expression
  const component = render(markup, {
    foo: 'baz'
  });
  assert.is(component.querySelector('span').textContent, 'baz');
});

test('use-case - load from HTML file - async', async () => {
  const markup = await load(path.join(__dirname, '../fixtures/template.html'));
  const component = render(markup);
  assert.is(component.querySelector('span').textContent, 'bar');
});

test('use-case - load from HTML file - sync', () => {
  const markup = loadSync(path.join(__dirname, '../fixtures/template.html'));
  const component = render(markup);
  assert.is(component.querySelector('span').textContent, 'bar');
});

test.run();
