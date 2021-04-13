/* eslint-disable consistent-return */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { Main } from './pages/Main/Main';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/home" component={Home} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
      </Switch>
    </>
  );
};

export default App;
