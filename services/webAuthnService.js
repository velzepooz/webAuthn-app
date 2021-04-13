/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { Fido2Lib } = require('fido2-library');
const base64buffer = require('base64-arraybuffer');
const JwtHandler = require('../utils/jwtHandler');

class WebAuthnService {
  #jwtHandler;

  #fido2Options;

  constructor(userRepository, fido2Options, jwtHandler = JwtHandler) {
    this.userRepository = userRepository;
    this.#jwtHandler = jwtHandler;
    this.#fido2Options = fido2Options;
    this.f2lib = new Fido2Lib(this.#fido2Options);
  }

  async generateWebAuthnOptions(token) {
    try {
      const user = this.#jwtHandler.decodeJwt(token).data;
      const options = await this.#prepareFidoRegistrationOptions(user);
      const tokenWithChallenge = this.#jwtHandler.generateJwt(
        {
          user,
          challenge: options.challenge,
        },
      );

      return {
        options,
        token: tokenWithChallenge,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Failed to generate webAuthn options');
    }
  };

  async registerWebAuthn(token, clientAttestationResponse) {
    const tokenData = this.#getDataFromJwt(token);
    const attestationExpectations = this
      .#getAttestationOptions(tokenData.challenge);

    this.#decodeClientAttestationResponseIdAndRawId(clientAttestationResponse);

    const registrationResult = await this.#getRegistrationResult(
      clientAttestationResponse,
      attestationExpectations,
    );

    const webAuthnParams = this.#getWebAuthnParams(registrationResult);

    await this.userRepository.update(tokenData.user.id, {
      field: 'webAuthnParams',
      value: webAuthnParams,
    });

    const tokenWithChallenge = this.#jwtHandler.generateJwt(
      {
        user: tokenData.user,
      },
    );

    return {
      token: tokenWithChallenge,
    };
  };

  async getLoginOptions(token) {
    try {
      const tokenData = this.#jwtHandler.decodeJwt(token).data;

      const authnOptions = await this.f2lib.assertionOptions();
      const user = await this.userRepository.findById(tokenData.user.id);
      const { webAuthnParams } = user;

      authnOptions.challenge = base64buffer.encode(authnOptions.challenge);

      authnOptions.allowCredentials = [
        {
          id: webAuthnParams.credId,
          type: 'public-key',
          transports: [
            'internal'
          ]
        },
      ];

      const tokenWithChallenge = this.#jwtHandler.generateJwt(
        {
          user: {
            id: user.id,
            name: user.name,
          },
          challenge: authnOptions.challenge,
        },
      );

      return {
        token: tokenWithChallenge,
        options: authnOptions,
      };
    } catch (e) {
      throw e;
    }
  };

  async signIn(token, clientAssertionResponse) {
    const tokenData = this.#jwtHandler.decodeJwt(token).data;
    console.log('clientAssertionResponse: ', clientAssertionResponse);
    console.log('TokenData ', tokenData)

    const { id } = tokenData.user;
    const { challenge } = tokenData;

    const user = await this.userRepository.findById(id);
    const { webAuthnParams } = user;

    if (!webAuthnParams) {
      throw new Error('No webAuth credits');
    }

    clientAssertionResponse.rawId = base64buffer.decode(
      clientAssertionResponse.rawId
    );
    clientAssertionResponse.response.authenticatorData = base64buffer.decode(
      clientAssertionResponse.response.authenticatorData
    );

    const assertionExpectations = {
      challenge: challenge,
      origin: this.#fido2Options.origin,
      factor: this.#fido2Options.factor,
      publicKey: webAuthnParams.publicKey,
      prevCounter: webAuthnParams.counter,
      userHandle: webAuthnParams.credId,
    };

    const result = await this.f2lib.assertionResult(
      clientAssertionResponse,
      assertionExpectations,
    );

    if (result) {
      await this.userRepository.update(id, {
        field: 'webAuthnParams.counter',
        value: result.authnrData.get('counter'),
      });

      const tokenWithChallenge = this.#jwtHandler.generateJwt(
        {
          user: {
            id: user.id,
            name: user.name,
          },
          challenge,
        },
      );

      return {
        token: tokenWithChallenge,
        user: {
          id: user.id,
          name: user.name,
        },
      };
    } else {
      throw new Error('Authentication failed')
    }
  }

  async #prepareFidoRegistrationOptions(user) {
    try {
      const options = await this.f2lib.attestationOptions();

      options.user = {
        name: user.name,
        displayName: user.name,
        id: base64buffer.encode(user._id),
      };

      options.challenge = base64buffer.encode(options.challenge);

      return options;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error('Failed to prepare fido2Options');
    }
  }

  #getDataFromJwt = (token) => {
    try {
      return this.#jwtHandler.decodeJwt(token).data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error(e);
    }
  }

  #getAttestationOptions = (challenge) => {
    return {
      challenge,
      origin: 'http://localhost:3000',
      factor: 'either',
    };
  }

  #decodeClientAttestationResponseIdAndRawId = (clientAttestationResponse) => {
    clientAttestationResponse.id = base64buffer
      .decode(clientAttestationResponse.id);
    clientAttestationResponse.rawId = base64buffer
      .decode(clientAttestationResponse.rawId);
  }

  async #getRegistrationResult(
    clientAttestationResponse,
    attestationExpectations,
  ) {
    try {
      const registrationResult = await this.f2lib.attestationResult(
        clientAttestationResponse,
        attestationExpectations,
      );

      return registrationResult;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);

      throw new Error(e);
    }
  }

  #getWebAuthnParams = (registrationResult) => {
    const { authnrData } = registrationResult;

    const credId = base64buffer.encode(authnrData.get('credId'));
    const counter = authnrData.get('counter');
    const publicKey = authnrData.get('credentialPublicKeyPem');

    return {
      credId,
      counter,
      publicKey,
    };
  }
}

module.exports = WebAuthnService;
