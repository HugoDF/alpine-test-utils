/* eslint-disable no-undef */
const {render} = require('../../src/main.js');

test('render - example', () => {
  const componentHtml = `<div x-data="{foo: 'bar'}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml);
  expect(component.querySelector('span').textContent).toEqual('bar');
});

test('render - override sanity check', () => {
  const componentHtml = `<div x-data="{}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml, {foo: 'baz'});
  expect(component.querySelector('span').textContent).toEqual('baz');
});
