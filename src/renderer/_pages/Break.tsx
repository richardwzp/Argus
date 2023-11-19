import Timer from '@ui-components/Timer';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function BreakPage(): React.JSX.Element {
  const param = new URLSearchParams(useLocation().search);
  const seconds = param.get('breakDurationInSeconds') ?? '30';

  return (
    <div>
      this is break page
      <Timer
        countDownSeconds={parseInt(seconds, 10)}
        startingUnixTime={new Date().getTime()}
        restart={() => {}}
      />
    </div>
  );
}
