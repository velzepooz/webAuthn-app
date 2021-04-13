import React from "react";
import styles from "./FormField.module.scss";
import { getInputAttributes } from './formFieldHelpers';

export const FormField = ({ type, value = '' }) => {
  const inputAttributes = getInputAttributes(type);

  return (
    <label className={styles.label} htmlFor={inputAttributes.id}>
      {type === 'password'
        ? <span className={styles.helper}></span>
        : null
      }
      <input
        className={styles.input}
        id={inputAttributes.id}
        name={inputAttributes.name}
        type={inputAttributes.type}
        minLength={inputAttributes.minLength}
        maxLength={inputAttributes.maxLength}
        pattern={inputAttributes.pattern}
        placeholder={inputAttributes.placeholder}
        // onChange={handleChange}
        // value={value}
      />
      <span className={styles.error}>123213</span>
    </label>
  );
};
