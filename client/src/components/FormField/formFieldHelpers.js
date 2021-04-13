import React from "react";

import closedEye from '../../img/closed-eye.svg';

export const getInputAttributes = (type) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case 'phone':
      return {
        type: 'phone',
        id: 'phone',
        name: 'phone',
        placeholder: 'Enter your mobile number',
        helper: '+91',
        minLength: 10,
        maxLength: 10,
        pattern: '[0-9]{10}',
      };
    case 'password':
      return {
        type: 'password',
        id: 'password',
        name: 'password',
        placeholder: 'Enter your password',
        helper: <img src={closedEye} alt="lock" />,
        minLength: 8,
      };
    case 'confirm':
      return {
        type: 'password',
        id: 'confirm',
        name: 'confirm',
        placeholder: 'Confirm password',
        // helper: <img src={padlock} alt="lock" />,
      };
    case 'login':
      return {
        type: 'text',
        id: 'login',
        name: 'login',
        placeholder: 'Enter your login',
        minLength: 1,
      };
    default:
      return {
        type: 'text',
        id: 'text',
        name: 'text',
        placeholder: 'text',
        helper: '',
      };
  }
};
