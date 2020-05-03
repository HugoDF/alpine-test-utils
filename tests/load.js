import test from 'ava';
import {load} from '../src/main';
import path from 'path';

test('load file with multiple components', async (t) => {
  const components = await load(path.join(__dirname, '../fixtures/multiple-components.html'));
  t.is(components.length, 3);
  t.is(components[0], `<div x-data="" name="component-1"></div>`);
  t.is(components[1], `<div x-data="" name="component-2"></div>`);
  t.is(components[2], `<div x-data="" name="component-3"></div>`);
});

test('load file with single component', async (t) => {
  const component = await load(path.join(__dirname, '../fixtures/single-component.html'));
  t.is(component, `<div x-data="" name="component-1"></div>`);
});
