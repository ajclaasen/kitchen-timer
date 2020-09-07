import React from 'react';

import TimeDisplay from './TimeDisplay';
import { render } from '@testing-library/react';

const setup = (milliseconds: number) => {
  const utils = render(<TimeDisplay timeToDisplay={milliseconds} />)
  const minutesComponent = utils.getByLabelText('Minutes');
  const secondsComponent = utils.getByLabelText('Seconds');

  return {
    minutesComponent,
    secondsComponent,
    ...utils,
  };
};

it('displays a minute if a minute is passed', () => {
  const timeToDisplay = 60000;
  const { minutesComponent } = setup(timeToDisplay);

  expect(minutesComponent).toHaveDisplayValue('1');
});

it('displays a second if a second is passed', () => {
  const timeToDisplay = 1000;
  const { secondsComponent } = setup(timeToDisplay);

  expect(secondsComponent).toHaveDisplayValue('1');
});

it('substracts the time in minutes from the amount of seconds', () => {
  const timeToDisplay = 61000;
  const { secondsComponent } = setup(timeToDisplay);

  expect(secondsComponent).toHaveDisplayValue('1');
});

describe('when 59.999 seconds are passed', () => {
  const timeToDisplay = 59999;
  let minutesComponent: HTMLElement;
  let secondsComponent: HTMLElement;

  beforeAll(() => {
    ({ minutesComponent, secondsComponent } = setup(timeToDisplay));
  });

  it('shows 1 minute', () => {
    expect(minutesComponent).toHaveDisplayValue('1');
  });

  it('does not show 60 seconds', () => {
    expect(secondsComponent).not.toHaveDisplayValue('60');
  });

  it('shows 0 seconds', () => {
    expect(secondsComponent).toHaveDisplayValue('0');
  });
});

it('rounds 0.001s up', () => {
  const timeToDisplay = 1;
  const { secondsComponent } = setup(timeToDisplay);

  expect(secondsComponent).toHaveDisplayValue('1');
});

it('rounds 0.999s up', () => {
  const timeToDisplay = 999;
  const { secondsComponent } = setup(timeToDisplay);

  expect(secondsComponent).toHaveDisplayValue('1');
});
