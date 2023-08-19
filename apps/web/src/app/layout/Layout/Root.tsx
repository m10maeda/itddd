import { type PropsWithChildren } from 'react';

import 'normalize.css';
import './Reboot.scss';
import '../../_typography/Typography.scss';

export function Root({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
