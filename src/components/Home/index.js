import React, { Component } from 'react';
import { db } from '../../firebase/firebase';

import withAuthorization from '../withAuthorization';

import style from './Home.css';

const authCondition = (authUser) => !!authUser;

const fakeHistory = ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06', '07/06', ];

const listHistory = fakeHistory.map((element, key) => 
  <div key={key} className={`${style.dateBox} column has-text-centered is-2`}>
      <p className="title is-5">{element}</p>
  </div>
);

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: 0,
      humility: 0,
      moisture: 0,
      waterHeight: {
        height: '60%',
      },
    };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    db.ref('sensorData').on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(data) {
    const { temperature, humility, moisture } = data;
    this.setState({
      temperature,
      humility,
      moisture,
      waterHeight: {
        height: `${data.waterLevel}%`,
      },
    })
  }
  render() {
    const { temperature, humility, moisture, waterHeight } = this.state;
    return (
      <section className="section">
      <h1 className="title has-text-centered">Dashboard</h1>
        <div className="container">
          <div className="columns">
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Temperature</h2>
                <p className="title is-1">{temperature || '--'} °C</p>
                <p className="has-text-primary">Current Value</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Humility</h2>
                <p className="title is-1">{humility || '--'} %</p>
                <p className="has-text-primary">Current Value</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Moisture</h2>
                <p className="title is-1">{moisture || '--'} %</p>
                <p className="has-text-danger">Previous Value</p>
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
              <div className="columns is-mobile is-multiline">
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
