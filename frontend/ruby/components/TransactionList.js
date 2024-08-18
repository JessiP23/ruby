'use client'
import React, { useState, useEffect } from 'react';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the backend
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            User ID: {transaction.userId}, Category ID: {transaction.categoryId}, 
            Amount: ${transaction.amount}, Date: {new Date(transaction.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;