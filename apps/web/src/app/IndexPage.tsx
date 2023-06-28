import { Button } from '@itddd/ui';

import styles from './IndexPage.module.scss';

export function IndexPage() {
  return (
    <div className={styles.Page}>
      <h1>Welcome Frontend Web Application!</h1>

      <Button>Button</Button>
    </div>
  );
}
