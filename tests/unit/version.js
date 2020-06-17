import test from 'ava';
import path from 'path';
import {load} from '../../src/main';
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

test('load - Alpine.js version mismatch', async (t) => {
  console.warn = stub(() => {});
  const component = await load(
    path.join(__dirname, '../fixtures/version.html')
  );
  t.is(component, `<div x-data="{}"></div>`);
  t.is(
    console.warn.firstCall()[0],
    `alpine-test-utils: Alpine.js version is different to CDN one, requested "1.x.x", testing with "${Alpine.version}"`
  );
});
