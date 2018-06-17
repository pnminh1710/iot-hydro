import React from 'react';

import AuthUserContext from '../AuthUserContext';
import PasswordForgetForm from '../PasswordForget/PasswordForgetForm';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../withAuthorization';

const authCondition = (authUser) => !!authUser;

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

export default withAuthorization(authCondition)(AccountPage);
