const crypto = require('crypto');

const salt = 'mySecretSalt';

// Function to hash a password
function hashPassword(password) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return hash
  
}

// Function to verify password
function verifyPassword(password, hash) {
  const hashToVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return hash === hashToVerify;
}

module.exports = {
    hashPassword,
    verifyPassword
}


