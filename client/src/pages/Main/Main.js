import React, { useCallback, useEffect } from 'react';
import styles from './Main.module.scss';
import { Header } from '../../components/Header/Header';
import { MainSection } from '../../components/MainSection/MainSection';
import { Heading } from '../../components/Heading/Heading';
import { SubHeading } from '../../components/SubHeading/SubHeading';
import { PageLink } from '../../components/PageLink/PageLink';
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <MainSection>
        <div className={styles.heading}>
          <Heading text="Explore future of Web" />
        </div>
        <div className={styles.subHeading}>
          <SubHeading text="Sign Up and try to login with Touch Id" />
        </div>
        <div className={styles.button}>
          <PageLink text="Sign Up" to="SignUp" />
        </div>
        <div className={styles.helper}>
          <p>ALREADY HAVE AN ACCOUNT?</p><Link className={styles.helperLink} to="signIn">LOG IN</Link>
        </div>
      </MainSection>
    </div>
  );
};
