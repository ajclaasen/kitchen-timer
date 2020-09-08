import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import { minutesOnClock, secondsOnClock } from '../time/timeHelpers';

interface TimeInputProps {
  startingTime?: number,
  onChange?: (arg0:number) => void,
}

interface TimeInputState {
  minutes: number,
  seconds: number,
}

class TimeInput extends Component<TimeInputProps, TimeInputState> {

  constructor(props:TimeInputProps) {
    super(props);

    const startingTime = props.startingTime || TimeInput.defaultProps.startingTime;

    this.state = {
      minutes: minutesOnClock(startingTime),
      seconds: secondsOnClock(startingTime),
    }
  }

  static defaultProps = {
    startingTime: 0,
    onChange: () => {},
  };

  updateMinutesAndSeconds = (milliseconds:number) => {
    this.setState({
      minutes: minutesOnClock(milliseconds),
      seconds: secondsOnClock(milliseconds),
    });
  }

  componentWillReceiveProps(nextProps:TimeInputProps) {
    if(nextProps.startingTime && nextProps.startingTime !== this.currentInputsToMilliseconds()) {
      this.updateMinutesAndSeconds(nextProps.startingTime);
    }
  }

  handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {minutes: Number(event.currentTarget.value)}, 
      this.onChange
    );
  }

  handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {seconds: Number(event.currentTarget.value)},
      this.onChange
    );
  }

  onChange = () => {
    this.props.onChange!(this.currentInputsToMilliseconds());
  }

  currentInputsToMilliseconds = () => {
    const minutesInMilliseconds = this.state.minutes * 60 * 1000;
    const secondsInMilliseconds = this.state.seconds * 1000;
    const timeInMilliseconds = minutesInMilliseconds + secondsInMilliseconds;

    return timeInMilliseconds
  }

  render() {
    
    return (
      <form autoComplete="off">
        <span className="kitchen-timer-time-field">
          <TextField
            id="minutes-field"
            label="Minutes"
            type="number"
            InputProps={{inputProps: { min:0 }}}
            value={this.state.minutes}
            onChange={this.handleMinutesChange}
          />
        </span>
        <span className="kitchen-timer-time-field">
          <TextField
            id="seconds-field"
            label="Seconds"
            type="number"
            InputProps={{inputProps: { min:0 }}}
            value={this.state.seconds}
            onChange={this.handleSecondsChange}
          />
        </span>
      </form>
    )
  }
}

export default TimeInput;
