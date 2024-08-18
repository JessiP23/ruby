'use client'
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await api.get('/transactions');
        setTransactions(transactionResponse.data);

        // Fetch the budget (assuming an endpoint exists)
        const budgetResponse = await api.get('/budgets');
        setBudget(budgetResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Current Budget: ${budget}</h2>
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.date}: ${transaction.amount} - {transaction.Category ? transaction.Category.name : 'No Category'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
