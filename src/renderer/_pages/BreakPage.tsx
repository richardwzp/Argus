import Break from '@ui-components/Break';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function BreakPage(): React.JSX.Element {
  const param = new URLSearchParams(useLocation().search);
  const seconds = param.get('breakDurationInSeconds') ?? '30';

  return <Break breakDurationInSeconds={parseInt(seconds, 10)} />;
}
