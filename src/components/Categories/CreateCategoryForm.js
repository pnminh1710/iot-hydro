import React, { Component } from 'react';
import { database } from '../../firebase';
import { db } from '../../firebase/firebase';
import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  id: '',
  name: '',
  code: '',
  type: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateCategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.setCurrentIndex = this.setCurrentIndex.bind(this);
  }

  componentDidMount() {
    db.ref('categoriesIndex').once('value', snapshot => {
      this.setCurrentIndex(snapshot.val());
    });
  }

  setCurrentIndex(index) {
    this.setState({
      id: index,
    });
  }

  onSubmit = (event) => {
    const {
      id,
      name,
      code,
      type,
    } = this.state;

    const data = {
      name,
      code,
      type,
    };

    const {
      history,
    } = this.props;

    database.doCreateCategory(id, data)
      .then(() => {
        db.ref('categoriesIndex').set(id + 1);
        this.setState(() => ({
          id: id + 1,
          name: '',
          code: '',
          type: '',
          error: null,
        }));
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
      error,
    } = this.state;
    const isInvalid =
      name === '' ||
      code === '' ||
      type === '';
    return (
          <form onSubmit={this.onSubmit}>
          <div className="field">
              <label className="label">ID</label>
              <div className="control">
                <input
                  className="input"
                  value={id}
                  onChange={event => this.setState(byPropKey('id', event.target.value))}
                  type="text"
                  placeholder="Categories Name"
                  disabled
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
            <button className="button is-primary" disabled={isInvalid} type="submit">
              Add New Category
            </button>
            {error && <p>{error.message}</p>}
          </form>
    );
  }
}

export default CreateCategoryForm;
