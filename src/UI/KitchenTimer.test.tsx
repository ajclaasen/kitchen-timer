import React from 'react';

import KitchenTimer from './KitchenTimer';
import { render, fireEvent } from '@testing-library/react';

it('shows the play button by default', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  expect(getByLabelText('play')).toBeInTheDocument();
}); 

it('does not show the pause button by default', () => {
  const { queryByLabelText } = render(<KitchenTimer />);

  expect(queryByLabelText('pause')).not.toBeInTheDocument();
})

it('toggles between playing and paused when the play/pause button is pressed', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  fireEvent.click(getByLabelText('play'));

  expect(getByLabelText('pause')).toBeInTheDocument();

  fireEvent.click(getByLabelText('pause'));

  expect(getByLabelText('play')).toBeInTheDocument();
});

it('the time inputs are enabled by default', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  expect(getByLabelText('Seconds')).toBeEnabled();
  expect(getByLabelText('Minutes')).toBeEnabled();
});

it('the time inputs are disabled when the timer is playing', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  fireEvent.click(getByLabelText('play'));

  expect(getByLabelText('Seconds')).toBeDisabled();
  expect(getByLabelText('Minutes')).toBeDisabled();
});
