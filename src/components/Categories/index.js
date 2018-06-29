import React from 'react';

import withAuthorization from '../withAuthorization';
import CreateCategoryForm from './CreateCategoryForm';

import styles from './styles.css';

const authCondition = (authUser) => !!authUser;

const CategoriesPage = ({ history, location }) =>
  <div className={styles.wrapper}>
    <div className="container">
      <div className="columns">
        <div className="column is-two-thirds">
          <h1 className="title is-3">Categories Table</h1>
        </div>
        <div className="column">
          <CreateCategoryForm history={history} location={location} />
      </div>
      </div>
    </div>
  </div>

export default withAuthorization(authCondition)(CategoriesPage);
