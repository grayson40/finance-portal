// components/RecentTransactions.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";

// Dummy data for the transactions
const transactions = [
  { id: 1, date: "2023-01-01", description: "Grocery", amount: "$150" },
  { id: 2, date: "2023-01-03", description: "Electricity Bill", amount: "$75" },
  { id: 3, date: "2023-01-05", description: "Gym Membership", amount: "$45" },
  // ... more transactions
];

const StyledCard = styled(Card)`
  margin: 16px;
  background: #2a2d3e;
  color: #fff;
`;

const StyledTableHeadCell = styled(TableCell)`
  color: #fff;
  background: #1c1f2a;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #252836;
  }
  &:nth-of-type(even) {
    background-color: #2a2d3e;
  }
`;

const StyledTableCell = styled(TableCell)`
  color: #fff;
`;

const RecentTransactions = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">Recent Transactions</Typography>
        <TableContainer>
          <Table aria-label="recent transactions table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Date</StyledTableHeadCell>
                <StyledTableHeadCell>Description</StyledTableHeadCell>
                <StyledTableHeadCell>Amount</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <StyledTableRow key={transaction.id}>
                  <StyledTableCell>{transaction.date}</StyledTableCell>
                  <StyledTableCell>{transaction.description}</StyledTableCell>
                  <StyledTableCell>{transaction.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </StyledCard>
  );
};

export default RecentTransactions;
