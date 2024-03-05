import bcrypt from "bcryptjs";

// Function to hash (encrypt) a password
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Function to compare (decrypt) a password with its hash
async function comparePasswords(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

// Example usage
async function example() {
  const originalPassword = 'mySecurePassword';

  // Hash the password
  const hashedPassword = await hashPassword(originalPassword);
  console.log('Hashed Password:', hashedPassword);

  // Compare the password with its hash
  const isMatch = await comparePasswords(originalPassword, hashedPassword);
  console.log('Password Match:', isMatch);
}

// Call the example function
example();
