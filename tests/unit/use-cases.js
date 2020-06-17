import test from 'ava';
import path from 'path';
import {load, loadSync, render, setGlobal} from '../../src/main';

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
