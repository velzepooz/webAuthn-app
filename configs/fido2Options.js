const keys = require('../keys/index');

const fido2Options = {
  origin: 'http://localhost:3000',
  rpName: keys.rpName,
  factor: 'either',
  rpId: keys.rpId,
  pubKeyCredParams: [
    {
      type: 'public-key', alg: -7,
    },
  ],
  authenticatorAttachment: 'platform',
  userVerification: 'required',
  authenticatorRequireResidentKey: false,
  challengeSize: 128,
  attestation: 'none',
  cryptoParams: [-7, -257],
  timeout: 60000,
};

module.exports = fido2Options;
