import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../api/api';
import { registerCredential } from '../api/webAuthnApi';

const style = {
  header: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between'
  },
  main: {
    width: '100%',
    display: 'grid',
    alignContent: 'center',
  },
  buttonStyle: {
    display: 'block',
  },
};

export const Home = () => {
  const history = useHistory();
  const user = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const userLogOut = useCallback(
    () => dispatch(logOut()), [dispatch]
  );

  useEffect(() => {
    if (!user) {
      return history.push('/signIn');
    }
  }, [user, history]);

  return (
    <div className="row">
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a type="button" onClick={userLogOut}>Logout</a></li>
          </ul>
        </div>
      </nav>
      <main style={style.main}>
        <h1>Hello,
          {user
            ? user.name
            : 'User'
          }
        </h1>
        <button onClick={registerCredential} className="btn waves-effect waves-light" type="button">
          Enable TouchId
        </button>
      </main>
    </div>
  );
};
