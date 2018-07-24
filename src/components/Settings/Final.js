import React, { Component } from 'react';
import { database } from '../../firebase';
import { db } from '../../firebase/firebase';
import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  totalProducts: 0,
  manufacturingDate: '',
  expiryDate: 0,
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Final extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
    this.setManufacturingDate = this.setManufacturingDate.bind(this);
  }

  componentDidMount() {
    db.ref('currentProject/endDate').once('value', snapshot => {
      this.setManufacturingDate(snapshot.val());
    })
  };

  setManufacturingDate(manufacturingDate) {
    this.setState({ manufacturingDate });
  }

  createProductList(currentProject, data) {
    const { totalProducts, manufacturingDate, expiryDate } = data;
    const { name, type, code, id } = currentProject.category;
    const defaultCode = `${id}-${code}`;
    database.doCreateProductsList({ name, type, defaultCode, totalProducts, manufacturingDate, expiryDate });
  }

  onSubmit = (event) => {
    const {
      totalProducts,
      manufacturingDate,
      expiryDate,
    } = this.state;

    const data = {
      totalProducts,
      manufacturingDate,
      expiryDate,
    };

    const {
      history,
    } = this.props;

    database.getCurrentProject()
      .then((snapshot) => {
        this.setState({
          ...INITIAL_STATE,
        });
        this.createProductList(snapshot.val(), data);
        database.setTotalProducts(data.totalProducts)
          .then(() => {
            this.props.changeStep();
          })
        history.push(routes.CATEGORIES);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      totalProducts,
      manufacturingDate,
      expiryDate,
      error,
    } = this.state;
    const isInvalid =
    totalProducts === '' ||
    manufacturingDate === '' ||
    expiryDate === '';
    return (
      <div className="container settings-wrapper">
        <div className="columns is-mobile is-centered">
          <div className="column is-half is-narrow">
            <h1 className="title is-3">Finished Project</h1>
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <label className="label">Number of Product</label>
                <div className="control">
                  <input
                    className="input"
                    value={totalProducts}
                    onChange={event => this.setState(byPropKey('totalProducts', event.target.value))}
                    type="text"
                    placeholder="Total Products"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Manufacturing Date</label>
                <div className="control">
                  <input
                    className="input"
                    value={manufacturingDate}
                    onChange={event => this.setState(byPropKey('manufacturingDate', event.target.value))}
                    type="date"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Expiry Date</label>
                <div className="control">
                  <input
                    className="input"
                    value={expiryDate}
                    onChange={event => this.setState(byPropKey('expiryDate', event.target.value))}
                    type="text"
                  />
                </div>
              </div>
              <button className="button is-primary" disabled={isInvalid} type="submit">
                Make Product
            </button>
              {error && <p>{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Final;
