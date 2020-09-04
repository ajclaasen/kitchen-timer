import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import Timer from '../time/Timer';
import TimeInput from './TimeInput';
import PlayPauseButton from './PlayPauseButton';
import StopButton from './StopButton';

import { minutesAndSecondsToTime } from '../time/timeHelpers';

interface KitchenTimerProps {
  duration?: number,
  playing?: boolean,
}

interface KitchenTimerState {
  playing?: boolean;
  timerHasStarted: boolean;
  timer: Timer;
}

class KitchenTimer extends Component<KitchenTimerProps, KitchenTimerState>  {

  constructor(props:KitchenTimerProps) {
    super(props);

    this.state = {
      playing: props.playing,
      timerHasStarted: false,
      timer: new Timer({duration: props.duration!, onTimeout: this.alarm}),
    };
  }

  static defaultProps = {
    duration: 0,
    playing: false,
  };

  togglePlaying = () => {
    const playing = !this.state.playing;

    playing ? this.play() : this.pause()
  };

  play = () => {
    this.state.timer.start();

    this.setState({
      playing: true,
      timerHasStarted: true,
    });
  }

  pause = () => {
    this.state.timer.pause();
    this.setState({
      playing: false,
    });
    
    console.log(`Alarm paused with ${this.state.timer.timeLeft} milliseconds left.`);
  }

  reset = () => {
    this.setState({
      playing: false,
      timerHasStarted: false,
    });
    this.state.timer.reset();
  }

  alarm = () => {
    this.reset();

    console.log(`Alarm called after ${this.state.timer.duration} milliseconds.`);
    window.alert("ALARM");
  }

  onInputChange = (milliseconds:number) => {
    if(this.state.timerHasStarted) {
      this.state.timer.setTimeLeft(milliseconds);
    } else {
      this.state.timer.duration = milliseconds;
    }
  }

  render() {
    return (
      <div>
        <TimeInput inputEnabled={!this.state.playing} onChange={this.onInputChange} />
        <PlayPauseButton playing={this.state.playing} onClick={this.togglePlaying} />
        <StopButton onClick={this.reset}/>
      </div>
    );
  };
};

export default KitchenTimer;