'use client'
import React, { useState, useEffect } from 'react';
import api from '@/services/api';

function AddTransaction() {
  const [userId, setUserId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 mb-36 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col text-blue-900">
          <label htmlFor="userId" className="mb-2 font-semibold text-gray-700">User ID:</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            placeholder='Only numbers e.g. 1234'
            required
          />
        </div>
        <div className="flex flex-col text-blue-900">
          <label htmlFor="categoryId" className="mb-2 font-semibold text-gray-700">Category:</label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            required
          >
            <option value="" className='text-blue-900'>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} className='text-blue-900'>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col text-blue-900">
          <label htmlFor="amount" className="mb-2 font-semibold text-gray-700">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col text-blue-900">
          <label htmlFor="date" className="mb-2 font-semibold text-gray-700">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransaction;
