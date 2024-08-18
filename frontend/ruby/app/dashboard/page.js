'use client'
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ExpenseChart from '@/components/ExpenseChart';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [data, setData] = useState({ categories: [], expenses: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await api.get('/transactions');
        const transactionsData = transactionResponse.data;
        setTransactions(transactionsData);
// Process transactions to get categories and expenses
const categoryMap = new Map();
transactionsData.forEach((transaction) => {
  const categoryName = transaction.Category ? transaction.Category.name : 'Uncategorized';
  if (!categoryMap.has(categoryName)) {
    categoryMap.set(categoryName, 0);
  }
  categoryMap.set(categoryName, categoryMap.get(categoryName) + transaction.amount);
});

const categories = Array.from(categoryMap.keys());
const expenses = Array.from(categoryMap.values());

setData({ categories, expenses });

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
      <h3>Expenses by Category</h3>
      <ExpenseChart data={data} />
    </div>
  );
};

export default Dashboard;