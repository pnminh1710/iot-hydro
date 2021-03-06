import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import NavigationBar from './NavigationBar';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import ControlPage from './ControlPage';
import HistoryPage from './HistoryPage';
import CategoriesPage from './Categories';
import Products from './Products';
import Settings from './Settings';
import Logs from './Logs';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';
import withAuthentication from './withAuthenticantion';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      showNavbar: false,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  toggleNavbar() {
    this.setState({ showNavbar: !this.state.showNavbar});
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar authUser={this.state.authUser} toggleNavbar={this.toggleNavbar} showNavbar={this.state.showNavbar} />
          
          <Route exact path={routes.LANDING} component={() => <LandingPage authUser={this.state.authUser} />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Route exact path={routes.CONTROL} component={() => <ControlPage />} />
          <Route exact path={routes.HISTORY} component={() => <HistoryPage />} />
          <Route exact path={routes.CATEGORIES}  component={() => <CategoriesPage />} />
          <Route exact path={routes.SETTINGS}  component={() => <Settings />} />
          <Route exact path={routes.LOGS}  component={() => <Logs />} />
          <Route path={routes.PRODUCTS}  component={() => <Products />} />
        </div>
      </Router>)
  }
}

export default withAuthentication(App);
