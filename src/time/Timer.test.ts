import Timer from './Timer';
import { doesNotReject } from 'assert';

const realDateNow = Date.now;

const setTime = (milliseconds:number) => {
  global.Date.now = jest.fn(() => milliseconds);
};

const advanceTime = (milliseconds:number) => {
  jest.advanceTimersByTime(milliseconds);
  setTime(Date.now() + milliseconds);
};

const setup = (duration: number) => {
  const onTimeout = jest.fn();
  const timer = new Timer({
      duration: duration,
      onTimeout: onTimeout,
  });

  return {
    timer,
    onTimeout,
  }
};

beforeAll(() => {
  setTime(new Date(Date.now()).getTime());
  jest.useFakeTimers();
});

afterAll(() => {
  global.Date.now = realDateNow;
});



describe('when the timer has 1000 ms duration', () => {
  let timer: Timer;
  let onTimeout: jest.Mock;
  beforeEach(() => {
    ({ timer, onTimeout } = setup(1000));
  })

  it('with a 1000 ms duration, the onTimeout is called after 1 second', () => {
    timer.start();
  
    advanceTime(1000);
  
    expect(onTimeout).toBeCalled();
  });

  it('when the timer is paused after it is started, the onTimeout is not called', () => {
    timer.start();
    timer.pause();
  
    advanceTime(1000);
  
    expect(onTimeout).not.toBeCalled();
  });

  it('when the timer is reset after it is started, the onTimeout is not called', () => {
    timer.start();
    advanceTime(500);
    timer.reset();
  
    advanceTime(1000);
  
    expect(onTimeout).not.toBeCalled();
  });

  it('when the timer is continued after paused, the onTimeout is called after the right amount of time', () => {
    timer.start();
    advanceTime(500);
    timer.pause();
    advanceTime(1000);
  
    expect(onTimeout).not.toBeCalled();
  
    timer.start();
    advanceTime(1);
  
    expect(onTimeout).not.toBeCalled();
  
    advanceTime(500);
  
    expect(onTimeout).toBeCalled();
  });

  it('onTimeout is called after setTime is called, regardless of earlier timeElapsed', () => {
    timer.start();
    advanceTime(500);
    timer.setTimeLeft(750);
    advanceTime(500);
  
    expect(onTimeout).not.toBeCalled();
  
    advanceTime(250);
  
    expect(onTimeout).toBeCalled();
  });

  it('timeLeft returns the duration of the timer after initialization', () => {
    expect(timer.timeLeft).toEqual(1000);
  });

  it('timeLeft returns the correct time during and after a pause', () => {
    timer.start();
    timer.pause();
    advanceTime(250);
  
    expect(timer.timeLeft).toEqual(1000);
  
    advanceTime(500);
  
    expect(timer.timeLeft).toEqual(1000);
  
    timer.start();
    advanceTime(250);
  
    expect(timer.timeLeft).toEqual(750);
  });

  it('timeLeft returns the correct time after multiple pauses', () => {
    timer.start();
    advanceTime(250);
    timer.pause();
  
    expect(timer.timeLeft).toEqual(750);
  
    timer.start();
    advanceTime(500);
    timer.pause();
  
    expect(timer.timeLeft).toEqual(250);
  
    timer.start();
    advanceTime(100);
  
    expect(timer.timeLeft).toEqual(150);
  });
});
