import React, { Component } from 'react';
import { database } from '../../firebase';
import { db } from '../../firebase/firebase';
import { normalizeDate, createArrayDate } from '../../constants/util';
import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  id: '',
  category: '',
  categoriesList: [],
  name: '',
  startDate: normalizeDate(new Date()),
  endDate: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class GetStarted extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
    this.getProjectIndex = this.getProjectIndex.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  componentDidMount() {
    db.ref('projectsIndex').once('value', snapshot => {
      this.getProjectIndex(snapshot.val());
    });
    database.getAllCategories()
      .then(snapshot => {
        this.getCategories(snapshot.val());
      });
  };

  getProjectIndex(id) {
    this.setState({ id });
  };

  getCategories(categoriesList) {
    this.setState({
      categoriesList,
      category: categoriesList[1],
    });
  }

  changeCategory(event) {
    const { categoriesList } = this.state;
    this.setState({ category: categoriesList[event.target.selectedIndex + 1] });
  }

  onSubmit = (event) => {
    const {
      id,
      category,
      name,
      startDate,
      endDate,
    } = this.state;
    const arrayDate = createArrayDate(startDate, endDate);

    const data = {
      category,
      name,
      startDate,
      endDate,
    };

    const {
      history,
    } = this.props;

    database.doCreateProject(id, data)
      .then(() => {
        db.ref('currentProject').set({
          ...data,
          arrayDate,
        });
        db.ref('projectsIndex').set(id + 1);
        this.setState(() => ({
          id: id + 1,
          name: '',
          code: '',
          type: '',
          error: null,
        }));
        this.props.changeStep();
        history.push(routes.CATEGORIES);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      category,
      name,
      startDate,
      endDate,
      error,
      categoriesList,
    } = this.state;
    const isInvalid =
      name === '' ||
      category === '' ||
      startDate === '' ||
      endDate === '';
    return (
      <div className="container settings-wrapper">
        <div className="columns is-mobile is-centered">
          <div className="column is-half is-narrow">
            <h1 className="title is-3">Get Start</h1>
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    value={name}
                    onChange={event => this.setState(byPropKey('name', event.target.value))}
                    type="text"
                    placeholder="Project Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <div className="select">
                    <select value={category.name} onChange={this.changeCategory}>
                      {categoriesList.map(category => {
                        return (<option key={category.id} >{category.name}</option>)
                      })}
                    </select>
                  </div>
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
                <label className="label">End day</label>
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
                Start New Project
            </button>
              {error && <p>{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default GetStarted;
