'use client'
import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import Sidebar from '@/components/Sidebar';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const {user, openSignIn} = useClerk();
  const router = useRouter();

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

  if (!user) {
    // If not authenticated, redirect to sign-in page
    return (
      <div className='text-center py-10 text-2xl'>Please <button onClick={openSignIn} className="text-blue-500">sign in</button> to access this page.</div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div className='flex-1 p-6 '>
        <h1 className='text-3xl font-bold text-gray-600 mb-4 text-center py-8'>Categories</h1>
        <ul className='mb-6 space-y-2 w-[30%] max-w-xs mx-auto'>
          {categories.map(category => (
            <li key={category.id} className='bg-white p-4 rounded-lg shadow-md text-lg text-blue-800 text-center'>{category.name}</li>
          ))}
        </ul>
        <div className='bg-white p-6 rounded-lg shadow-md w-[30%] max-w-xs mx-auto'>
          <h2 className='text-2xl font-semibold mb-4 text-blue-900'>Add New Category</h2>
          <form onSubmit={handleAddCategory} className='flex flex-col space-y-4'>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name"
              required
              className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800'
            />
            <button
              type="submit"
              className='bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
