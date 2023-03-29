import React, { useRef, useState } from 'react'
import { Button, TextField, Stack } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart'
import '../styles/investments.css'

export default function Investments() {
  const [investments, setInvestments] = useState([{ symbol: 'XLE', qty: 2, capital: 162.98 }])
  const tickerRef = useRef();
  const qtyRef = useRef();

  const addInvestment = async () => {
    // Grab symbol and qty
    const ticker = tickerRef.current.value;
    const qty = Number(qtyRef.current.value);

    // Clear refs
    tickerRef.current.value = '';
    qtyRef.current.value = '';

    // Get ticker data and create investment obj
    const stockInfo = await fetchStockData(ticker);
    const userCaptial = stockInfo.ask * qty;
    const newInvestment = {
      symbol: ticker,
      qty: qty,
      capital: userCaptial.toFixed(2),
    }
  
    // Append new investment
    setInvestments((prevState) => [...prevState, newInvestment])
  }

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stock-data?symbol=${symbol}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const stockInfo = await response.json();
      return stockInfo;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <>
      <div className='center'>
        <Stack spacing={2} direction="column" >
          <TextField
            inputRef={tickerRef}
            color="secondary"
            size="small"
            id="outlined-basic"
            placeholder="Ticker"
            variant="outlined" />
          <TextField
            inputRef={qtyRef}
            color="secondary"
            size="small"
            id="outlined-basic"
            placeholder="Qty"
            variant="outlined" />
          <Button
            color="secondary"
            startIcon={<BarChartIcon />}
            onClick={addInvestment}
            variant="contained">
            Add investment
          </Button>
        </Stack>
        <>
          {investments.map((investment) => (
            <div key={investment.symbol}>
              <p>{`Name: ${investment.symbol}`}</p>
              <p>{`Capital: ${investment.capital}`}</p>
            </div>
          ))}
        </>
      </div>
    </>
  )
}
