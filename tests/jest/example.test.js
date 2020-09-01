/* eslint-disable no-undef */
const {render, setGlobal, waitFor} = require('../../src/main');

test('render - example', () => {
  const componentHtml = `<div x-data="{foo: 'bar'}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml);
  expect(component.querySelector('span').innerText).toEqual('bar');
});

test('render - override sanity check', () => {
  const componentHtml = `<div x-data="{}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml, {foo: 'baz'});
  expect(component.querySelector('span').innerText).toEqual('baz');
});

test('use-case - intercepting fetch calls - wait-for-expect', async () => {
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
    expect(component.$data.data).toEqual(['data-1', 'data-2']);
  });
  await waitFor(() => {
    const textNodes = component.querySelectorAll('[data-testid=text-el]');
    expect(textNodes).toHaveLength(2);
    expect(textNodes[0].innerText).toEqual('data-1');
    expect(textNodes[1].innerText).toEqual('data-2');
  });
});
