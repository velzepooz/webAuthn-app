class SessionController {
  constructor(sessionService) {
    // eslint-disable-next-line new-cap
    this.sessionService = sessionService;
  }

  async signUp(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const { name, password } = req.body;

    let result = null;

    try {
      const userData = await this.sessionService.signUp(name, password);

      result = {
        status: 'success',
        userData,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      result = {
        status: 'error',
        message: e.message,
      };
    }

    return res.json(result);
  }

  async signIn(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    // const token = req.headers.authorization;
    let userData = null;
    let result = null;

    try {
      // Typeof token - string
      // if (token && token !== 'null') {
      //   userData = await this.sessionService.signInWithJwtToken(token);
      // } else {
      //   const { name, password } = req.body || undefined;
      //
      //   if (name && password) {
      //     userData = await this.sessionService.signIn(name, password);
      //   } else {
      //     throw new Error('No name or password');
      //   }
      // }

      const { name, password } = req.body || undefined;

      if (name && password) {
        userData = await this.sessionService.signIn(name, password);
      } else {
        throw new Error('No name or password');
      }

      result = {
        status: 'success',
        userData,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      result = {
        status: 'error',
        message: 'No user data',
      };
    }

    return res.json(result);
  }
}

module.exports = SessionController;
