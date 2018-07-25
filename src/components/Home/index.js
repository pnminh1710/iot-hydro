import React, { Component } from 'react';
import { db } from '../../firebase/firebase';

import withAuthorization from '../withAuthorization';

import style from './Home.css';
import { database } from '../../firebase';

const authCondition = (authUser) => !!authUser;

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
      currentProjest: {
        category: {},
      }
    };
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
  }
  componentDidMount() {
    db.ref('sensor').on('value', snapshot => {
      this.getData(snapshot.val());
    });
    database.getCurrentProject()
      .then((snapshot) => {
        this.setData(snapshot.val());
      })
  }

  setData(currentProjest) {
    this.setState({ currentProjest });
  }

  getData(data) {
    const { temp, hum, moi } = data;
    this.setState({
      temperature: temp,
      humility: hum,
      moisture: moi,
      waterHeight: {
        height: `${Math.floor(data.waLevel / 13 * 100)}%`,
      },
    })
  }
  render() {
    const { temperature, humility, moisture, waterHeight, currentProjest } = this.state;
    return (
      <section className="section">
        <h1 className="title has-text-centered">Dashboard</h1>
        <div className="container">
          <div className="columns">
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Temperature</h2>
                <p className="title is-1">{temperature || '--'} °C</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Humility</h2>
                <p className="title is-1">{humility || '--'} %</p>
              </div>
            </div>
            <div className="column has-text-centered">
              <div className="box">
                <h2 className={`${style.titleData} title is-3`}>Moisture</h2>
                <p className="title is-1">{moisture || '--'} %</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-quarter">
              <h2 className={`${style.titleData} title is-3 has-text-centered`}>Water Level</h2>
              <div className={`${style.tank} has-text-centered`}>
                <p className="subtitle is-2 has-text-centered water-level">{waterHeight.height}</p>
                <div className={style.water} style={waterHeight}></div>
              </div>
            </div>
            <div className="column">
              <h2 className={`${style.titleData} title is-3`}>Current Projest</h2>
                <div className="category-wrapper column">
                  <h1 className="title is-4">{`Name: ${currentProjest.name || '--'}`}</h1>
                  <h1 className="title is-4">{`Category name: ${currentProjest.category.name || '--'}`}</h1>
                  <h1 className="title is-4">{`Category code: ${currentProjest.category.code || '--'}`}</h1>
                  <h1 className="title is-4">{`Type: ${currentProjest.category.type || '--'}`}</h1>
                  <h1 className="title is-4">{`Start Date: ${currentProjest.startDate || '--'}`}</h1>
                  <h1 className="title is-4">{`End Date: ${currentProjest.endDate || '--'}`}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withAuthorization(authCondition)(HomePage);
