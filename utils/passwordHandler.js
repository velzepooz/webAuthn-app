const argon2 = require('argon2');

class PasswordHasher {
  // eslint-disable-next-line class-methods-use-this
  async hashPassword(password) {
    try {
      const passwordHashed = await argon2.hash(password);

      return passwordHashed;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('No password was provided');
    }
  }
}

module.exports = PasswordHasher;
