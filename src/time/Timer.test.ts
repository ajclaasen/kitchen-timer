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

beforeAll(() => {
  setTime(new Date(Date.now()).getTime());
  jest.useFakeTimers();
});

afterAll(() => {
  global.Date.now = realDateNow;
});



it('with a 1000 ms duration, the callback is called after 1 second', () => {
  const callback = jest.fn();

  const timer = new Timer({
    duration: 1000,
    callback: callback,
  });

  timer.start();

  advanceTime(1000);

  expect(callback).toBeCalled();
});



it('when the timer is paused after it is started, the callback is not called', () => {
  const callback = jest.fn();

  const timer = new Timer({
    duration: 500,
    callback: callback,
  });

  timer.start();
  timer.pause();

  advanceTime(1000);

  expect(callback).not.toBeCalled();
});



it('when the timer is reset after it is started, the callback is not called', () => {
  const callback = jest.fn();

  const timer = new Timer({
    duration: 750,
    callback: callback,
  });

  timer.start();
  advanceTime(500);
  timer.reset();

  advanceTime(1000);

  expect(callback).not.toBeCalled();
});



it('when the timer is continued after paused, the callback is called after the right amount of time', () => {
  const callback = jest.fn();

  const timer = new Timer({
    duration: 1000,
    callback: callback,
  });

  timer.start();
  advanceTime(500);
  timer.pause();
  advanceTime(1000);

  expect(callback).not.toBeCalled();

  timer.start();
  advanceTime(1);

  expect(callback).not.toBeCalled();

  advanceTime(500);

  expect(callback).toBeCalled();
});



it('timeLeft returns the duration of the timer after initialization', () => {
  const duration = 1234;
  const timer = new Timer({
    duration: duration, 
    callback: () => {},
  });

  expect(timer.timeLeft).toEqual(duration);
});



it('timeLeft returns the correct time during and after a pause', () => {
  const duration = 1000;
  const timer = new Timer({
    duration: duration,
    callback: () => {},
  });

  timer.start();
  timer.pause();
  advanceTime(250);

  expect(timer.timeLeft).toEqual(duration);

  advanceTime(500);

  expect(timer.timeLeft).toEqual(duration);

  timer.start();
  advanceTime(250);

  expect(timer.timeLeft).toEqual(duration - 250);
});



it('timeLeft returns the correct time after multiple pauses', () => {
  const duration = 1000;
  const timer = new Timer({
    duration: duration,
    callback: () => {},
  });

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
