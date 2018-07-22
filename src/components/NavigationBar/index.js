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
  <div className="navbar is-primary" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <p className="navbar-item">
        <Link className="navbar-item" to={routes.HOME}>IoT-H</Link>
      </p>
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className="navbar-menu">
      <div className="navbar-end">
        <Link className="navbar-item" to={routes.CONTROL}>Control</Link>
        <Link className="navbar-item" to={routes.LOGS}>Logs</Link>
        <Link className="navbar-item" to={routes.CATEGORIES}>Categories</Link>
        <Link className="navbar-item" to={routes.PRODUCTS}>Products</Link>
        <Link className="navbar-item" to={routes.SETTINGS}>Settings</Link>
        <SignOutButton />
      </div>
    </div>
  </div>

const NavigationNonAuth = () => null;

export default Navigation;