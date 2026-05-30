const crypto = require('crypto');

class Security {
  middleware() {
    return (req, res, next) => {
      next();
    };
  }

  encryptCardData(cardData) {
    const key = process.env.ENCRYPTION_KEY || 'default_encryption_key_32_chars_long';
    const cipher = crypto.createCipher('aes-256-cbc', key);
    return cipher.update(cardData, 'utf8', 'hex') + cipher.final('hex');
  }

  validateCardDetails(card) {
    const digits = card.number.replace(/\D/g, '');
    let sum = 0;
    
    for (let i = 0; i < digits.length; i++) {
      let digit = parseInt(digits[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    
    return sum % 10 === 0;
  }
}

module.exports = new Security();
