import React, { Component } from 'react'

interface TimerProps {
  duration: number,
  playing?: boolean,
  callback: (...args: any[]) => void,
}

class Timer extends Component {

  duration: number;
  
  private _startTime!: number;
  private _timeElapsed!: number;
  private _playing: boolean;
  private _timeout: number; // The ID of the timeout
  private _callback: (...args: any[]) => void;

  static defaultProps = {
    playing: false,
  };

  constructor(props:TimerProps) {
    super(props);

    this.duration = props.duration;
    this._playing = props.playing!;
    this._timeout = -1;
    this._callback = props.callback;

    this.reset();
  };



  reset = () => {
    window.clearTimeout(this._timeout);
  
    this._startTime = Date.now();
    this._timeElapsed = 0;
  };

  start = () => {
    this._startTime = Date.now();
    
    this._playing = true;

    this._timeout = window.setTimeout(this._callback, this.timeLeft);
  };

  pause = () => {
    window.clearTimeout(this._timeout);

    this._timeElapsed += Date.now() - this._startTime;
    this._playing = false;
  };



  get playing(): boolean {
    return this._playing;
  }

  get timeElapsed(): number {
    // _timeElapsed is only updated when the timer is paused.
    // If the timer is playing, we need to calculate it.
    if(this._playing) {
      return this._timeElapsed + Date.now() - this._startTime;
    } else {
      return this._timeElapsed;
    }
  }

  get timeLeft(): number {
    return this.duration - this.timeElapsed;
  }
}

export default Timer;
