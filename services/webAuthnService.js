/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { Fido2Lib } = require('fido2-library');
const base64url = require('base64url');
const base64buffer = require('base64-arraybuffer');
const User = require('../models/userModel');
const JwtHandler = require('../utils/jwtHandler');

class webAuthnService {
  #jwtHandler = JwtHandler;

  constructor(model) {
    this.model = model;
  }

  getWebAuthnOptions = async(token, optionsFromClient) => {
    const user = this.#jwtHandler.decodeJwt(token).data || null;

    const f2lib = new Fido2Lib({
      rpName: optionsFromClient.rp.name,
      rpId: optionsFromClient.rp.id,
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7,
        },
      ],
      authenticatorAttachment: optionsFromClient
        .authenticatorSelection.authenticatorAttachment,
      userVerification: optionsFromClient
        .authenticatorSelection.userVerification,
      authenticatorRequireResidentKey: optionsFromClient
        .authenticatorSelection.requireResidentKey,
      challengeSize: 128,
      attestation: 'none',
      cryptoParams: [-7, -257],
      timeout: 60000,
    });

    const options = await f2lib.attestationOptions();

    options.user = {
      name: user.name,
      displayName: user.name,
      id: base64url.encode(user._id),
    };

    options.challenge = base64url.encode(options.challenge);

    return options;
  };

  createUserPublicKey = async(token, publicKey) => {
    const user = this.#decodeJWT(token).data || null;

    if (user) {
      const f2lib = new Fido2Lib();
      const attestationExpectations = {
        challenge: publicKey.challenge,
        origin: 'http://localhost:9000',
        factor: 'either',
      };

      publicKey.convertedCredential.id = base64buffer
        .decode(publicKey.convertedCredential.id);
      publicKey.convertedCredential.rawId = base64buffer
        .decode(publicKey.convertedCredential.rawId);

      const registrationResult = await f2lib.attestationResult(
        publicKey.convertedCredential,
        attestationExpectations,
      );

      const { authnrData } = registrationResult;
      const credId = base64url.encode(authnrData.get('credId'));
      const counter = authnrData.get('counter');

      await User.findByIdAndUpdate(user._id, {
        publicKey: {
          credId,
          publicKey: authnrData.get('credentialPublicKeyPem'),
          counter,
        },
      });
    }
  };

  getAuthenticationOptions = async() => {
    try {
      const f2lib = new Fido2Lib();
      const authnOptions = await f2lib.assertionOptions();

      authnOptions.challenge = base64url.encode(authnOptions.challenge);

      return authnOptions;
    } catch (e) {
      throw e;
    }
  };
}

module.exports = AuthService;
