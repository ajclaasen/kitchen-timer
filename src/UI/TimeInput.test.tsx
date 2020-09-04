import React from 'react';

import TimeInput from './TimeInput';
import { render, fireEvent } from '@testing-library/react';

const setup = () => {
  const callback = jest.fn((x:number) => {});
  const utils = render(<TimeInput onChange={callback} />)
  const minutesInput = utils.getByLabelText('Minutes');
  const secondsInput = utils.getByLabelText('Seconds');

  return {
    callback,
    minutesInput,
    secondsInput,
    ...utils,
  };
}

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

it('sets the minutes and seconds if a duration is passed', () => {
  const duration = 126000; // 2 minutes and 6 seconds
  const { getByLabelText } = render(<TimeInput duration={duration} />);

  expect(getByLabelText('Minutes')).toHaveDisplayValue('2');
  expect(getByLabelText('Seconds')).toHaveDisplayValue('6');
});
