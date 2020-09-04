import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import { millisecondsToAbsMinutes, millisecondsToAbsSeconds } from '../time/timeHelpers';

interface TimeInputProps {
  onChange?: (arg0:number) => void,
  enabled?: boolean,
  duration?: number,
}

interface TimeInputState {
  minutes: number,
  seconds: number,
}

class TimeInput extends Component<TimeInputProps, TimeInputState> {

  constructor(props:TimeInputProps) {
    super(props);

    this.setMinutesAndSeconds(props.duration!);
  }

  static defaultProps = {
    onChange: () => {},
    enabled: true,
    duration: 0,
  };

  setMinutesAndSeconds = (milliseconds:number) => {
    let durationLeft = milliseconds;

    const minutes = millisecondsToAbsMinutes(durationLeft);
    durationLeft -= minutes * 60 * 1000;

    const seconds = millisecondsToAbsSeconds(durationLeft);

    this.state = {
      minutes: minutes,
      seconds: seconds,
    };
  };

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
    const timeInMilliseconds = (this.minutes * 60 * 1000) + (this.seconds * 1000);

    this.props.onChange!(timeInMilliseconds);
  }

  render() {
    return (
      <form autoComplete="off">

        <TextField
          id="minutes-field"
          label="Minutes"
          type="number"
          disabled={!this.props.enabled}
          InputProps={{inputProps: { min:0 }}}
          value={this.state.minutes}
          onChange={this.handleMinutesChange}
        />

        <TextField
          id="seconds-field"
          label="Seconds"
          type="number"
          disabled={!this.props.enabled}
          InputProps={{inputProps: { min:0 }}}
          value={this.state.seconds}
          onChange={this.handleSecondsChange}
        />

      </form>
    )
  }
}

export default TimeInput;
