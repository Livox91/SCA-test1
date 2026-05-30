module.exports = {
  STRIPE_API_VERSION: 'v1',
  STRIPE_TIMEOUT: 5000,
  PAYMENT_METHODS: ['card', 'paypal', 'apple_pay'],
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP'],
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_BACKOFF_MS: 1000
};
