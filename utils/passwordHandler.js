const argon2 = require('argon2');

class PasswordHandler {
  static hashPassword = async (password) => {
    try {
      const passwordHashed = await argon2.hash(password);

      return passwordHashed;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Error while hashing password');
    }
  }

  static verifyPassword = async (hashedPassword, candidatePassword) => {
    try {
      const isCorrectPassword = await argon2.verify(
        hashedPassword,
        candidatePassword,
      );

      return isCorrectPassword;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Error during password verification');
    }
  }
}

module.exports = PasswordHandler;
