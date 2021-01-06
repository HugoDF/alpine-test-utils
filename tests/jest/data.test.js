/* eslint-disable no-undef */
const {render} = require('../../src/main.js');

test('render - sets $data properties on the component', () => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );
  expect(component.$data.foo).toEqual('bar');
});

test('render - updating $data works', async () => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );

  component.$data.foo = 'baz';

  await component.$nextTick();
  expect(component.$data.foo).toEqual('baz');
});
