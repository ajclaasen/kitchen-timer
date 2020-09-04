
interface TimerParams {
  duration: number,
  playing?: boolean,
  onTimeout: (...args: any[]) => void,
}

class Timer {
  
  duration: number;
  private _startTime!: number;
  private _timeElapsed!: number;
  private _playing: boolean;
  private _timeout: number; // The ID of the timeout
  private _onTimeout: (...args: any[]) => void;

  static defaultProps = {
    playing: false,
  };

  constructor(params:TimerParams) {
    this.duration = params.duration;
    this._playing = params.playing!;
    this._timeout = -1;
    this._onTimeout = params.onTimeout;

    this.reset();
  };



  reset = () => {
    this.clearTimeout();
  
    this._startTime = Date.now();
    this._timeElapsed = 0;
  };

  start = () => {
    this._startTime = Date.now();
    
    this._playing = true;

    this.setTimeout();
  };

  pause = () => {
    this.clearTimeout();

    this._timeElapsed += Date.now() - this._startTime;
    this._playing = false;
  };

  setTimeLeft = (milliseconds:number) => {
    this.clearTimeout();

    this._startTime = Date.now();
    this._timeElapsed = this.duration - milliseconds;

    if(this._playing) {
      this.setTimeout();
    }
  }


  private clearTimeout = () => {
    window.clearTimeout(this._timeout);
  }

  private setTimeout = () => {
    this._timeout = window.setTimeout(this._onTimeout, this.timeLeft);
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
