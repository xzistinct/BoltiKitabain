export function SecondsToTime(seconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return { hours, minutes, seconds: secondsLeft };
}

export function PrettyPrintSeconds(seconds: number) {
  seconds = Math.round(seconds);
  let time = SecondsToTime(seconds);
  return `${time.hours > 0 ? time.hours + ":" : ""}${
    time.minutes < 10 ? "0" : ""
  }${time.minutes}:${time.seconds < 10 ? "0" : ""}${time.seconds}`;
  ``;
}
