import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import { millisecondsToAbsMinutes, millisecondsToAbsSeconds } from '../time/timeHelpers';

interface TimeInputProps {
  timeLeft?: number,
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

  displayedMinutes = () => {
    if(this.props.inputEnabled) {
      return this.state.minutes;
    } else {
      return this.minutesOnTimer(this.props.timeLeft!);
    }
  }

  minutesOnTimer = (milliseconds: number) => {
    // As we are rounding up seconds, we should round up a minute during the 
    // last second of a minute
    let minutes = millisecondsToAbsMinutes(this.props.timeLeft!)
    const withoutMinutes = milliseconds % 60000;
    if(withoutMinutes > 59000) {
      minutes++;
    }
    return minutes;
  }

  displayedSeconds = () => {
    if(this.props.inputEnabled) {
      return this.state.seconds;
    } else {
      return this.secondsOnTimer(this.props.timeLeft!);
    }
  }

  secondsOnTimer = (milliseconds: number) => {
    const withoutMinutes = milliseconds % 60000;

    // We do not show any time units smaller than a second, so it is more
    // intuitive to round up than to round down, so we +1 the rounded down value.
    let seconds = millisecondsToAbsSeconds(withoutMinutes);
    if(withoutMinutes % 1000 > 0) {
      seconds++;
    }
    // But 60 seconds should be displayed as a minute.
    if(seconds == 60) {
      return 0;
    }
    return seconds;
  } 

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
          value={this.displayedMinutes()}
          onChange={this.handleMinutesChange}
        />

        <TextField
          id="seconds-field"
          label="Seconds"
          type="number"
          disabled={!this.props.inputEnabled}
          InputProps={{inputProps: { min:0 }}}
          value={this.displayedSeconds()}
          onChange={this.handleSecondsChange}
        />

      </form>
    )
  }
}

export default TimeInput;
