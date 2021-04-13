import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signUp } from '../../api/api';
import styles from "../SignUp/SignUp.module.scss";
import { Header } from "../../components/Header/Header";
import { MainSection } from "../../components/MainSection/MainSection";
import { Heading } from "../../components/Heading/Heading";
import { FormWrapper } from '../../components/FormWrapper/FormWrapper';

export const SignUp = () => {
  const user = useSelector(state => state.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const registerNewUser = useCallback(
    data => dispatch(signUp(data)), [dispatch],
  );

  const onSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    registerNewUser(data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      history.push('/signIn');
    }
  }, [history]);

  useEffect(() => {
    if (user) {
      history.push('/home');
    }
  }, [user, history]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <MainSection>
        <div className={styles.heading}>
          <Heading text="Create demo account" isForm={true} />
        </div>
        <div className={styles.form}>
          <FormWrapper pageName="Sign Up" buttonText="GET STARTED" />
        </div>
        <div className={styles.helper}>
          <p>ALREADY HAVE AN ACCOUNT?</p><Link className={styles.helperLink} to="signIn">LOG IN</Link>
        </div>
      </MainSection>
    </div>
  );
};
