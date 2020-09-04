import { millisecondsToAbsSeconds, millisecondsToAbsMinutes, timeToDegrees, 
         stringToTime } from './timeHelpers'

describe('millisecondsToAbsSeconds()', () => {
  it('returns 0 when passed 0', () => {
    expect(millisecondsToAbsSeconds(0)).toEqual(0);
  });
  
  it('return 1 when passed 1000', () => {
    expect(millisecondsToAbsSeconds(1000)).toEqual(1);
  });
  
  it('returns 1 when passed -1000', () => {
    expect(millisecondsToAbsSeconds(-1000)).toEqual(1);
  });

  it('returns 0 when passed 1', () => {
    expect(millisecondsToAbsSeconds(1)).toEqual(0);
  });

  it('returns 0 when passed 999', () => {
    expect(millisecondsToAbsSeconds(999)).toEqual(0);
  });

  it('returns 0 when passed -500', () => {
    expect(millisecondsToAbsSeconds(-500)).toEqual(0);
  });
});



describe('millisecondsToAbsMinutes()', () => {
  it('returns 0 when passed 0', () => {
    expect(millisecondsToAbsMinutes(0)).toEqual(0);
  });

  it('returns 1 when passed 60000', () => {
    expect(millisecondsToAbsMinutes(60000)).toEqual(1);
  });

  it('returns 1 when passed -60000', () => {
    expect(millisecondsToAbsMinutes(-60000)).toEqual(1);
  });

  it('returns 0 when passed 1', () => {
    expect(millisecondsToAbsMinutes(1)).toEqual(0);
  });

  it('returns 0 when passed 59999', () => {
    expect(millisecondsToAbsMinutes(59999)).toEqual(0);
  });
});

describe('timeToDegrees()', () => {
  it('returns 0 when passed 0', () => {
    expect(timeToDegrees(0)).toEqual(0);
  });

  it('returns 90 when passed 15 minutes', () => {
    expect(timeToDegrees(15 * 60000)).toEqual(90);
  });

  it('returns -90 when passed -15 minutes', () => {
    expect(timeToDegrees(-15 * 60000)).toEqual(-90);
  });
});

describe('stringToTime()', () => {
  it('returns 0 when passed an empty string', () => {
    expect(stringToTime("")).toEqual(0);
  });

  it('returns 1000 when passed "1"', () => {
    expect(stringToTime("1")).toEqual(1000);
  });

  it('returns 60000 when passed "100"', () => {
    expect(stringToTime("100")).toEqual(60000);
  });

  it('returns 3600000 when passed "10000"', () => {
    expect(stringToTime("10000")).toEqual(3600000);
  });

  it('returns 5025000 when passed "12345"', () => {
    expect(stringToTime("12345")).toEqual(5025000);
  });

  it('returns 360000000 when passed "1000000"', () => {
    expect(stringToTime("1000000")).toEqual(360000000);
  });

  it('returns 90000 when passed "90"', () => {
    expect(stringToTime("90")).toEqual(90000);
  });

  it('returns 5400000 when passed "9000"', () => {
    expect(stringToTime("9000")).toEqual(5400000);
  });

  it('returns NaN when passed "12A34"', () => {
    expect(stringToTime("12A34")).toEqual(NaN);
  });
});
