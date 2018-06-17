import React from 'react';
import { withRouter } from 'react-router-dom';

import style from './style.css';

import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';

const SignInPage = ({ history }) =>
  <div className={style.wrapper}>
    <div className={style.form}>
      <h1 className={`${style.title} title is-1 has-text-centered`}>Sign In</h1>
      <SignInForm history={history} />
      <br/>
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>

export default withRouter(SignInPage);
