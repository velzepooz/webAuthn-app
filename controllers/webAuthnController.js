class WebAuthnController {
  constructor(authnService) {
    // eslint-disable-next-line new-cap
    this.authnService = authnService;
  }

  async getWebAuthnOptions(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const token = req.headers.authorization;

    let result = null;

    try {
      if (token && token !== 'null') {
        const options = await this.authnService.generateWebAuthnOptions(token);

        result = {
          status: 'success',
          options,
        };
      } else {
        result = {
          status: 'error',
          message: 'Not options from JWT',
        };
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      result = {
        status: 'error',
        message: 'Not options from server',
      };
    }

    return res.status(200).json(result);
  }

  async webAuthnRegister(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const token = req.headers.authorization;

    let result = null;

    try {
      if (token && token !== 'null') {
        const options = await this.authnService.registerWebAuthn(
          token,
          req.body,
        );

        result = {
          status: 'success',
          options,
        };
      } else {
        result = {
          status: 'error',
          message: 'Not options from server',
        };
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      result = {
        status: 'error',
        message: 'Not options from server',
      };
    }

    return res.json(result);
  }

  async generateWebAuthnLoginOptions(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const token = req.headers.authorization;

    let result = null;

    try {
      if (token && token !== 'null') {
        const options = await this.authnService.getLoginOptions(token);

        result = {
          status: 'success',
          options,
        };
      } else {
        result = {
          status: 'error',
          message: 'Not valid token',
        };
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      result = {
        status: 'error',
        message: 'Not options from server',
      };
    }

    return res.json(result);
  }

  async webAuthnLogin(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    const token = req.headers.authorization;

    let result = null;

    try {
      if (token && token !== 'null') {
        const options = await this.authnService.signIn(token, req.body);

        result = {
          status: 'success',
          options,
        };
      } else {
        result = {
          status: 'error',
          message: 'webAuthFailed',
        };
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      result = {
        status: 'error',
        message: 'Not options from server',
      };
    }

    return res.json(result);
  }
}

module.exports = WebAuthnController;
