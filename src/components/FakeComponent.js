import React from 'react';

import withAuthorization from './withAuthorization';

const authCondition = (authUser) => !!authUser;

const FakeComponent = ({ location }) =>
  <div>
    This is {location.pathname}
  </div>

export default withAuthorization(authCondition)(FakeComponent);
