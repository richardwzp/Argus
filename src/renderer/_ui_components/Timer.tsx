import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import TimeUnit, { unixTimeElapsed } from '@components/time';

interface TimerProps {
  countDownSeconds: number;
  startingUnixTime: number;
  restart: () => void;
}

export default function Timer({
  countDownSeconds,
  startingUnixTime,
  restart,
}: TimerProps): React.JSX.Element {
  const [sessionStartUnixTime, setSessionStartUnixTime] =
    useState<number>(startingUnixTime);
  const [currentTimer, setCurrentTimer] = useState<TimeUnit>(
    TimeUnit.of({ seconds: countDownSeconds }),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimer(() => {
        const newSeconds =
          countDownSeconds - unixTimeElapsed(sessionStartUnixTime);

        if (newSeconds <= 0) {
          clearInterval(interval);
          return TimeUnit.empty();
        }
        return TimeUnit.of({ seconds: newSeconds });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownSeconds, sessionStartUnixTime]);
  const { minutes, seconds } = currentTimer.getTime();
  const timeDisplay = (
    <div>
      <div>minutes: {minutes}</div>
      <div>seconds: {seconds}</div>
    </div>
  );
  const restartTimer = () => {
    const currentTime = new Date().getTime();
    setSessionStartUnixTime(currentTime);
    setCurrentTimer(TimeUnit.of({ seconds: countDownSeconds }));
    restart();
  };

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      {currentTimer.zero() ? <div>break time</div> : timeDisplay}
      <Button onClick={restartTimer}>press me to restart</Button>
    </Box>
  );
}
