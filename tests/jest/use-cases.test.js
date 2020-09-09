/* eslint-disable no-undef */
const {render, waitFor, setGlobal} = require('../../src/main');

test('use-case - clicking a button to toggle visibility', async () => {
  const component = render(`<div x-data="{ isOpen: false }">
    <button @click="isOpen = !isOpen"></button>
    <span x-show="isOpen"></span>
  </div>`);

  expect(component.querySelector('span').style.display).toEqual('none');
  component.querySelector('button').click();
  await waitFor(() => {
    expect(component.querySelector('span').style.display).toEqual('');
  });
});

test('use-case - intercepting fetch calls - waitFor', async () => {
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
    expect(textNodes[0].textContent).toEqual('data-1');
    expect(textNodes[1].textContent).toEqual('data-2');
  });
});
