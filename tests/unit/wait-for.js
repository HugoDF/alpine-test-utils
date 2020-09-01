import test from 'ava';
import {render, waitFor} from '../../src/main';

test('waitFor - x-show toggles style.display', async (t) => {
  const component = render(`<div x-data="{ isOpen: false }">
    <button @click="isOpen = !isOpen"></button>
    <span x-show="isOpen"></span>
  </div>`);

  t.is(component.querySelector('span').style.display, 'none');
  component.querySelector('button').click();
  await waitFor(() => {
    t.is(component.querySelector('span').style.display, '');
  });
});
