import test from 'ava';
import {version} from '../dist/main';
import pkg from '../package.json';

test('version', (t) => {
  t.is(version, pkg.version);
});
