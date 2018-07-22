import React, { Component } from 'react';
import { database } from '../../firebase';
import withAuthorization from '../withAuthorization';

import GetStarted from './GetStarted';
import AutomationConfig from './AutomationConfig';
import Final from './Final';
import ExportQR from './ExportQR';

const authCondition = (authUser) => !!authUser;

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: null,
    }
    this.changeStep = this.changeStep.bind(this);
    this.setStep = this.setStep.bind(this);
  }

  componentDidMount() {
    database.getStep()
      .then(snapshot => {
        this.setStep(snapshot.val());
      });
  }

  setStep(step) {
    this.setState({
      step,
    });
  }

  changeStep() {
    if (this.state.step === 4) {
      database.setStep(1);
      this.setState({ step: 1 });
      return;
    }
    this.setState({ step: this.state.step + 1 });
    database.setStep(this.state.step);
  }

  render() {
    const { step } = this.state;
    return (
      <div className="container">
        {!step && (<div>
          <h1 className="title is-3">Loading</h1>
        </div>)}
        {step === 1 && (<GetStarted changeStep={this.changeStep} />)}
        {step === 2 && (<AutomationConfig changeStep={this.changeStep} />)}
        {step === 3 && (<Final changeStep={this.changeStep} />)}
        {step === 4 && (<ExportQR changeStep={this.changeStep} />)}
      </div>
    );
  }
}

export default withAuthorization(authCondition)(Settings);