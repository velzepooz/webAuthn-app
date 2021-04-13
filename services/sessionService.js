const JwtHandler = require('../utils/jwtHandler');
const PasswordHandler = require('../utils/passwordHandler');

class SessionService {
  #passwordHandler;

  #jwtHandler;

  constructor(
    userRepository,
    utils = {
      passwordHandler: PasswordHandler,
      jwtHandler: JwtHandler,
    },
  ) {
    // eslint-disable-next-line new-cap
    this.#passwordHandler = utils.passwordHandler;
    this.#jwtHandler = utils.jwtHandler;
    this.repository = userRepository;
  }

  signUp = async (name, password) => {
    try {
      const hashedPassword = await this.#passwordHandler.hashPassword(password);
      const user = this.repository.create(name, hashedPassword);
      const jwt = this.#jwtHandler.generateJwt(user);

      return {
        user,
        token: jwt,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Sign Up Error');
    }
  };

  signInWithJwtToken = async (token) => {
    try {
      const user = this.#jwtHandler.decodeJwt(token).data;
      const jwt = this.#jwtHandler.generateJwt(user);

      return {
        user,
        token: jwt,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Sign In Error');
    }
  };

  async signIn(name, password) {
    try {
      const user = await this.repository.findOne({
        field: 'name',
        value: name,
      });
      const isCorrect = await this.checkIsPasswordCorrect(
        user.password,
        password,
      );

      if (!isCorrect) {
        throw new Error('Password incorrect');
      }

      const jwt = this.#jwtHandler.generateJwt(user);

      return {
        user: {
          id: user.id,
          name: user.name,
        },
        token: jwt,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error(e.message);
    }
  }

  async checkIsPasswordCorrect(hashedPassword, passwordToCheck) {
    // eslint-disable-next-line no-return-await
    return await this.#passwordHandler.verifyPassword(
      hashedPassword,
      passwordToCheck,
    );
  }
}

module.exports = SessionService;
