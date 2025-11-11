const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const tipRoutes = require('./routes/tipRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/tips', tipRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Crime Prevention API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
