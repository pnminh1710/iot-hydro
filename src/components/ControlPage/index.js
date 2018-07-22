import React, { Component } from 'react';
import withAuthorization from '../withAuthorization';
import { db } from '../../firebase/firebase';

import './style.css';


const authCondition = (authUser) => !!authUser;
class ControlPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isManual: false,
      loading: true,
      status: {
        pump1: 0,
        pump2: 0,
        light: 0,
        fan: 0,
      }
    };

    this.gotoManual = this.gotoManual.bind(this);
    this.gotoAutomation = this.gotoAutomation.bind(this);

  }

  componentDidMount() {
    db.ref('isManual').once('value')
      .then((snapshot) => {
        this.setMode(snapshot.val());
      });
    db.ref('motor').once('value')
      .then(snapshot => {
        this.setStatus(snapshot.val());
      })
  };

  setMode(isManual) {
    this.setState({
      isManual,
      loading: false,
    });
  };

  setStatus(status) {
    this.setState({ status })
  }

  gotoManual() {
    db.ref('isManual').set(1);
    this.setState({ isManual: true });
  };

  gotoAutomation() {
    db.ref('isManual').set(0);
    this.setState({ isManual: false });
  };

  changeStatus(event) {
    const [name, data] = event.target.id.split('-');
    const value = data === 'on' ? 1 : 0;
    this.setState({
      status: {
        ...this.state.status,
        [name]: value,
      }
    });
    db.ref(`motor/${name}`).set(value);
  }

  render() {
    const { loading, isManual, status } = this.state;
    return (
      <div className="container has-text-centered	">
        {loading ? <h1 className="title is-3 control-header">Loading</h1> : <div>
          <h1 className="title is-3 control-header">Current State: {isManual ? 'Manual Mode' : 'Automation Mode'}</h1>
            <div className="columns is-mobile">
              <div className="column is-6">
                <a className="button button-control" onClick={this.gotoManual}>Manual Mode</a>
              </div>
              <div className="column is-6">
                <a className="button button-control" onClick={this.gotoAutomation}><p>Automation Mode</p></a>
              </div>
            </div>
            <div className="wrapper">
            <div className="columns is-mobile">
              <div className="column">
                <p className="motor-name">Pump Number One: </p>
              </div>
              <div className="buttons has-addons column">
                <span disabled={!isManual} id="pump1-on" onClick={event => this.changeStatus(event)} className={`button  ${status.pump1 ? 'is-selected is-success' : ''}`} >ON</span>
                <span disabled={!isManual} id="pump1-off" onClick={event => this.changeStatus(event)} className={`button  ${!status.pump1 ? 'is-selected is-danger' : ''}`}>OFF</span>
              </div>
            </div>
            <div className="columns is-mobile is-centered">
              <div className="column">
                <p className="motor-name">Pump Number Two: </p>
              </div>
              <div className="buttons has-addons column">
                <span disabled={!isManual} id="pump2-on" onClick={event => this.changeStatus(event)} className={`button  ${status.pump2 ? 'is-selected is-success' : ''}`} >ON</span>
                <span disabled={!isManual} id="pump2-off" onClick={event => this.changeStatus(event)} className={`button  ${!status.pump2 ? 'is-selected is-danger' : ''}`}>OFF</span>
              </div>
            </div>
            <div className="columns is-mobile is-centered">
              <div className="column">
                <p className="motor-name">Light: </p>
              </div>
              <div className="buttons has-addons column">
                <span disabled={!isManual} id="light-on" onClick={event => this.changeStatus(event)} className={`button  ${status.light ? 'is-selected is-success' : ''}`} >ON</span>
                <span disabled={!isManual} id="light-off" onClick={event => this.changeStatus(event)} className={`button  ${!status.light ? 'is-selected is-danger' : ''}`}>OFF</span>
              </div>
            </div>
            <div className="columns is-mobile is-centered">
              <div className="column">
                <p className="motor-name">Fan: </p>
              </div>
              <div className="buttons has-addons column">
                <span disabled={!isManual} id="fan-on" onClick={event => this.changeStatus(event)} className={`button  ${status.fan ? 'is-selected is-success' : ''}`} >ON</span>
                <span disabled={!isManual} id="fan-off" onClick={event => this.changeStatus(event)} className={`button  ${!status.fan ? 'is-selected is-danger' : ''}`}>OFF</span>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default withAuthorization(authCondition)(ControlPage);
