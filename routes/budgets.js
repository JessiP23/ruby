// routes/budgets.js
const express = require('express');
const { Budget } = require('../models');

const router = express.Router();

// Get the current budget for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const budgets = await Budget.findAll({ where: { userId } });
    if (budgets.length === 0) {
      return res.status(404).json({ message: 'No budgets found for this user' });
    }
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update or create a budget
router.post('/', async (req, res) => {
  try {
    const { userId, categoryId, amount } = req.body;
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }
    const [budget, created] = await Budget.upsert({ userId, categoryId, amount });
    res.status(created ? 201 : 200).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
