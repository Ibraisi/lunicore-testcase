const bcrypt = require('bcrypt');

// Function to encrypt a password
async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error encrypting password');
  }
}

// Function to compare a password with a hashed password
async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

module.exports = {
  encryptPassword,
  comparePasswords
};