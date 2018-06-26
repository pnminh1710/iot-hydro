import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import View from './View';

class Products extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View {...this.props} />
        );
    }
}

export default withRouter(Products);