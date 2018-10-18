import React, { Component } from 'react';
import { API_URL } from './../constants';
import axios from 'axios';

class Home extends Component {
  componentWillMount() {
    this.setState({ message: '' });
  }

  componentDidMount() {
    this.securedPing()
  }

  securedPing() {
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
    axios.get(`${API_URL}/resources`, { headers })
      .then(response =>
        this.setState({ message: response.data.message })
      )
      .catch(error => {
        this.setState({ message: error.message })
      });
  }

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { message } = this.state;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div>
              <h4>
                You are logged in!
              </h4>
              <br />
              <h2>
                Back-end Message:
              </h2>
              <h4>
                {message}
              </h4>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <div>
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                  </a>
                {' '}to continue.
              </h4>
              <br />
              <h2>
                Back-end Message:
              </h2>
              <h4>
                {message}
              </h4>
            </div>
          )
        }
      </div>
    );
  }
}

export default Home;
