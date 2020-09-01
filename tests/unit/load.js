import {test} from 'uvu';
import * as assert from 'uvu/assert';
import path from 'path';
import {load, loadSync} from '../../src/main';

test('load - file with multiple components', async () => {
  const components = await load(
    path.join(__dirname, '../fixtures/multiple-components.html')
  );
  assert.is(components.length, 3);
  assert.is(components[0], `<div x-data="" name="component-1"></div>`);
  assert.is(components[1], `<div x-data="" name="component-2"></div>`);
  assert.is(components[2], `<div x-data="" name="component-3"></div>`);
});

test('load - file with single component', async () => {
  const component = await load(
    path.join(__dirname, '../fixtures/single-component.html')
  );
  assert.is(component, `<div x-data="" name="component-1"></div>`);
});

test('loadSync - file with multiple components', () => {
  const calls = [];
  const realWarn = console.warn;
  console.warn = (...args) => {
    calls.push(args);
  };

  const components = loadSync(
    path.join(__dirname, '../fixtures/multiple-components.html')
  );
  assert.is(components.length, 3);
  assert.is(components[0], `<div x-data="" name="component-1"></div>`);
  assert.is(components[1], `<div x-data="" name="component-2"></div>`);
  assert.is(components[2], `<div x-data="" name="component-3"></div>`);
  // Check warning
  assert.equal(calls, [
    [
      'alpine-test-utils: loadSync() can cause performance issues, prefer async "load()"'
    ]
  ]);
  console.warn = realWarn;
});

test('loadSync - file with single component', () => {
  const calls = [];
  const realWarn = console.warn;
  console.warn = (...args) => {
    calls.push(args);
  };

  const component = loadSync(
    path.join(__dirname, '../fixtures/single-component.html')
  );
  assert.is(component, `<div x-data="" name="component-1"></div>`);
  // Check warning
  assert.equal(calls, [
    [
      'alpine-test-utils: loadSync() can cause performance issues, prefer async "load()"'
    ]
  ]);
  console.warn = realWarn;
});

test.run();
