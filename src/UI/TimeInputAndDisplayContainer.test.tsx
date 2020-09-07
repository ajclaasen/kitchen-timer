import React from 'react';

import TimeInputAndDisplayContainer from './TimeInputAndDisplayContainer';
import { render } from '@testing-library/react';
import { isContext } from 'vm';
import TimeInput from './TimeInput';

describe('when input is allowed', () => {
  it('displays the passed time in minutes and seconds', () => {
    const { getByLabelText } = render(
      <TimeInputAndDisplayContainer 
        timeToDisplay={126000}
        allowInput={true}
        onTimeInputChange={()=>{}}
      />
    );

    expect(getByLabelText('Minutes')).toHaveDisplayValue('2');
    expect(getByLabelText('Seconds')).toHaveDisplayValue('6');
  });
});

describe('when input is disallowed', () => {
  it('displays the passed time in minutes and seconds', () => {
    const { getByLabelText } = render(
      <TimeInputAndDisplayContainer
        timeToDisplay={126000}
        allowInput={false}
        onTimeInputChange={()=>{}}
      />
    );

    expect(getByLabelText('Minutes')).toHaveDisplayValue('2');
    expect(getByLabelText('Seconds')).toHaveDisplayValue('6');
  });
});
