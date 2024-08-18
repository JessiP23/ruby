const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const {sequelize} = require('./models')
const transactionRoutes = require('./routes/transactions')
const budgetRoutes = require('./routes/budgets')
const categoryRoutes = require('./routes/categories')
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync();
});