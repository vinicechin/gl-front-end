import React, { Component } from 'react';

import Login from '../Login';
import ChartOfAccounts from '../ChartOfAccounts';

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() && (
            <ChartOfAccounts {...this.props} />
          )
        }
        {
          !isAuthenticated() && (
            <Login {...this.props} />
          )
        }
      </div>
    );
  }
}

export default Home;
