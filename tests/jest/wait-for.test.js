const {render, waitFor} = require('../../src/main');

test('waitFor x-model change', async () => {
  const component = render(`<div x-data="{ confirmationInputValue: '' }">
  <button :disabled="!confirmationInputValue">Action!</button>
</div>`);

  expect(component.querySelector('button').getAttribute('disabled')).toEqual('disabled');
  component.$data.confirmationInputValue = 'some-value';
  await waitFor(() => {
    expect(component.querySelector('button').getAttribute('disabled')).toBeNull();
  })
});

