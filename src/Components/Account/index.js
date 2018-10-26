import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import SubAccount from '../SubAccount';

class Account extends Component {
    componentWillMount() {
        this.setState({ isOpened: true })
    }

    handleCollapseClicked() {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    render() {
        const account = this.props.account
        const isLast = this.props.isLast
        return (
            <div className={"account-details" + (isLast ? '' : ' last-account-detail')}>
                <div className="account-details-header">
                    <div className="account-details-components">
                        <div
                            className={"account-details-description account-description-label" +
                                (account.subacc ?
                                    ' account-details-with-collapse' :
                                    '')}
                        >
                            {
                                account.subacc &&
                                <div
                                    className="details-collapse-btn"
                                    onClick={this.handleCollapseClicked.bind(this)}>
                                    {
                                        this.state.isOpened &&
                                        <FontAwesomeIcon icon={faCaretUp} style={{ pointerEvents: 'none', color: '#677592' }} />
                                    }
                                    {
                                        !this.state.isOpened &&
                                        <FontAwesomeIcon icon={faCaretDown} style={{ pointerEvents: 'none', color: '#677592' }} />
                                    }
                                </div>
                            }
                            {account.description}
                        </div>
                        <div className="account-details-component-item account-item-label" >
                            {account.type.name}
                        </div>
                        <div className="account-details-component-item account-item-label" >
                            {account.subtype.name}
                        </div>
                        <div className="account-details-component-id account-item-label">
                            {account.id}
                        </div>
                        <div className="account-details-component-btn account-btn-label">
                            Add a Transaction
                        </div>
                    </div>
                </div>
                {
                    account.subacc &&
                    <Collapse isOpened={this.state.isOpened} forceInitialAnimation >
                        {
                            account.subacc.map((subAcc, is) => (
                                <SubAccount key={is} account={subAcc} />
                            ))
                        }
                    </Collapse>
                }
            </div>
        );
    }
}

export default Account;
