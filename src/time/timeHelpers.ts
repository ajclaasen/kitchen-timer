export function millisecondsToAbsSeconds(timeInMilliseconds: number) {
  return Math.floor(Math.abs(timeInMilliseconds) / 1000);
}

export function millisecondsToAbsMinutes(timeInMilliseconds: number) {
  return Math.floor(Math.abs(timeInMilliseconds) / 60000);
}

export function secondsToMilliseconds(timeInSeconds: number) {
  return timeInSeconds * 1000;
}

export function minutesToMilliseconds(timeInMinutes: number) {
  return timeInMinutes * 60000;
}

// Converts a time (in milliseconds) to the amount of degrees the minute arm
// of a clock would be rotated from the top.
export function timeToDegrees(timeInMilliseconds: number) {
  return (timeInMilliseconds / 60000) * 6;
}

// Converts a string in the format of HHMMSS to an amount milliseconds.
export function stringToTime(inputString: string) {
  const inputNumber = Number(inputString);

  const seconds = inputNumber % 100;
  const minutes = (inputNumber % 10000 - seconds) / 100;
  const hours = (inputNumber - (minutes * 100) - seconds) / 10000;

  const totalTime = seconds * 1000
                  + minutes * 60 * 1000
                  + hours * 60 * 60 * 1000;

  return totalTime;
}

export function minutesAndSecondsToTime(minutes: number, seconds: number) {
  return minutesToMilliseconds(minutes) + secondsToMilliseconds(seconds);
}

export function minutesOnClock(milliseconds: number) {
  // As we are rounding up seconds as well, we should round up a minute during
  // the last second of a minute.
  let minutes = millisecondsToAbsMinutes(milliseconds);
  const withoutMinutes = milliseconds % 60000;
  if(withoutMinutes > 59000) {
    minutes++;
  }
  return minutes;
}

export function secondsOnClock(milliseconds: number) {
  const withoutMinutes = milliseconds % 60000;

  // We do not show any time units smaller than a second, so it is more
  // intuitive to round up than to round down, so we +1 the rounded down value.
  let seconds = millisecondsToAbsSeconds(withoutMinutes);
  if(withoutMinutes % 1000 > 0) {
    seconds++;
  }
  // But 60 seconds should be displayed as a minute instead.
  if(seconds == 60) {
    return 0;
  }
  return seconds;
}
