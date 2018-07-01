import React from 'react';

import withAuthorization from '../withAuthorization';
import CreateCategoryForm from './CreateCategoryForm';
import CategoriesTable from './CategoriesTable';

import styles from './styles.css';

const authCondition = (authUser) => !!authUser;

const CategoriesPage = ({ history, location }) =>
  <div className={styles.wrapper}>
    <div className="container">
      <div className="columns">
        <div className="column is-two-thirds">
          <h1 className="title is-3">Categories Table</h1>
          <CategoriesTable />
        </div>
        <div className="column">
          <h1 className="title is-3">Create Category</h1>
          <CreateCategoryForm history={history} location={location} />
        </div>
      </div>
    </div>
  </div>

export default withAuthorization(authCondition)(CategoriesPage);
