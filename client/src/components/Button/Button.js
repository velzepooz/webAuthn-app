import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export const Button = ({ text, type }) => {
  return (
    <button type={type} className={styles.button}>{text}</button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};
