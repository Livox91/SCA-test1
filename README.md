# Payment Processor

A secure payment processing microservice for e-commerce platforms.

## Features
- Multi-gateway support (Stripe, PayPal)
- PCI-DSS compliant
- Encrypted card storage
- Transaction logging
- Webhook handling

## Installation

```bash
npm install
npm start
```

## API Endpoints

- `POST /api/process-payment` - Process a payment transaction
- `GET /api/transactions/:userId` - Retrieve transaction history
- `POST /api/webhook` - Handle payment provider webhooks

## Security

All card data is encrypted using AES-256-CBC encryption.

## Testing

```bash
npm test
```
