interface TimerTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default class TimeUnit {
  private days: number;

  private hours: number;

  private minutes: number;

  private seconds: number;

  private constructor(
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
  ) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  getTimeInSeconds(): number {
    return this.minutes * 60 + this.seconds;
  }

  zero(): boolean {
    return (
      this.days === 0 &&
      this.hours === 0 &&
      this.minutes === 0 &&
      this.seconds === 0
    );
  }

  getTime(): TimerTime {
    return {
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }

  static normalize(tu: TimerTime) {
    let { days, hours, minutes, seconds } = tu;
    while (seconds < 0) {
      minutes -= 1;
      seconds += 60;
    }
    while (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }
    while (hours < 0) {
      days -= 1;
      hours += 24;
    }
    if (days < 0) {
      throw Error(
        `days became negative the time (${days}, ${hours}, ${minutes}, ${seconds})`,
      );
    }
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  static of(tu: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }): TimeUnit {
    const normalizedTime = TimeUnit.normalize({
      days: tu.days ?? 0,
      hours: tu.hours ?? 0,
      minutes: tu.minutes ?? 0,
      seconds: tu.seconds ?? 0,
    });
    let { days, hours, minutes } = normalizedTime;
    const { seconds } = normalizedTime;
    const finalSeconds = seconds % 60;
    minutes += Math.floor(seconds / 60);
    const finalMinutes = minutes % 60;
    hours += Math.floor(minutes / 60);
    const finalHours = hours % 60;
    days += Math.floor(hours / 60);
    const finalDays = days;
    return new TimeUnit(finalDays, finalHours, finalMinutes, finalSeconds);
  }

  static empty(): TimeUnit {
    return new TimeUnit(0, 0, 0, 0);
  }
}

export function passSeconds(incSeconds: number, timeUnit: TimeUnit): TimeUnit {
  const { days, hours, minutes, seconds } = timeUnit.getTime();

  return TimeUnit.of({
    days,
    hours,
    minutes,
    seconds: seconds + incSeconds,
  });
}

export function unixTimeElapsed(startingUnixTime: number): number {
  const diff = new Date().getTime() - startingUnixTime;
  return Math.floor(diff / 1000);
}
