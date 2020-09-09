import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {render} from '../../src/main';

test('render - sanity check', () => {
  const component = render(`<div x-data="{ foo: 'bar' }">
    <span x-text="foo"></span>
  </div>`);
  assert.is(component.querySelector('span').textContent, 'bar');
});

test('render - can override x-data if data option is passed - string', () => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`,
    '{ "foo": "baz" }'
  );
  assert.is(component.querySelector('span').textContent, 'baz');
});

test('render - can override x-data if data option is passed - object', () => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`,
    {foo: 'baz'}
  );
  assert.is(component.querySelector('span').textContent, 'baz');
});

test('render - sets $data properties on the component', () => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );
  assert.is(component.$data.foo, 'bar');
});

test('render - updating $data works', async () => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );

  component.$data.foo = 'baz';

  await component.$nextTick();
  assert.is(component.querySelector('span').textContent, 'baz');
});

test('render - sets $el on the component to itself', () => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );
  assert.is(component.$el, component);
});

test('render throws if passed a Promise (eg. forgot to await load())', async () => {
  assert.throws(() => {
    render(Promise.resolve('<div x-data=""></div>'));
  }, 'alpine-test-utils render(): "markup" should be a string');
});

test.run();
