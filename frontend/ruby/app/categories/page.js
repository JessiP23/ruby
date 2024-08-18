'use client'
import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import Sidebar from '@/components/Sidebar';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

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

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/categories', { name: newCategoryName });
      setCategories([...categories, response.data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className='page-container'>
      <Sidebar />
      <div className='content text-center'>
        <h1 className='text-3xl'>Categories</h1>
        <ul>
          {categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
        <h2>Add New Category</h2>
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            required
          />
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default Categories;