import React from 'react';

import TimeInput from './TimeInput';
import { render, fireEvent, RenderResult } from '@testing-library/react';

const setup = (startingTime?: number) => {
  const callback = jest.fn((x:number) => {});
  let utils: RenderResult;
  if(startingTime) {
    utils = render(<TimeInput startingTime={startingTime} onChange={callback} />)
  } else {
    utils = render(<TimeInput onChange={callback} />)
  }
  const minutesInput = utils.getByLabelText('Minutes');
  const secondsInput = utils.getByLabelText('Seconds');

  return {
    callback,
    minutesInput,
    secondsInput,
    ...utils,
  };
};

it('calls the passed onChange handler when the minutes are updated', () => {
  const { callback, minutesInput } = setup();

  fireEvent.change(minutesInput, { target: { value: 10 } });

  expect(callback).toBeCalled();
});

it('calls the passed onChange handler when the seconds are updated', () => {
  const { callback, secondsInput } = setup();

  fireEvent.change(secondsInput, { target: { value: 10 } });

  expect(callback).toBeCalled();
});

it('calls the passed onChange handler with the correct amount of milliseconds', () => {
  const { callback, minutesInput, secondsInput } = setup();

  fireEvent.change(minutesInput, { target: { value: 2 } });

  expect(callback).toBeCalledWith(120000);

  fireEvent.change(secondsInput, { target: { value: 3 } });

  expect(callback).toBeCalledWith(123000);
});

it('shows the amount of minutes and seconds if a starting time is passed', () => {
  const { minutesInput, secondsInput } = setup(126000);;

  expect(minutesInput).toHaveDisplayValue('2');
  expect(secondsInput).toHaveDisplayValue('6');
});

it('rounds the amount of minutes up if almost a minute is passed', () => {
  const { minutesInput } = setup(59999);

  expect(minutesInput).toHaveDisplayValue('1');
});

it('rounds the amount of seconds up', () => {
  const { secondsInput } = setup(500);

  expect(secondsInput).toHaveDisplayValue('1');
});
