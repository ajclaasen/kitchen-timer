import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import Timer from '../time/Timer';
import TimeInput from './TimeInput';
import PlayPauseButton from './PlayPauseButton';
import StopButton from './StopButton';

import { minutesAndSecondsToTime } from '../time/timeHelpers';

interface KitchenTimerProps {
  duration?: number;
  playing?: boolean;
}

interface KitchenTimerState {
  duration?: number;
  playing?: boolean;
}

class KitchenTimer extends Component<KitchenTimerProps, KitchenTimerState>  {

  constructor(props:KitchenTimerProps) {
    super(props);

    this.state = {
      duration: props.duration,
      playing: props.playing,
    };
  }

  static defaultProps = {
    duration: 0,
    playing: false,
  };

  togglePlaying = () => {
    this.setState({
      playing: !this.state.playing,
    });
  };

  onInputChange = (milliseconds:number) => {
    console.log(milliseconds);
  }

  render() {
    return (
      <div>
        <TimeInput inputEnabled={!this.state.playing} onChange={this.onInputChange} />
        <PlayPauseButton playing={this.state.playing} onClick={this.togglePlaying} />
        <StopButton />
      </div>
    );
  };
};

export default KitchenTimer;