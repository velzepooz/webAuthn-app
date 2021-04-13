/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { FormField } from '../FormField/FormField';
import { Button } from '../Button/Button';
import styles from './Form.module.scss';

export const Form = ({ buttonText, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <FormField type="login" />
        <FormField type="password" />
      </div>
      <Button text={buttonText} />
    </form>
  );
};

Form.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
