import React from 'react';

import withAuthorization from '../withAuthorization';
import CreateCategoryForm from './CreateCategoryForm';

import styles from './styles.css';

const authCondition = (authUser) => !!authUser;

const CategoriesPage = ({ history, location }) =>
  <div className={styles.wrapper}>
    <CreateCategoryForm history={history} location={location} />
  </div>

export default withAuthorization(authCondition)(CategoriesPage);
