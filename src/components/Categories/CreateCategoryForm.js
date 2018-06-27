import React, { Component } from 'react';
import { database } from '../../firebase';
import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  id: '',
  name: '',
  code: '',
  type: '',
  startDate: new Date(),
  endDate: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateCategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      id,
      name,
      code,
      type,
      startDate,
      endDate,
    } = this.state;

    const data = {
      name,
      code,
      type,
      startDate,
      endDate,
    };

    const {
      history,
    } = this.props;

    database.doCreateCategory(id, data)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.CATEGORIES);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      id,
      name,
      code,
      type,
      startDate,
      endDate,
      error,
    } = this.state;
    const isInvalid =
      id === '' ||
      name === '' ||
      code === '' ||
      type === '';
    return (
      <div className="container">
      <div className="columns">
        <div className="column is-two-thirds">
          <h1 className="title is-3">Categories Table</h1>
        </div>
        <div className="column">
          <form onSubmit={this.onSubmit}>
          <h1 className="title is-3">Create Table</h1>
            <div className="field">
              <label className="label">ID</label>
              <div className="control">
                <input
                  className="input"
                  value={id}
                  onChange={event => this.setState(byPropKey('id', event.target.value))}
                  type="text"
                  placeholder="ID"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  value={name}
                  onChange={event => this.setState(byPropKey('name', event.target.value))}
                  type="text"
                  placeholder="Categories Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Code</label>
              <div className="control">
                <input
                  className="input"
                  value={code}
                  onChange={event => this.setState(byPropKey('code', event.target.value))}
                  type="text"
                  placeholder="Categories Code"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Type</label>
              <div className="control">
                <input
                  className="input"
                  value={type}
                  onChange={event => this.setState(byPropKey('type', event.target.value))}
                  type="text"
                  placeholder="Categories Type"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Start Day</label>
              <div className="control">
                <input
                  className="input"
                  value={startDate}
                  onChange={event => this.setState(byPropKey('startDate', event.target.value))}
                  type="date"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">End Day</label>
              <div className="control">
                <input
                  className="input"
                  value={endDate}
                  onChange={event => this.setState(byPropKey('endDate', event.target.value))}
                  type="date"
                />
              </div>
            </div>
            <button className="button is-primary" disabled={isInvalid} type="submit">
              Add New Category
            </button>
            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default CreateCategoryForm;
