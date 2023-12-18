// components/ExpensePieChart.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledCard = styled(Card)`
  border-radius: 16px; // Rounded corners for the card
  margin: 16px;
  background: #2A2D3E;
  color: #fff;
`;

const ExpensePieChart = () => {
  const data = {
    labels: ['Groceries', 'Utilities', 'Rent', 'Entertainment', 'Other'],
    datasets: [
      {
        label: 'Expenses',
        data: [300, 150, 800, 200, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Expense Distribution
        </Typography>
        <div style={{ height: '300px' }}>
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default ExpensePieChart;
