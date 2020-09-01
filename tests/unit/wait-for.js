import test from 'ava';
import {render, waitFor} from '../../src/main';

test('waitFor x-model change', async (t) => {
  const component = render(`<div x-data="{ confirmationInputValue: '' }">
  <button :disabled="!confirmationInputValue">Action!</button>
</div>`);

  t.is(component.querySelector('button').getAttribute('disabled'), 'disabled');
  component.$data.confirmationInputValue = 'some-value';
  await waitFor(() => {
    t.is(component.querySelector('button').getAttribute('disabled'), null);
  })
});

