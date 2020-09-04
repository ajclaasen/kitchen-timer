import React from 'react';

import KitchenTimer from './KitchenTimer';
import { render, fireEvent } from '@testing-library/react';

const realDateNow = Date.now;

const setTime = (milliseconds:number) => {
  global.Date.now = jest.fn(() => milliseconds);
};

const advanceTime = (milliseconds:number) => {
  jest.advanceTimersByTime(milliseconds);
  setTime(Date.now() + milliseconds);
};

beforeAll(() => {
  setTime(new Date(Date.now()).getTime());
  jest.useFakeTimers();
});

afterAll(() => {
  global.Date.now = realDateNow;
});



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



it('fires off the alarm method after the timer expires', () => {
  const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  const { getByLabelText } = render(<KitchenTimer />);
  const secondsInput = getByLabelText('Seconds');
  const playButton = getByLabelText('play');

  fireEvent.change(secondsInput, { target: { value: 90 } });
  fireEvent.click(playButton);

  advanceTime(90 * 1000);

  expect(spy).toHaveBeenCalled();

  spy.mockRestore();
});



it('fires off the alarm method after the timer expires with a pause in between', () => {
  const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  const { getByLabelText } = render(<KitchenTimer />);
  const secondsInput = getByLabelText('Seconds');

  fireEvent.change(secondsInput, { target: { value: 90 } });

  let playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(60 * 1000);

  const pauseButton = getByLabelText('pause');
  fireEvent.click(pauseButton);

  advanceTime(60 * 1000);

  expect(spy).not.toHaveBeenCalled();

  playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(30 * 1000);

  expect(spy).toHaveBeenCalled();

  spy.mockRestore();
});



it('does not fire off the alarm after the stop button is pressed', () => {
  const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  const { getByLabelText } = render(<KitchenTimer />);
  const secondsInput = getByLabelText('Seconds');
  const playButton = getByLabelText('play');
  const stopButton = getByLabelText('stop');

  fireEvent.change(secondsInput, { target: { value: 90 } });
  fireEvent.click(playButton);

  advanceTime(60 * 1000);

  fireEvent.click(stopButton);

  advanceTime(60 * 1000);

  expect(spy).not.toHaveBeenCalled();

  spy.mockRestore();
});

it('only fires off the alarm after the new set time when a new time is set during a pause', () => {
  const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  const { getByLabelText } = render(<KitchenTimer />);
  const secondsInput = getByLabelText('Seconds');

  fireEvent.change(secondsInput, { target: { value: 90 } })

  let playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(60 * 1000);

  const pauseButton = getByLabelText('pause');
  fireEvent.click(pauseButton);
  fireEvent.change(secondsInput, { target: { value: 60 } });

  playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(30 * 1000);

  expect(spy).not.toHaveBeenCalled();

  advanceTime(30 * 1000);

  expect(spy).toHaveBeenCalled();
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
