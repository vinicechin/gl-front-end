import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

import './App.css';

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

    return (
      <div className="app-container">
        {
          !isAuthenticated() && (
            <Navbar fluid>
              <Navbar.Header>
                <div className="brokerage-engine-icon pull-left"></div>
              </Navbar.Header>
            </Navbar>
          )
        }
        < Redirect
          to={{
            pathname: '/home',
          }}
        />
      </div>
    );
  }
}

export default App;
