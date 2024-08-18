'use client'
import React, { useState } from 'react';
import api from '../../services/api';

const Transactions = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/transactions', { amount, description });
      // Handle successful transaction creation (e.g., clear form, show success message)
    } catch (error) {
      console.error('Error creating transaction', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default Transactions;
