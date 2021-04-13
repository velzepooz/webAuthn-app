import React from "react";
import { Link } from "react-router-dom";
import styles from './PageLink.module.scss';

export const PageLink = ({ text, to }) => {
  return (
    <Link className={styles.button} to={to}>
      {text}
    </Link>
  );
};
