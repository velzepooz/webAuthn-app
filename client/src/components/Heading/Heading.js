import React from "react";
import classnames from 'classnames';
import styles from './Heading.module.scss';

export const Heading = ({ text, isForm = false }) => {
  const cssClasses = classnames(
    styles.heading,
    {
      [styles.headingSignUp]: isForm
    }
  );

  return (
    <h1 className={cssClasses}>{text}</h1>
  );
};
