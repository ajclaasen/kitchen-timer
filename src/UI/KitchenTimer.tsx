import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import PlayPauseButton from './PlayPauseButton';
import StopButton from './StopButton';

import { minutesAndSecondsToTime } from '../timeHelpers';

interface Time {
  time?: number;
  minutes?: number;
  seconds?: number;
  playing?: boolean;
}

class KitchenTimer extends Component<{}, Time>  {
  constructor(props:Time) {
    super(props);

    this.state = {
      time: props.time,
      minutes: props.minutes,
      seconds: props.seconds,
      playing: props.playing,
    };
  }

  static defaultProps = {
    time: 0,
    minutes: 0,
    seconds: 0,
    playing: false,
  };

  handleMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(event.currentTarget.value);
    const seconds = this.state.seconds!;
    const time = minutesAndSecondsToTime(minutes, seconds);

    this.setState({
      minutes: minutes,
      time: time,
    });
  };

  handleSeconds = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = this.state.minutes!;
    const seconds = Number(event.currentTarget.value);
    const time = minutesAndSecondsToTime(minutes, seconds);

    this.setState({
      seconds: seconds,
      time: time,
    });
  };

  togglePlaying = () => {
    this.setState({
      playing: !this.state.playing,
    });
  };

  render() {
    return (
      <form autoComplete="off">

        <TextField
          id="minutes-field"
          label="Minutes"
          type="number"
          InputProps={{inputProps: {min:0}}}
          onChange={this.handleMinutes}
        />

        <TextField
          id="seconds-field"
          label="Seconds"
          type="number"
          InputProps={{inputProps: {min:0}}}
          onChange={this.handleSeconds}
        />

        <PlayPauseButton playing={this.state.playing} onClick={this.togglePlaying} />
        <StopButton />
        {this.state.time}

      </form>
    );
  };
};

export default KitchenTimer;