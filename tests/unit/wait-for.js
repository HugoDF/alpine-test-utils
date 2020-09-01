import {test} from 'uvu';
import * as assert from 'uvu/assert';
import {render, waitFor} from '../../src/main';

test('waitFor - x-show toggles style.display', async () => {
  const component = render(`<div x-data="{ isOpen: false }">
    <button @click="isOpen = !isOpen"></button>
    <span x-show="isOpen"></span>
  </div>`);

  assert.is(component.querySelector('span').style.display, 'none');
  component.querySelector('button').click();
  await waitFor(() => {
    assert.is(component.querySelector('span').style.display, '');
  });
});

test.run();
