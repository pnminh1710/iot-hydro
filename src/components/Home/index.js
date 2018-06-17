import React, { Component } from 'react';

import withAuthorization from '../withAuthorization';
import style from './Home.css';

const authCondition = (authUser) => !!authUser;

const waterHeight = {
  height: '60%',
};

const fakeHistory = ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06', '07/06', ];

const listHistory = fakeHistory.map((element, key) => 
  <div key={key} className="column has-text-centered container">
    <div className={style.dateBox}>
      <p className="title is-5">{element}</p>
    </div>
  </div>
);

class HomePage extends Component {
  render() {
    return (
      <section className="section">
      <h1 className="title has-text-centered">Dashboard</h1>
        <div className="container">
          <div className="columns">
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Temperature</h2>
                <p className="title is-1">27 °C</p>
                <p className="has-text-primary">Current Value</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Humility</h2>
                <p className="title is-1">27 °C</p>
                <p className="has-text-primary">Current Value</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Water Pressure</h2>
                <p className="title is-1">27 °C</p>
                <p className="has-text-danger">Previos Value</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-quarter">
              <h2 className={`${style.titleData} title is-3`}>Water Level</h2>
              <div className={`${style.tank} has-text-centered`}>
                <p className="subtitle is-2">{waterHeight.height}</p>
                <div className={style.water} style={waterHeight}></div>
              </div>
            </div>
            <div className="column">
              <h2 className={`${style.titleData} title is-3`}>Water History</h2>
              <div className={`${style.box} columns`}>
                {listHistory}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withAuthorization(authCondition)(HomePage);
