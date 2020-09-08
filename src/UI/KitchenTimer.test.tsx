import React from 'react';

import KitchenTimer from './KitchenTimer';
import { render, fireEvent } from '@testing-library/react';

const realDateNow = Date.now;

const setTime = (milliseconds:number) => {
  global.Date.now = jest.fn(() => milliseconds);
};

const advanceTime = (milliseconds:number) => {
  setTime(Date.now() + milliseconds);
  jest.advanceTimersByTime(milliseconds);
};

beforeAll(() => {
  setTime(new Date(Date.now()).getTime());
  jest.useFakeTimers();

  jest.spyOn(window, 'alert').mockImplementation(() => {})
});

afterAll(() => {
  global.Date.now = realDateNow;
  jest.useRealTimers();
});

afterEach(() => {
  jest.clearAllTimers();
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

it('displays the current time left after a pause', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  const secondsInput = getByLabelText('Seconds');
  fireEvent.change(secondsInput, { target: { value: 10 } });

  const playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(5000);

  const pauseButton = getByLabelText('pause');
  fireEvent.click(pauseButton);

  expect(getByLabelText('Seconds')).toHaveDisplayValue('5');
});

it('displays the original time set after a reset', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  const secondsInput = getByLabelText('Seconds');
  fireEvent.change(secondsInput, { target: { value: 10 } });

  const playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(5000);

  const stopButton = getByLabelText('stop');
  fireEvent.click(stopButton);

  expect(getByLabelText('Seconds')).toHaveDisplayValue('10');
});

it('displays the original time set after a reset during a pause', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  const secondsInput = getByLabelText('Seconds');
  fireEvent.change(secondsInput, { target: { value: 10 } });

  const playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(5000);

  const pauseButton = getByLabelText('pause');
  fireEvent.click(pauseButton);
  const stopButton = getByLabelText('stop');
  fireEvent.click(stopButton);
  
  console.log(`displayed: ${getByLabelText('Seconds').getAttribute('value')}`)

  expect(getByLabelText('Seconds')).toHaveDisplayValue('10');
});

it('displays the original time set after the timer has elapsed', () => {
  const { getByLabelText } = render(<KitchenTimer />);

  const secondsInput = getByLabelText('Seconds');
  fireEvent.change(secondsInput, { target: { value: 10 } });

  const playButton = getByLabelText('play');
  fireEvent.click(playButton);

  advanceTime(11000);

  expect(getByLabelText('Seconds')).toHaveDisplayValue('10');
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

it('shows the time left when the pause button is clicked', () => {
  const { getByLabelText } = render(<KitchenTimer />);
  let secondsInput = getByLabelText('Seconds');

  fireEvent.change(secondsInput, { target: { value: 2 } });
  fireEvent.click(getByLabelText('play'));
  advanceTime(1000);
  fireEvent.click(getByLabelText('pause'));

  secondsInput = getByLabelText('Seconds');
  expect(secondsInput).toHaveDisplayValue('1');
});


describe('fires off an alarm when', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('fires off the alarm method after the timer expires', () => {
    const { getByLabelText } = render(<KitchenTimer />);
    const secondsInput = getByLabelText('Seconds');
    const playButton = getByLabelText('play');

    fireEvent.change(secondsInput, { target: { value: 90 } });
    fireEvent.click(playButton);

    advanceTime(90 * 1000);

    expect(spy).toHaveBeenCalled();
  });

  it('fires off the alarm method after the timer expires with a pause in between', () => {
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
  });

  it('does not fire off the alarm after the stop button is pressed', () => {
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
  });

  it('only fires off the alarm after the new set time when a new time is set during a pause', () => {
    const { getByLabelText } = render(<KitchenTimer />);
    let secondsInput = getByLabelText('Seconds');

    fireEvent.change(secondsInput, { target: { value: 90 } })

    let playButton = getByLabelText('play');
    fireEvent.click(playButton);

    advanceTime(60 * 1000);

    const pauseButton = getByLabelText('pause');
    fireEvent.click(pauseButton);

    secondsInput = getByLabelText('Seconds');
    fireEvent.change(secondsInput, { target: { value: 60 } });

    playButton = getByLabelText('play');
    fireEvent.click(playButton);

    advanceTime(30 * 1000);

    expect(spy).not.toHaveBeenCalled();

    advanceTime(30 * 1000);

    expect(spy).toHaveBeenCalled();
  });
});
