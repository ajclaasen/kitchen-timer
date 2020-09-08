import React, { Component } from 'react';

import Timer from '../time/Timer';
import PlayPauseButton from './PlayPauseButton';
import StopButton from './StopButton';

import TimeInputAndDisplayContainer from './TimeInputAndDisplayContainer';

interface KitchenTimerProps {
  duration?: number,
  playing?: boolean,
}

interface KitchenTimerState {
  playing: boolean,
  timerHasStarted: boolean,
  timer: Timer,
  timeToDisplay: number,
}

class KitchenTimer extends Component<KitchenTimerProps, KitchenTimerState>  {

  constructor(props:KitchenTimerProps) {
    super(props);

    this.state = {
      playing: props.playing || KitchenTimer.defaultProps.playing,
      timerHasStarted: false,
      timer: new Timer({
        duration: props.duration || KitchenTimer.defaultProps.duration, 
        onSecond: this.onEverySecond,
        onTimeout: this.alarm}),
      timeToDisplay: props.duration || KitchenTimer.defaultProps.duration,
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
  }

  reset = () => {
    this.state.timer.reset();
    this.setState({
      playing: false,
      timerHasStarted: false,
      timeToDisplay: this.state.timer.duration,
    });
  }

  alarm = () => {
    this.reset();

    window.alert("ALARM");
  }

  onInputChange = (milliseconds:number) => {
    if(this.state.timerHasStarted) {
      this.state.timer.setTimeLeft(milliseconds);
    } else {
      this.state.timer.duration = milliseconds;
    }
    
    this.setState({timeToDisplay: milliseconds});
  }

  onEverySecond = () => {
    this.setState({timeToDisplay: this.state.timer.timeLeft});
  }

  render() {
    return (
      <div className="kitchen-timer">
        <div className="kitchen-timer-input-container">
          <TimeInputAndDisplayContainer 
            timeToDisplay={this.state.timeToDisplay}
            allowInput={!this.state.playing}
            onTimeInputChange={this.onInputChange}
          />
        </div>
        <div className="kitchen-timer-controls">
          <PlayPauseButton
            playing={this.state.playing}
            onClick={this.togglePlaying}
          />
          <StopButton onClick={this.reset} />
        </div>
      </div>
    );
  };
};

export default KitchenTimer;