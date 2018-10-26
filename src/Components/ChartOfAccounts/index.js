import React, { Component } from 'react';
import { API_URL } from '../../utils/constants';
import axios from 'axios';

import AccountContainer from '../AccountContainer';

const data = [
    {
        id: 0,
        description: "acc_0",
        type: {
            name: "Fixed Assets",
            classification: "Assets"
        },
        subtype: {
            name: "Vehicles"
        },
        parent: null
    },
    {
        id: 1,
        description: "acc_1",
        type: {
            name: "Fixed Assets",
            classification: "Assets"
        },
        subtype: {
            name: "Inventory"
        },
        parent: null
    },
    {
        id: 2,
        description: "acc_3",
        type: {
            name: "Expense",
            classification: "Expense"
        },
        subtype: {
            name: "Primary"
        },
        parent: null
    },
    {
        id: 3,
        description: "acc_4",
        type: {
            name: "Expense",
            classification: "Expense"
        },
        subtype: {
            name: "Other Primary"
        },
        parent: {
            id: 2,
            name: "acc_3",
            type: {
                name: "Expense",
                classification: "Expense"
            },
            subtype: {
                name: "Primary"
            },
            parent: null
        }
    },
    {
        id: 4,
        description: "acc_5",
        type: {
            name: "Expense",
            classification: "Expense"
        },
        subtype: {
            name: "Other Primary"
        },
        parent: {
            id: 3,
            name: "acc_4",
            type: {
                name: "Expense",
                classification: "Expense"
            },
            subtype: {
                name: "Primary"
            },
            parent: null
        }
    }
]
class ChartOfAccounts extends Component {
    componentWillMount() {
        this.setState({
            message: '',
            data: {
                assets: [],
                liabilities: [],
                income: [],
                expenses: [],
                retained: []
            },
            accountsArray: []
        })
    }

    componentDidMount() {
        this.callApi()
        document.body.style.backgroundImage = null
    }

    callApi() {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        axios.get(`${API_URL}/resources`, { headers })
            .then(response => {
                this.setState({ message: response.data.message })

                this.setData(data)
            })
            .catch(error => {
                this.setState({ message: error.message })

                this.setData(data)
            });
    }

    setData(response) {
        var newData = { ...this.state.data }
        this.setState({ accountsArray: response })

        if (response.length > 0) {
            response.forEach((account, i) => {
                var classification = this.getClassification(account)
                this.addAccount(newData, account, classification)
            })
        }
    }

    getClassification(account) {
        return account.type.classification
    }

    addAccount(newData, account, classification) {
        var dataArray
        switch (classification) {
            case 'Assets':
                dataArray = newData.assets
                break;
            case 'Liabilities':
                dataArray = newData.liabilities
                break;
            case 'Income':
                dataArray = newData.income
                break;
            case 'Expense':
                dataArray = newData.expenses
                break;
            case 'Retained':
                dataArray = newData.retained
                break;
            default:
                dataArray = []
                break;
        }
        if (!dataArray.find(acc => acc.id === account.id)) {
            if (!account.parent) {
                dataArray.push(account)
            } else {
                var parent = this.searchTree(account.parent.id, dataArray)
                if (parent) {
                    if (!parent.subacc) {
                        parent.subacc = [account]
                    } else {
                        parent.subacc.push(account)
                    }
                }
            }
        }
        // console.log(this.state)
        this.setState({ data: newData })
    }

    searchTree(matchingId, dataArray) {
        var output = null
        dataArray.forEach((acc) => {
            if (acc.id === matchingId) {
                output = acc;
            } else if (acc.subacc) {
                output = this.searchTree(matchingId, acc.subacc);
            }
        })
        return output;
    }

    render() {
        const data = this.state.data
        return (
            <div>
                <div className="accounts-title-container">
                    <div className="accounts-title">Chart of Accounts</div>
                    <div className="accounts-btn-container">
                        <div className="account-btn account-edit-btn">Edit Account</div>
                        <div className="account-btn account-create-btn">Create Account</div>
                    </div>
                </div>
                <div className="accounts-table-header">
                    <div className="accounts-table-header-item">NAME</div>
                    <div className="accounts-table-header-item">TYPE</div>
                    <div className="accounts-table-header-item">SUBTYPE</div>
                    <div className="accounts-table-header-item">REFERENCE ID</div>
                    <div className="accounts-table-header-empty"></div>
                </div>
                <hr className="accounts-table-header-separator" />
                <AccountContainer dataArray={data.assets} name={'ASSETS'} />
                <AccountContainer dataArray={data.liabilities} name={'LIABILITIES'} />
                <AccountContainer dataArray={data.income} name={'INCOME'} />
                <AccountContainer dataArray={data.expenses} name={'EXPENSE'} />
                <AccountContainer dataArray={data.retained} name={'RETAINED EARNINGS'} />
            </div>
        );
    }
}

export default ChartOfAccounts;
