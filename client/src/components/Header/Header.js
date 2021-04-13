import React, { useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../img/touchId.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={logo}
        alt="App logo"
        title="App logo"
      />
      {/*<NavLink className={styles.button} to="SignIn">*/}
      {/*  Sign In*/}
      {/*</NavLink>*/}
    </header>
  );
};
