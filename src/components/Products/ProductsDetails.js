import React, { Component } from 'react';
import { database } from '../../firebase';
import { db } from '../../firebase/firebase';
import { createArrayDate } from '../../constants/util';

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
      waterLog: [],
    };

    this.createLog = this.createLog.bind(this);
    this.createArray = this.createArray.bind(this);
  }

  componentDidMount() {
    const url = this.props.pathname.slice(1);
    database.getProducts(url)
      .then((snapshot) => {
        const details = snapshot.val() || {};
        this.setState({ details });
      });
      const arr = createArrayDate('2018-06-08', '2018-07-08').data;
      this.createArray(arr);
  }

  createArray(arr) {
    this.setState({ waterLog: arr });
  }

  createLog() {
    const arr = createArrayDate('2018-06-08', '2018-07-08');
    arr.data.forEach(day => {
      db.ref(`waterLog/${day}`).set(1);
    })
  }
  render() {
    const { details, waterLog } = this.state;
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
        <h1 className="title is-3">Water History</h1>
        <div className="columns is-multiline is-0">
            {waterLog.map((log, index) => (
              <div className="column is-2">
              <button key={index} className={`button ${(index % 2) === 0 ? 'is-primary' : 'is-danger'}`}>{log}</button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ProductsDetails;