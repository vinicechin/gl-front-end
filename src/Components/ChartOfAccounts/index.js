import React, { Component } from 'react';
import { API_URL } from '../../Utils/constants';
import axios from 'axios';

class ChartOfAccounts extends Component {
    componentDidMount() {
        this.callApi()
        document.body.style.backgroundImage = "url('./images/mock_back2.png')"
    }

    callApi() {
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

    logout() {
        this.props.auth.logout();
    }

    render() {
        return (
            // <div />
            <div className="brokerage-logout-icon" onClick={this.logout.bind(this)}></div>
        );
    }
}

export default ChartOfAccounts;
