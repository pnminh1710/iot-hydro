import React from 'react';

import ProductsTable from './ProductsTable';
import ProductsDetails from './ProductsDetails';

const View = ({ location }) => {
  if (location.pathname === '/products') return (<ProductsTable />);
  return (<ProductsDetails pathname={location.pathname} />);
}

export default View;
