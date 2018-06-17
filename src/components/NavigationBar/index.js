import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <p className="navbar-item">
        <Link to={routes.HOME}>IoT-H</Link>
      </p>
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className="navbar-menu">
      <div className="navbar-end">
          <Link className="navbar-item" to={routes.LANDING}>Landing</Link>
          <Link className="navbar-item" to={routes.HOME}>Home</Link>
          <Link className="navbar-item" to={routes.ACCOUNT}>Account</Link>
          <SignOutButton />
      </div>
    </div>
  </nav>

const NavigationNonAuth = () => null;

export default Navigation;