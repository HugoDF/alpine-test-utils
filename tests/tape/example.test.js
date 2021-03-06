import test from 'tape';
import {render} from '../../src/main.js';

test('render - example', (t) => {
  t.plan(1);
  const componentHtml = `<div x-data="{foo: 'bar'}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml);
  t.is(component.querySelector('span').textContent, 'bar');
});
test('render - override sanity check', (t) => {
  t.plan(1);
  const componentHtml = `<div x-data="{}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml, {foo: 'baz'});
  t.is(component.querySelector('span').textContent, 'baz');
});
