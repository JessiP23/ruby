'use client'
import React, { useState } from 'react';
import api from '../../services/api';

const Transactions = () => {
  const [userId, setUserId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/transactions', { userId, categoryId, amount, date });
      // Handle successful transaction creation (e.g., clear form, show success message)
      setUserId('');
      setCategoryId('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('Error creating transaction', error);
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
};

export default Transactions;