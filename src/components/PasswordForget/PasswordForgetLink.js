import React from 'react';
import { Link } from 'react-router-dom';

const PasswordForgetLink = () =>
  <p className="has-text-centered">
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetLink;
