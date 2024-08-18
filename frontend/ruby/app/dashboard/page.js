'use client';
// pages/dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ExpenseChart from '@/components/ExpenseChart';
import Sidebar from '@/components/Sidebar';

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
          const categoryName = transaction.Category ? transaction.Category.name : 'No Category';
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

  const deleteExpense = async (id) => {
    try {
      // Make the delete request
      await api.delete(`/transactions/${id}`);

      // Update the state to remove the deleted transaction
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);

      // Update the category data
      const updatedCategoryMap = new Map();
      updatedTransactions.forEach((transaction) => {
        const categoryName = transaction.Category ? transaction.Category.name : 'No Category';
        if (!updatedCategoryMap.has(categoryName)) {
          updatedCategoryMap.set(categoryName, 0);
        }
        updatedCategoryMap.set(categoryName, updatedCategoryMap.get(categoryName) + transaction.amount);
      });

      const updatedCategories = Array.from(updatedCategoryMap.keys());
      const updatedExpenses = Array.from(updatedCategoryMap.values());

      setData({ categories: updatedCategories, expenses: updatedExpenses });
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>Dashboard</h1>
      <h2>Current Budget: ${budget}</h2>
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.date}: ${transaction.amount} - {transaction.Category ? transaction.Category.name : 'No Category'}
            <button onClick={() => deleteExpense(transaction.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Expenses Overview</h3>
      <ExpenseChart data={data} />
    </div>
  );
};

export default Dashboard;
