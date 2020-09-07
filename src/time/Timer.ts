interface TimerParams {
  duration: number,
  playing?: boolean,
  onSecond?: (...args: any[]) => void,
  onTimeout: (...args: any[]) => void,
}

class Timer {
  
  duration: number;
  private _startTime!: number;
  private _timeElapsed!: number;
  private _playing: boolean;
  private _timeoutUntilFullSecond: number;
  private _fullSecondInterval: number;
  private _timeout: number; // The ID of the timeout
  private _onSecond?: (...args: any[]) => void;
  private _onTimeout: (...args: any[]) => void;

  static defaultProps = {
    playing: false,
  };

  constructor(params:TimerParams) {
    this.duration = params.duration;
    this._playing = params.playing!;
    this._timeoutUntilFullSecond = -1;
    this._fullSecondInterval = -1;
    this._timeout = -1;
    this._onSecond = params.onSecond;
    this._onTimeout = params.onTimeout;

    this.reset();
  };



  reset = () => {
    this.clearTimeOutsAndInterval();
  
    this._startTime = Date.now();
    this._timeElapsed = 0;
  };

  start = () => {
    this._startTime = Date.now();
    
    this._playing = true;

    this.setTimeout();
    this.setTimeoutForOnSecondInterval();
  };

  pause = () => {
    this.clearTimeOutsAndInterval();

    this._timeElapsed += Date.now() - this._startTime;
    this._playing = false;
  };

  setTimeLeft = (milliseconds:number) => {
    this.clearTimeOutsAndInterval();;

    this._startTime = Date.now();
    this._timeElapsed = this.duration - milliseconds;

    if(this._playing) {
      this.setTimeout();
    }
  }


  private setTimeoutForOnSecondInterval = () => {
    const millisecondsUntilFullSecond = this.timeLeft % 1000;

    if(millisecondsUntilFullSecond > 0) {
      this._timeoutUntilFullSecond = window.setTimeout(
        this.onTimeoutForOnSecondInterval, 
        millisecondsUntilFullSecond
      );
    } else {
      this.setSecondInterval();
    }
  }

  private onTimeoutForOnSecondInterval = () => {
    this.updateSecond();
    this.setSecondInterval();
  }

  private setSecondInterval = () => {
    this._fullSecondInterval = window.setInterval(this.updateSecond, 1000);
  }

  private updateSecond = () => {
    if(this._onSecond) {
      this._onSecond();
    }
  }

  private clearTimeOutsAndInterval = () => {
    window.clearTimeout(this._timeout);
    window.clearTimeout(this._timeoutUntilFullSecond);
    window.clearInterval(this._fullSecondInterval);
  }

  private setTimeout = () => {
    this._timeout = window.setTimeout(this.onTimeout, this.timeLeft);
  }
  
  private onTimeout = () => {
    this._onTimeout();
    this.reset();
  }



  get playing(): boolean {
    return this._playing;
  }

  get timeElapsed(): number {
    // _timeElapsed is only updated when the timer is paused.
    // If the timer is playing, we need to calculate the current elapsed time.
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
