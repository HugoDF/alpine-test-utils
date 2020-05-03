import test from 'ava';
import {render} from '../src/main';

test('render - sanity check', (t) => {
  const component = render(`<div x-data="{ foo: 'bar' }">
    <span x-text="foo"></span>
  </div>`);
  t.is(component.querySelector('span').innerText, 'bar');
});

test('render - can override x-data if data option is passed - string', (t) => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`,
    '{ "foo": "baz" }'
  );
  t.is(component.querySelector('span').innerText, 'baz');
});

test('render - can override x-data if data option is passed - object', (t) => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`,
    {foo: 'baz'}
  );
  t.is(component.querySelector('span').innerText, 'baz');
});

test('render - sets $data properties on the component', (t) => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );
  t.is(component.$data.foo, 'bar');
});

test('render - updating $data works', async (t) => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );

  component.$data.foo = 'baz';

  await component.$nextTick();
  t.is(component.querySelector('span').innerText, 'baz');
});

test('render - sets $el on the component to itself', (t) => {
  const component = render(
    `<div x-data="{ foo: 'bar' }">
  <span x-text="foo"></span>
</div>`
  );
  t.is(component.$el, component);
});

test('render throws if passed a Promise (eg. forgot to await load())', async (t) => {
  const error = await t.throws(() => {
    render(Promise.resolve('<div x-data=""></div>'));
  });
  t.is(
    error.message,
    'alpine-test-utils render(): "markup" should be a string'
  );
});
