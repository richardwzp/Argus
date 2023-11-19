import { useEffect, useState } from 'react';
import Timer from '@ui-components/Timer';
import { Channels } from '../../main/ipc-events/preload-events';

export default function MainTimer() {
  const [countDownSeconds, setCountDownSeconds] = useState<number>();
  const [startingUnixTime, setStartingUnixTime] = useState<number>();
  useEffect(() => {
    window.electron.ipcRenderer.on(Channels.TIMES_UP, () => {});
    window.electron.ipcRenderer.on(
      Channels.STARTING_SECONDS,
      (seconds: number, givenStartingUnixTime: number) => {
        setCountDownSeconds(seconds);
        setStartingUnixTime(givenStartingUnixTime);
      },
    );
  }, []);
  const restart = () => {
    window.electron.ipcRenderer.sendMessage(Channels.RESTART_TIMER);
  };

  return (
    <div>
      {countDownSeconds === undefined ||
      startingUnixTime === undefined ? null : (
        <Timer
          countDownSeconds={countDownSeconds}
          startingUnixTime={startingUnixTime}
          restart={restart}
        />
      )}
    </div>
  );
}
