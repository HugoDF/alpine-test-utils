import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {render} from '../../src/main';

test('render - example', () => {
  const componentHtml = `<div x-data="{foo: 'bar'}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml);
  assert.is(component.querySelector('span').innerText, 'bar');
});
test('render - override sanity check', () => {
  const componentHtml = `<div x-data="{}">
    <span x-text="foo"></span>
  </div>`;
  const component = render(componentHtml, {foo: 'baz'});
  assert.is(component.querySelector('span').innerText, 'baz');
});

test.run();
