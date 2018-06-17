import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import style from './style.css';

import * as routes from '../../constants/routes';

const LandingPage = ({ authUser }) => {
  if (authUser) return (<Redirect
    to={{
      pathname: "/home",
    }}
  />)
  return (
    <div className={style.wrapper}>
    <div className={style.description}>
      <h1 className={`${style.title} title is-2`}>IoT - Hydroponic</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nunc et pharetra metus, in dignissim est.
        Curabitur in nisi pulvinar velit congue sagittis.
        Nunc sed nunc a velit rhoncus pretium.
        Aenean vestibulum nulla ac finibus dignissim.
        Morbi vel tellus condimentum nibh.</p>
      <button className={`${style.buttonLogin} button is-large is-rounded is-success is-outlined`}>
        <Link to={routes.SIGN_IN}>Sign In</Link>
      </button>
    </div>
  </div>
  )
}


export default LandingPage;
