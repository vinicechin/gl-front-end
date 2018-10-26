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
        return (
            <div className="accounts-container">
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
                <Collapse isOpened={this.state.isOpened}>
                    <div className="accounts-details-container">
                        {
                            this.props.dataArray && this.props.dataArray.map((e, i) => (
                                <Account key={i} account={e} isLast={i === this.props.dataArray.length - 1} />
                            ))
                        }
                        {
                            !this.props.dataArray && (
                                <div>Error loading data</div>
                            )
                        }
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default AccountContainer;
