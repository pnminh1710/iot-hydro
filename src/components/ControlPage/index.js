import React, { Component } from 'react';

import withAuthorization from '../withAuthorization';

const authCondition = (authUser) => !!authUser;

class ControlPage extends Component {
  render() {
    return (
      <div>
        This is main control page for IoT
      </div>
    );
  }
}

export default withAuthorization(authCondition)(ControlPage);
