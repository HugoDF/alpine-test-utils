import test from 'ava';
import {ping} from '../dist/main';

test('ping', (t) => {
  t.is(ping(), 'pong');
});
