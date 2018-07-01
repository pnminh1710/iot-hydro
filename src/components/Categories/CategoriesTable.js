import React, { Component } from 'react';
import { database } from '../../firebase';
class CategoriesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesList: [],
      loading: true,
    };
    this.setDataTable = this.setDataTable.bind(this);
  }

  componentDidMount() {
    this.setDataTable();
  }
  setDataTable() {
    database.getAllCategories()
    .then(snapshot => {
      this.setState({ categoriesList: snapshot.val(), loading: false });
    });
  }
  render() {
    const { categoriesList, loading } = this.state;
    if (loading) return <h1 className="title is-4">Loading</h1>
    return (
      <div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map(element => {
            return (
              <tr key={element.id}>
                <th>{element.id}</th>
                <th>{element.name}</th>
                <th>{element.type}</th>
                <th>{element.code}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="button is-primary" onClick={this.setDataTable}>Refresh</button>
      </div>
    );
  }
}

export default CategoriesTable;