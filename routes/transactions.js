const express = require('express');
const router = express.Router();
const { Transaction, User, Category } = require('../models');

// GET /api/transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Category, attributes: ['name'] }
      ]
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const { userId, categoryId, amount, date } = req.body;

    const transaction = await Transaction.create({
      userId: parseInt(userId, 10),
      categoryId: parseInt(categoryId, 10),
      amount: parseFloat(amount),
      date: new Date(date),
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await Transaction.destroy({ where: { id } });
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

module.exports = router;
