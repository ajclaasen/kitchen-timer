import { absSecondsLeft, absMinutesLeft, timeToDegrees } from './timeHelpers'

describe('absSecondsLeft()', () => {
  it('returns 0 when passed 0', () => {
    expect(absSecondsLeft(0)).toEqual(0);
  });
  
  it('return 1 when passed 1000', () => {
    expect(absSecondsLeft(1000)).toEqual(1);
  });
  
  it('returns 1 when passed -1000', () => {
    expect(absSecondsLeft(-1000)).toEqual(1);
  });

  it('returns 0 when passed 1', () => {
    expect(absSecondsLeft(1)).toEqual(0);
  });

  it('returns 0 when passed 999', () => {
    expect(absSecondsLeft(999)).toEqual(0);
  });

  it('returns 0 when passed -500', () => {
    expect(absSecondsLeft(-500)).toEqual(0);
  });
});



describe('absMinutesLeft()', () => {
  it('returns 0 when passed 0', () => {
    expect(absMinutesLeft(0)).toEqual(0);
  });

  it('returns 1 when passed 60000', () => {
    expect(absMinutesLeft(60000)).toEqual(1);
  });

  it('returns 1 when passed -60000', () => {
    expect(absMinutesLeft(-60000)).toEqual(1);
  });

  it('returns 0 when passed 1', () => {
    expect(absMinutesLeft(1)).toEqual(0);
  });

  it('returns 0 when passed 59999', () => {
    expect(absMinutesLeft(59999)).toEqual(0);
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
})