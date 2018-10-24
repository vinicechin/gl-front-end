import React, { Component } from 'react';
import { API_URL } from './../constants';
import axios from 'axios';

class Home extends Component {
  componentWillMount() {
    this.setState({ message: '' });
  }

  componentDidMount() {
    this.securedPing()
    if (this.props.auth.isAuthenticated()) {
      document.body.style.backgroundImage = "url('./images/mock_back2.png')"
    } else {
      document.body.style.backgroundImage = "url('./images/mock_background.png')"
    }
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

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() && (
            // <div />
            <div className="brokerage-logout-icon" onClick={this.logout.bind(this)}></div>
          )
        }
        {
          !isAuthenticated() && (
            <div className="login-container">
              <div className="login-tittle">General Ledger</div>
              <div className="login-info">A smarter and more flexible way of understanding data to generate insights for better decision making.</div>
              {/* <div className="brokerage-login-icon" onClick={this.login.bind(this)}></div> */}
              <div className="brokerage-login-btn" onClick={this.login.bind(this)}>Login</div>
            </div>
          )
        }
      </div>
    );
  }
}

export default Home;
