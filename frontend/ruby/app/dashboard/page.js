'use client';
import React, { useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import api from '../../services/api';
import ExpenseChart from '@/components/ExpenseChart';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const { openSignIn } = useClerk(); // Add this hook to open the sign-in modal
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [data, setData] = useState({ categories: [], expenses: [] });
  const [newBudget, setNewBudget] = useState('');

  useEffect(() => {
    if (!isLoaded || !user) return; // Wait for user to be loaded and authenticated

    const fetchData = async () => {
      try {
        // Fetch transactions
        const transactionResponse = await api.get('/transactions');
        const transactionsData = transactionResponse.data;
        setTransactions(transactionsData);

        // Calculate expenses and categories
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

        // Fetch the budget
        const budgetResponse = await api.get('/budgets');
        const budgetData = budgetResponse.data;
        setBudget(budgetData);
        setRemainingBudget(budgetData - expenses.reduce((acc, amount) => acc + amount, 0));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [isLoaded, user, transactions]);

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // Redirect to sign-in page if not authenticated
      openSignIn();
      return;
    }

    try {
      // Send the new budget to the server
      await api.post('/budgets', { amount: parseFloat(newBudget) });

      // Update local state
      setBudget(parseFloat(newBudget));
      setRemainingBudget(parseFloat(newBudget) - data.expenses.reduce((acc, amount) => acc + amount, 0));
      setNewBudget('');
    } catch (error) {
      console.error('Error setting budget', error);
    }
  };

  const deleteExpense = async (id) => {
    if (!user) {
      // Redirect to sign-in page if not authenticated
      openSignIn();
      return;
    }

    try {
      // Make the delete request
      await api.delete(`/transactions/${id}`);

      // Update the state to remove the deleted transaction
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);

      // Update category data
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

      // Update budget and remaining budget
      const totalExpenses = updatedExpenses.reduce((acc, amount) => acc + amount, 0);
      setRemainingBudget(budget - totalExpenses);
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  if (!isLoaded) return (
    <div>Loading...</div>
  ); 

  if (!user) {
    // If not authenticated, redirect to sign-in page
    return (
      <div className='text-center py-10 text-2xl'>Please <button onClick={openSignIn} className="text-blue-500">sign in</button> to access this page.</div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div className="max-w-6xl mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <h2 className="text-xl text-gray-700">Current Budget: ${budget}</h2>
          <h3 className={`text-xl ${remainingBudget < 0 ? 'text-red-500' : 'text-gray-700'}`}>
            Remaining Budget: ${remainingBudget}
          </h3>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Set Your Budget</h3>
          <form onSubmit={handleBudgetSubmit} className="flex flex-col space-y-4 mb-6">
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="Enter new budget"
              min="0"
              step="0.01"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Budget
            </button>
          </form>
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
