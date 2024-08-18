'use client'
import React, { useState } from 'react';

function AddTransaction() {
  const [userId, setUserId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      userId,
      categoryId,
      amount,
      date,
    };

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert('Transaction added successfully');
        // Optionally, reset form fields
        setUserId('');
        setCategoryId('');
        setAmount('');
        setDate('');
      } else {
        alert('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category ID:</label>
        <input
          type="text"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;
