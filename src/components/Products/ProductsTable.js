import React, { Component } from 'react';
import { database } from '../../firebase';

const createDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`
}

class ProductsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      productsList: [],
    };
  };

  componentDidMount() {
    if (this.state.loading === true) {
    database.getAllProducts()
      .then((snapshot) => {
        let productsList = snapshot.val();
        productsList.forEach(element => {
          element.manufacturingDate = createDate(element.manufacturingDate);
        });
        this.setState({
          productsList,
          loading: false,
        })
      });
    }
  };

  render() {
    const { productsList } = this.state;
    return (
      <div className="container">
      <div className="columns">
        <div className="column">
        <h1 className="title is-3">Products Table</h1>
        <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Code</th>
                <th>Weight</th>
                <th>Manufacturing Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {productsList.map(element => {
                return (
                  <tr key={element.id}>
                    <th>{element.id}</th>
                    <th>{element.name}</th>
                    <th>{element.type}</th>
                    <th>{element.code}</th>
                    <th>{element.weight}</th>
                    <th>{element.manufacturingDate}</th>
                    <th>{element.expiryDate}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  }
}

export default ProductsTable;