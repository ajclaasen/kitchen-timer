import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import { millisecondsToAbsMinutes, millisecondsToAbsSeconds } from '../time/timeHelpers';

interface TimeInputProps {
  onChange?: (arg0:number) => void,
  inputEnabled?: boolean,
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
    inputEnabled: true,
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
    this.setState({minutes: Number(event.currentTarget.value)}, 
      this.onChange
    );
  }

  handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({seconds: Number(event.currentTarget.value)},
      this.onChange
    );
  }

  onChange = () => {
    const minutesInMilliseconds = this.state.minutes * 60 * 1000;
    const secondsInMilliseconds = this.state.seconds * 1000;
    const timeInMilliseconds = minutesInMilliseconds + secondsInMilliseconds;

    this.props.onChange!(timeInMilliseconds);
  }

  render() {
    return (
      <form autoComplete="off">

        <TextField
          id="minutes-field"
          label="Minutes"
          type="number"
          disabled={!this.props.inputEnabled}
          InputProps={{inputProps: { min:0 }}}
          value={this.state.minutes}
          onChange={this.handleMinutesChange}
        />

        <TextField
          id="seconds-field"
          label="Seconds"
          type="number"
          disabled={!this.props.inputEnabled}
          InputProps={{inputProps: { min:0 }}}
          value={this.state.seconds}
          onChange={this.handleSecondsChange}
        />

      </form>
    )
  }
}

export default TimeInput;
