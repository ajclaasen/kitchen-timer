import React from 'react';

import { TextField } from '@material-ui/core';

import { minutesOnClock, secondsOnClock, } from '../time/timeHelpers';

interface TimeDisplayProps {
  timeToDisplay: number,
}

function TimeDisplay(props: TimeDisplayProps) {
  return (
    <form>
      <TextField
        id="minutes-field"
        label="Minutes"
        type="number"
        disabled={true}
        value={minutesOnClock(props.timeToDisplay)}
      />

      <TextField
        id="seconds-field"
        label="Seconds"
        type="number"
        disabled={true}
        value={secondsOnClock(props.timeToDisplay)}
      />
    </form>
  );
}

export default TimeDisplay;
