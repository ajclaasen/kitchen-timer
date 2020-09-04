
interface TimerProps {
  duration: number,
  playing?: boolean,
  callback: (...args: any[]) => void,
}

class Timer {

  private _props: TimerProps;
  
  private _startTime!: number;
  private _timeElapsed!: number;
  private _playing: boolean;
  private _timeout: number; // The ID of the timeout
  private _callback: (...args: any[]) => void;

  static defaultProps = {
    playing: false,
  };

  constructor(props:TimerProps) {
    this._props = props;

    this._playing = props.playing!;
    this._timeout = -1;
    this._callback = props.callback;

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

  setTime = (milliseconds:number) => {
    this.clearTimeout();

    this._startTime = Date.now();
    this._timeElapsed = this._props.duration - milliseconds;

    if(this._playing) {
      this.setTimeout();
    }
  }


  private clearTimeout = () => {
    window.clearTimeout(this._timeout);
  }

  private setTimeout = () => {
    this._timeout = window.setTimeout(this._callback, this.timeLeft);
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
    return this._props.duration - this.timeElapsed;
  }
}

export default Timer;
