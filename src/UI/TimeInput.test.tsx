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

it('shows the minutes and seconds if a duration is passed', () => {
  const duration = 126000; // 2 minutes and 6 seconds
  const { getByLabelText } = render(<TimeInput duration={duration} />);

  expect(getByLabelText('Minutes')).toHaveDisplayValue('2');
  expect(getByLabelText('Seconds')).toHaveDisplayValue('6');
});

describe('if a timeLeft and inputEnabled=false is passed', () => {
  it('does not show the minutes and seconds of the passed duration', () => {
    const duration = 126000;

    const { getByLabelText } = render(<TimeInput inputEnabled={false} duration={duration} timeLeft={0} />);

    expect(getByLabelText('Minutes')).not.toHaveDisplayValue('2');
    expect(getByLabelText('Seconds')).not.toHaveDisplayValue('6');
  });

  it('shows the amount of time passed to it, if its input is disabled', () => {
    const duration = 126000
    const timeLeft = 63000;
    const { getByLabelText } = render(<TimeInput inputEnabled={false} duration={duration} timeLeft={timeLeft} />);
  
    expect(getByLabelText('Minutes')).toHaveDisplayValue('1');
    expect(getByLabelText('Seconds')).toHaveDisplayValue('3');
  });

  it('substracts the time in minutes from the amount of seconds if seconds > 60', () => {
    const timeLeft = 61000;
    const { getByLabelText } = render(<TimeInput inputEnabled={false} timeLeft={timeLeft} />);

    expect(getByLabelText('Seconds')).not.toHaveDisplayValue('61');
  });

  describe('when timeLeft=59999 is passed', () => {
    const timeLeft = 59999;
    
    it('shows 1 minute', () => {
      const { getByLabelText } = render(<TimeInput inputEnabled={false} timeLeft={timeLeft} />);

      expect(getByLabelText('Minutes')).toHaveDisplayValue('1');
    });

    it('does not show 60 seconds', () => {
      const { getByLabelText } = render(<TimeInput inputEnabled={false} timeLeft={timeLeft} />);

      expect(getByLabelText('Seconds')).not.toHaveDisplayValue('60');
    });

    it('shows 0 seconds', () => {
      const { getByLabelText } = render(<TimeInput inputEnabled={false} timeLeft={timeLeft} />);

      expect(getByLabelText('Seconds')).toHaveDisplayValue('0');
    })
  });
});
