import React from 'react';
import { withRouter } from 'react-router-dom';

import { database } from '../../firebase';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
    };
  }
  
  componentDidMount() {
    const queryId = this.props.location.pathname.slice(10);
    database.getCategory(queryId)
      .then((snapshot) => {
        this.setState({ category: snapshot.val() });
      });
  }
  render() {
    const { category } = this.state;
    return (
      <div>
        Category Page
        {category.code}
        {category.name}
        {category.type}
      </div>
    )
  }
}


export default withRouter(Category);
