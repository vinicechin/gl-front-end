import React, { Component } from 'react';

class Login extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = "url('./images/mock_background.png')"
    }

    login() {
        this.props.auth.login();
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-tittle">General Ledger</div>
                <div className="login-info">A smarter and more flexible way of understanding data to generate insights for better decision making.</div>
                <div className="brokerage-login-btn" onClick={this.login.bind(this)}>Login</div>
            </div>
        );
    }
}

export default Login;
