export default [
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
