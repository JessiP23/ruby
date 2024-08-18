// routes/categories.js
const express = require('express');
const { Category } = require('../models');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch(error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});;

// Add a new category
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).json(category)
  } catch(error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ error: 'Failed to create category' });
  }
})

module.exports = router;