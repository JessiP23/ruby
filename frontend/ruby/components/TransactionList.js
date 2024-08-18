'use client'
import React, { useState, useEffect } from 'react';
import './style.css';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
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
    <div className="flex justify-center min-h-screen p-4"> 
      <div className="w-full max-w-4xl"> 
        <h2 className="text-4xl font-bold mb-6 text-center pb-11">Transaction List</h2> 
        <div className="grid grid-cols-1 gap-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-blue-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl">Date: {new Date(transaction.date).toLocaleDateString()}</h3>
              <div className="text-lg font-semibold">User ID: {transaction.userId}</div>
              <div className="text-lg">Category ID: {transaction.categoryId}</div>
              <div className="text-lg">Amount: ${transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionList;
