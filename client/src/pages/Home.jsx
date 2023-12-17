import React from "react";
import BalanceSummary from "../components/BalanceSummary";
import RevenueChart from "../components/RevenueChart";
import ExpensePieChart from "../components/ExpensePieChart";
import RecentTransactions from "../components/RecentTransactions";
import HomeLayout from "../components/layouts/HomeLayout";
import { Grid } from '@mui/material';

export default function Home() {
  return (
    <HomeLayout>
      <BalanceSummary />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <RevenueChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpensePieChart />
        </Grid>
      </Grid>
      <RecentTransactions />
    </HomeLayout>
  );
}
