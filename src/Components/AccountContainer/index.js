import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import Account from '../Account'

class AccountContainer extends Component {
    componentWillMount() {
        this.setState({ isOpened: true })
    }

    handleCollapseClicked() {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    render() {
        const dataArray = this.props.dataArray
        return (
            <div
                className="accounts-container"
                style={this.state.isOpened ? {} : { paddingBottom: '9.5px' }}
            >
                <div className="accounts-container-header">
                    <div
                        className="container-collapse-btn"
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
                    <div className="accounts-classification-title">
                        {this.props.name}
                    </div>
                </div>
                {
                    dataArray &&
                    <div className="accounts-content-container">
                        <Collapse
                            isOpened={this.state.isOpened}
                            hasNestedCollapse={true}
                        >
                            <div className="accounts-details-container">
                                {
                                    dataArray.map((e, i) => (
                                        <Account key={i} account={e} isLast={i === dataArray.length - 1} />
                                    ))
                                }
                            </div>
                        </Collapse>
                    </div>
                }
            </div>
        );
    }
}

export default AccountContainer;
