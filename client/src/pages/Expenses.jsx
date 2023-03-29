import React, { useReducer, useState } from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@mui/material'
import '../styles/expenses.css'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        expenses: [...state.expenses, action.payload],
        totalAmountSpent:
          state.totalAmountSpent + Number(action.payload.amount),
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function Expenses() {
  const [state, dispatch] = useReducer(reducer, {
    expenses: [],
    totalAmountSpent: 0,
  })
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    date: new Date(),
  })

  const handleAddExpense = () => {
    if (newExpense.amount === '' || newExpense.name === '') {
      return
    }
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense })
    setNewExpense({ name: '', amount: '', date: new Date() })
  }

  const handleEditExpense = (index) => {
    // Dispatch an action to edit the expense with the given index
    // dispatch({ type: "EDIT_EXPENSE", payload: index });
    console.log('edit expense')
  }

  const handleDeleteExpense = (index) => {
    // Dispatch an action to delete the expense with the given index
    // dispatch({ type: "DELETE_EXPENSE", payload: index });
    console.log('delete expense')
  }

  return (
    <Grid container spacing={2}>
      {/* First row */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper className="paper">
              <Typography variant="h5">Spending Overview</Typography>
              <Typography variant="body1">
                Expenses: {state.expenses.length}
              </Typography>
              <Typography variant="body1">
                Total: ${state.totalAmountSpent}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="paper">
              <Typography variant="h5">Add Expense</Typography>
              <TextField
                label="Name"
                value={newExpense.name}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, name: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Amount"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <Button
                style={{ marginTop: '10px' }}
                variant="contained"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {/* Second row */}
      <Grid style={{ marginTop: '60px' }} item xs={12}>
        <Paper className="paper">
          <Typography variant="h5">Expense Logs</Typography>
          <div className="legend">
            <div className="name">Name</div>
            <div className="amount">Amount</div>
            <div className="date">Date</div>
          </div>
          <div className="expense-log">
            {state.expenses.map((expense, index) => (
              <div className="expense-item" key={index}>
                <div className="name">{expense.name}</div>
                <div className="amount">${expense.amount}</div>
                <div className="date-container">
                  <div className="date">
                    {expense.date.toLocaleDateString()}
                  </div>
                  <div className="actions">
                    <IconButton onClick={() => handleEditExpense(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteExpense(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}
