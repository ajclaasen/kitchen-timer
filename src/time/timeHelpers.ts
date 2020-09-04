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
