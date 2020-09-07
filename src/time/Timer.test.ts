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
  const onSecond = jest.fn();
  const timer = new Timer({
    duration: duration,
    onSecond: onSecond,
    onTimeout: onTimeout,
  });

  return {
    timer,
    onSecond,
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

  describe('onTimeout', () => {
    it('is called after 1 second', () => {
      timer.start();

      advanceTime(1000);

      expect(onTimeout).toBeCalled();
    });

    it('is not called when the timer is paused after it is started', () => {
      timer.start();
      timer.pause();

      advanceTime(1000);

      expect(onTimeout).not.toBeCalled();
    });

    it('is not called when the timer is reset after it is started', () => {
      timer.start();
      advanceTime(500);
      timer.reset();

      advanceTime(1000);

      expect(onTimeout).not.toBeCalled();
    });

    it('is called after the right amount of time and not before when the timer is continued after paused', () => {
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

    it('is called after the amount of time specified by setTimeLeft, and not before', () => {
      timer.start();
      advanceTime(500);
      timer.setTimeLeft(750);
      advanceTime(500);

      expect(onTimeout).not.toBeCalled();

      advanceTime(250);

      expect(onTimeout).toBeCalled();
    });
  });

  describe('timeLeft', () => {
    it('returns the duration of the timer after initialization', () => {
      expect(timer.timeLeft).toEqual(1000);
    });

    it('returns the correct time during and after a pause', () => {
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

    it('returns the correct time after multiple pauses', () => {
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
});

describe('when the timer has 10000 ms duration', () => {
  let timer: Timer;
  let onSecond: jest.Mock;
  beforeEach(() => {
    ({ timer, onSecond } = setup(10000));
  })


  describe('onSecond', () => {
    it('is not called right away', () => {
      timer.start();
      advanceTime(10);

      expect(onSecond).not.toBeCalled();
    });

    it('is called after the first second', () => {
      timer.start();
      advanceTime(1000);

      expect(onSecond).toBeCalled();
    });

    it('has been called twice after the second second', () => {
      timer.start();
      advanceTime(2000);

      expect(onSecond).toHaveBeenCalledTimes(2);
    });

    it('does not get called after the timer has elapsed', () => {
      timer.start();
      advanceTime(10000);

      onSecond.mockClear();

      advanceTime(10000);

      expect(onSecond).not.toBeCalled();
    });

    it('does not get called unless a full second has elapsed while the timer was unpaused', () => {
      timer.start();
      advanceTime(500);
      timer.pause();
      advanceTime(500);
      timer.start();
      advanceTime(499);

      expect(onSecond).not.toBeCalled();

      advanceTime(1);

      expect(onSecond).toBeCalled();
    });
  });
});
