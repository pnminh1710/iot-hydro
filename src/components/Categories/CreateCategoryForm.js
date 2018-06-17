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

  componentDidMount() {
    console.log(this.props);
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
      id === ''  ||
      name === '' ||
      code === '' ||
      type === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={id}
          onChange={event => this.setState(byPropKey('id', event.target.value))}
          type="text"
          placeholder="ID"
        />
        <input
          value={name}
          onChange={event => this.setState(byPropKey('name', event.target.value))}
          type="text"
          placeholder="Categories Name"
        />
        <input
          value={code}
          onChange={event => this.setState(byPropKey('code', event.target.value))}
          type="text"
          placeholder="Categories Code"
        />
        <input
          value={type}
          onChange={event => this.setState(byPropKey('type', event.target.value))}
          type="text"
          placeholder="Categories Type"
        />
        <input
          value={startDate}
          onChange={event => this.setState(byPropKey('startDate', event.target.value))}
          type="date"
        />
        <input
          value={endDate}
          onChange={event => this.setState(byPropKey('endDate', event.target.value))}
          type="date"
        />
        <button disabled={isInvalid} type="submit">
          Add New
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default CreateCategoryForm;
