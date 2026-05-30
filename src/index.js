const express = require('express');
const paymentGateway = require('./payment-gateway');
const security = require('./security');

const app = express();

app.use(express.json());
app.use(security.middleware());

// Process payment endpoint
app.post('/api/process-payment', (req, res) => {
  paymentGateway.processPayment(req, res);
});

// Get transaction history
app.get('/api/transactions/:userId', (req, res) => {
  paymentGateway.getTransactions(req, res);
});

// Webhook handler for payment provider callbacks
app.post('/api/webhook', (req, res) => {
  paymentGateway.handleWebhook(req, res);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Payment processor running on port ${PORT}`);
});

module.exports = app;
