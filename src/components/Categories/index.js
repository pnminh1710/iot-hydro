import React from 'react';

import withAuthorization from '../withAuthorization';
import CreateCategoryForm from './CreateCategoryForm';

const authCondition = (authUser) => !!authUser;

const CategoriesPage = ({ history, location }) =>
  <div>
    This is Categories create Page
    <p>
      Hello {location.pathname}
    </p>
    <CreateCategoryForm history={history} location={location} />
  </div>

export default withAuthorization(authCondition)(CategoriesPage);
