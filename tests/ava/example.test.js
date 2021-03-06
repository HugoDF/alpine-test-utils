import test from 'ava';
import {render} from '../../src/main.js';

test('render - example', (t) => {
  const componentHtml = `<div x-data="{foo: 'bar'}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml);
  t.is(component.querySelector('span').textContent, 'bar');
});
test('render - override sanity check', (t) => {
  const componentHtml = `<div x-data="{}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml, {foo: 'baz'});
  t.is(component.querySelector('span').textContent, 'baz');
});
