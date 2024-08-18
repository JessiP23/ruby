// routes/budgets.js
const express = require('express');
const { Budget } = require('../models');

const router = express.Router();

// Get the current budget
router.get('/', async (req, res) => {
  const budget = await Budget.findAll();
  res.json(budget);
});

// Update or create a budget
router.post('/', async (req, res) => {
  const { userId, categoryId, amount } = req.body;
  const [budget, created] = await Budget.upsert({ userId, categoryId, amount });
  res.json(budget);
});

module.exports = router;
