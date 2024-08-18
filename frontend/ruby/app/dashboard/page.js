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
      <div className="max-w-6xl mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <h2 className="text-xl text-gray-700">Current Budget: ${budget}</h2>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          <ul className="space-y-4">
            {transactions.map(transaction => (
              <li key={transaction.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                <div className="flex flex-col">
                  <span className="text-gray-700">{transaction.date}</span>
                  <span className="text-gray-900 font-semibold">${transaction.amount}</span>
                  <span className="text-gray-600">{transaction.Category ? transaction.Category.name : 'No Category'}</span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 font-semibold"
                  onClick={() => deleteExpense(transaction.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expenses Overview</h3>
          <ExpenseChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
