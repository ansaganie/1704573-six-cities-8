import React from 'react';
import styles from './spinner.module.css';

function Spinner(): JSX.Element {
  return (
    <div data-testid="spinner" className={styles.loader}>Loading...</div>
  );
}

export default Spinner;
