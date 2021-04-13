/* eslint-disable no-console */
import { loginUser, userLogOut } from '../redux/rootReducer';
import { makeRequestToApi } from './apiHelpers';

export const signUp = (data) => {
  return (dispatch) => {
    makeRequestToApi('signUp', 'POST', data)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        // eslint-disable-next-line no-useless-return
        throw new Error('Response not 200');
      })
      .then((json) => {
        localStorage.setItem('token', json.userData.token);
        window.location.href = window.origin + '/signIn';
        // dispatch(loginUser(json.userData.user));
      })
      .catch(e => console.log(e));
  };
};

export const signInUser = (data) => {
  return (dispatch) => {
    makeRequestToApi(
      'signIn',
      'POST',
      data,
      { Authorization: localStorage.getItem('token') },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        // eslint-disable-next-line no-useless-return
        throw new Error('Response not 200');
      })
      .then((json) => {
        if (json.status === 'success') {
          localStorage.setItem('token', json.userData.token);
          dispatch(loginUser(json.userData.user));
        } else {
          console.log('FrontEnd Error:', json.message);
        }
      })
      .catch(e => console.log(e));
  };
};

export const logOut = () => {
  return dispatch => {
    // localStorage.removeItem('token');
    dispatch(userLogOut());
  };
};
