import {test} from 'uvu';
import * as assert from 'uvu/assert';
import path from 'path';
import {load} from '../../src/main.js';
import Alpine from 'alpinejs';

const stub = (fn) => {
  const calls = [];
  const callable = (...args) => {
    calls.push(args);
    fn(...args);
  };

  callable.calls = calls;
  callable.firstCall = () => calls[0];
  return callable;
};

test('load - Alpine.js version mismatch', async () => {
  console.warn = stub(() => {});
  const component = await load(
    path.join(__dirname, '../fixtures/version.html')
  );
  assert.is(component, `<div x-data="{}"></div>`);
  assert.is(
    console.warn.firstCall()[0],
    `alpine-test-utils: Alpine.js version is different to CDN one, requested "1.x.x", testing with "${Alpine.version}"`
  );
});

test.run();
