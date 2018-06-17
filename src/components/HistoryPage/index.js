import React, { Component } from 'react';

import withAuthorization from '../withAuthorization';

const authCondition = (authUser) => !!authUser;

class HistoryPage extends Component {
  render() {
    return (
      <div>
        This is History Page for view History of Data
      </div>
    );
  }
}

export default withAuthorization(authCondition)(HistoryPage);
