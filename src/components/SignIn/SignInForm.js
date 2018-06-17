import React, { Component } from 'react';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import style from './style.css'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    this.setState({ loading: true })

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.setState({ loading: false });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
        this.setState({ loading: false });
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
      loading,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <button className={`${loading === true ? 'is-loading' : ''} button is-primary is-fullwidth`} disabled={isInvalid} type="submit" >
          Sign In
        </button>
        {error && <p className={`${style.buttonLogin} has-text-danger`}>{error.message}</p>}
        <br />
      </form>
    );
  }
}

export default SignInForm;
