import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './utils/history';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { pathname } = this.props.location;
    const hasToRedirect = pathname === '/'

    return (
      <div>
        {
          !isAuthenticated() && (
            <Navbar fluid>
              <Navbar.Header>
                <div className="brokerage-engine-icon pull-left"></div>
              </Navbar.Header>
            </Navbar>
          )
        }
        {
          hasToRedirect &&
          (
            < Redirect
              to={{
                pathname: '/home',
              }}
            />
          )
        }
      </div>
    );
  }
}

export default App;
