import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import styles from './FormWrapper.module.scss';

export const FormWrapper = ({ pageName, buttonText, onSubmit }) => {
  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>{pageName}</h1>
      <Form buttonText={buttonText} onSubmit={onSubmit} />
    </div>
  );
};

FormWrapper.propTypes = {
  pageName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
