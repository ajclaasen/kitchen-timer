export function absSecondsLeft(timeInMilliseconds: number) {
  return Math.floor(Math.abs(timeInMilliseconds) / 1000);
}

export function absMinutesLeft(timeInMilliseconds: number) {
  return Math.floor(Math.abs(timeInMilliseconds) / 60000);
}

// Converts a time (in milliseconds) to the amount of degrees the minute arm
// of a clock would be rotated from the top.
export function timeToDegrees(timeInMilliseconds: number) {
  return (timeInMilliseconds / 60000) * 6;
}