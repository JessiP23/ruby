// routes/categories.js
const express = require('express');
const { Category } = require('../models');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

module.exports = router;
