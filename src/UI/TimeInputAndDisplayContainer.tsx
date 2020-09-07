import React, { Component } from 'react';

import TimeInput from './TimeInput';
import TimeDisplay from './TimeDisplay';

interface TimeInputAndDisplayProps {
  timeToDisplay?: number,
  allowInput: boolean,
  onTimeInputChange: (arg0:number) => void,
}

function TimeInputAndDisplayContainer(props:TimeInputAndDisplayProps) {
  if(props.allowInput) {
    return(
      <TimeInput 
        startingTime={props.timeToDisplay}
        onChange={props.onTimeInputChange}
      />
    )
  } else {
    return(
      <TimeDisplay
        timeToDisplay={props.timeToDisplay!}
      />
    );
  }
}

export default TimeInputAndDisplayContainer;
