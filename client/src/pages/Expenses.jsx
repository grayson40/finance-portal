import React, { useEffect, useReducer, useState } from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@mui/material'
import '../styles/expenses.css'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuthValue } from '../context/AuthContext'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        expenses: [action.payload, ...state.expenses],
        totalAmountSpent:
          state.totalAmountSpent + Number(action.payload.Amount),
      }
    case 'SET_EXPENSES':
      return {
        expenses: [...action.payload],
        totalAmountSpent: action.payload.reduce((acc, expense) => acc + expense.Amount, 0),
      }
    case 'DELETE_EXPENSE':
      const deletedExpense = state.expenses.find(
        (expense) => expense.ID === action.payload
      )
      return {
        expenses: state.expenses.filter((expense) => expense.ID !== action.payload),
        totalAmountSpent:
          state.totalAmountSpent - Number(deletedExpense.Amount),
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function Expenses() {
  const { user } = useAuthValue();
  const [state, dispatch] = useReducer(reducer, {
    expenses: [],
    totalAmountSpent: 0,
  })
  const [newExpense, setNewExpense] = useState({})

  useEffect(() => {
    const fetchData = () => {
      fetch(`api/users/${user.ID}/expenses`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch({ type: 'SET_EXPENSES', payload: data });
        })
        .catch((err) => console.error(err));
    }

    fetchData();
  },[])

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.amount === '' || newExpense.name === '') {
      return
    }
    // Send a POST request to the backend expenses endpoint
    fetch('api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildPostBody()),
    })
      .then((response) => response.json())
      .then((data) => {
        // Dispatch the ADD_EXPENSE action with the new expense
        dispatch({ type: 'ADD_EXPENSE', payload: data });
        setNewExpense({ name: '', amount: '' })
      })
      .catch((err) => console.error(err));
  }

  /**
   * Builds the POST body for the expenses endpoint
   * @returns {Object} The POST body
   */
  const buildPostBody = () => {
    return {
      name: newExpense.name,
      amount: parseFloat(newExpense.amount),
      userID: user.ID,
    }
  }

  const handleEditExpense = (expenseID) => {
    // Dispatch an action to edit the expense with the given index
    // dispatch({ type: "EDIT_EXPENSE", payload: index });

  }

  const handleDeleteExpense = (expenseID) => {
    if (!expenseID) {
      console.error('No expense ID provided')
      return
    }

    // Send a DELETE request to the backend expenses endpoint
    fetch(`api/expenses/${expenseID}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete expense')
        }
        dispatch({ type: 'DELETE_EXPENSE', payload: expenseID });
      })
      .catch((err) => console.error(err));
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
                <div className="name">{expense.Name}</div>
                <div className="amount">${expense.Amount}</div>
                <div className="date-container">
                  <div className="date">
                    {expense.CreatedAt}
                  </div>
                  <div className="actions">
                    <IconButton onClick={() => handleEditExpense(expense.ID)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteExpense(expense.ID)}>
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
