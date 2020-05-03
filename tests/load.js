import test from 'ava';
import path from 'path';
import {load, loadSync} from '../src/main';

test('load - file with multiple components', async (t) => {
  const components = await load(
    path.join(__dirname, '../fixtures/multiple-components.html')
  );
  t.is(components.length, 3);
  t.is(components[0], `<div x-data="" name="component-1"></div>`);
  t.is(components[1], `<div x-data="" name="component-2"></div>`);
  t.is(components[2], `<div x-data="" name="component-3"></div>`);
});

test('load - file with single component', async (t) => {
  const component = await load(
    path.join(__dirname, '../fixtures/single-component.html')
  );
  t.is(component, `<div x-data="" name="component-1"></div>`);
});

test('loadSync - file with multiple components', (t) => {
  const components = loadSync(
    path.join(__dirname, '../fixtures/multiple-components.html')
  );
  t.is(components.length, 3);
  t.is(components[0], `<div x-data="" name="component-1"></div>`);
  t.is(components[1], `<div x-data="" name="component-2"></div>`);
  t.is(components[2], `<div x-data="" name="component-3"></div>`);
});

test('loadSync - file with single component', (t) => {
  const component = loadSync(
    path.join(__dirname, '../fixtures/single-component.html')
  );
  t.is(component, `<div x-data="" name="component-1"></div>`);
});
