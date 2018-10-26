import React, { Component } from 'react';

class SubAccount extends Component {
    render() {
        const account = this.props.account
        const tabIndex = this.props.tabIndex || 0
        return (
            <div className="sub-account-details">
                <div className="sub-account-details-components">
                    <div
                        className="sub-account-details-component-item sub-account-description-label"
                        style={{ paddingLeft: 20 + (tabIndex + 1) * 20 }}
                    >
                        {account.description}
                    </div>
                    <div
                        className="sub-account-details-component-item sub-account-item-label"
                    >
                        {account.type.name}
                    </div>
                    <div
                        className="sub-account-details-component-item sub-account-item-label"
                    >
                        {account.subtype.name}
                    </div>
                    <div className="sub-account-details-component-id sub-account-item-label">
                        {account.id}
                    </div>
                    <div className="sub-account-details-component-btn sub-account-btn-label">
                        Add a Transaction
                    </div>
                </div>
                {
                    account.subacc && account.subacc.map((subAcc, is) => (
                        <SubAccount key={is} account={subAcc} tabIndex={tabIndex + 1} />
                    ))
                }
                {
                    !account.subacc && (
                        <div></div>
                    )
                }
            </div>
        );
    }
}

export default SubAccount;
