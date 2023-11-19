import React from 'react';
import Timer from './Timer';

interface BreakProps {
  breakDurationInSeconds: number;
}

export default function Break({
  breakDurationInSeconds,
}: BreakProps): React.JSX.Element {
  return (
    <div>
      this is break page
      <Timer
        countDownSeconds={breakDurationInSeconds}
        startingUnixTime={new Date().getTime()}
        restart={() => {}}
      />
    </div>
  );
}
