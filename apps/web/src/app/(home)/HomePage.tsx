import { Button } from '@itddd/ui';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <div className={styles.Page}>
      <h1>Welcome Frontend Web Application!</h1>

      <Button>Button</Button>
    </div>
  );
}
