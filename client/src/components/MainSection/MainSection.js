import React, { useCallback, useEffect } from 'react';
import styles from './MainSection.module.scss';

export const MainSection = ({ children }) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};
