import React, { Component } from 'react';
import { database } from '../../firebase';

import './styles.css';
class ProductsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        id: '...',
        name: '....',
        code: '.....',
        type: '......',
        manufacturingDate: '.......',
        expiryDate: '........'
      },
    };
  }

  componentDidMount() {
    const url = this.props.pathname.slice(1);
    database.getProducts(url)
      .then((snapshot) => {
        const details = snapshot.val() || {};
        this.setState({ details });
      })
  }
  render() {
    const { details } = this.state;
    return (
      <div className="container">
      <div className="columns is-centered">
      <div className="product-wrapper column is-6">
        <h1 className="title is-3">Product Detail</h1>
        <h1 className="title is-4">{`ID: ${details.id}`}</h1>
        <h1 className="title is-4">{`Name: ${details.name}`}</h1>
        <h1 className="title is-4">{`Code: ${details.code}`}</h1>
        <h1 className="title is-4">{`Type: ${details.type}`}</h1>
        <h1 className="title is-4">{`Manufacturing Date: ${details.manufacturingDate}`}</h1>
        <h1 className="title is-4">{`Expiry Date: ${details.expiryDate}`}</h1>
      </div>
      </div>
      </div>
    );
  }
}

export default ProductsDetails;