// components/BalanceSummary.jsx
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  margin: 16px;
  background: #2a2d3e;
  color: #fff;
  border-radius: 16px; // Rounded corners for the card
`;

const DataBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0; // Spacing top and bottom
`;

const BalanceSummary = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Overview Analytics
        </Typography>
        <Typography variant="h3" component="div">
          $568,999
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <DataBox>
              <Typography variant="subtitle2">Income</Typography>
              <Typography variant="subtitle1">$150K</Typography>
            </DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox>
              <Typography variant="subtitle2">Spending</Typography>
              <Typography variant="subtitle1">$120K</Typography>
            </DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox>
              <Typography variant="subtitle2">Investments</Typography>
              <Typography variant="subtitle1">$300K</Typography>
            </DataBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <DataBox>
              <Typography variant="subtitle2">Net Worth</Typography>
              <Typography variant="subtitle1">$1.2M</Typography>
            </DataBox>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default BalanceSummary;
