const jwt = require('jsonwebtoken');

class JwtHandler {
  static jwtSignature = 'MySuP3R_z3kr3t';

  static generateJwt(data) {
    try {
      return jwt.sign({ data }, this.jwtSignature);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Error while generating JWT');
    }
  }

  static decodeJwt(token) {
    try {
      return jwt.verify(token, this.jwtSignature);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Error during decoding JWT');
    }
  }
}

module.exports = JwtHandler;
