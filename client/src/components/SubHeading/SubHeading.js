import React from "react";
import styles from './SubHeading.module.scss';

export const SubHeading = ({ text }) => {
  return (
    <h3 className={styles.heading}>{text}</h3>
  );
};
