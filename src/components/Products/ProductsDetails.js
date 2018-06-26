import React, { Component } from 'react';
import { database } from '../../firebase';


class ProductsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    const url = this.props.pathname.slice(1);
    database.getProducts(url)
      .then((snapshot) => {
        this.setState({ details: snapshot.val() });
      })
  }
  render() {
    const { details } = this.state;
    return (
      <div>
        <h1>{details.id}</h1>
        <h1>{details.name}</h1>
        <h1>{details.code}</h1>
        <h1>{details.type}</h1>
        <h1>{details.weight}</h1>
        <h1>{details.manufacturingDate}</h1>
        <h1>{details.expiryDate}</h1>
      </div>
    );
  }
}

export default ProductsDetails;