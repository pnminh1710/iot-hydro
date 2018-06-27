import React, { Component } from 'react';

import GetStarted from './GetStarted';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
    }
    this.changeStep = this.changeStep.bind(this);
  }

  changeStep() {
    if (this.state.step === 4) {
      this.setState({ step: 1 });
      return;
    }
    this.setState({ step: this.state.step + 1 });
  }

  render() {
    const { step } = this.state;
    return (
      <div className="container">
        <div class="tabs is-medium">
          <ul>
            <li className={step === 1 ? 'is-active' : ''}><a>Pictures</a></li>
            <li className={step === 2 ? 'is-active' : ''}><a>Music</a></li>
            <li className={step === 3 ? 'is-active' : ''}><a>Videos</a></li>
            <li className={step === 4 ? 'is-active' : ''}><a>Documents</a></li>
          </ul>
        </div>
        {step === 1 && (<GetStarted />)}
        <button className="button is-primary" onClick={this.changeStep}>Move to next step</button>
      </div>
    );
  }
}

export default Settings;