import { makeRequestToApi } from './apiHelpers';
import base64buffer from 'base64-arraybuffer';
import { loginUser, userLogOut } from '../redux/rootReducer';

const BASE_URL = process.env.REACT_APP_API_URL;

// MAIN
export const registerCredential = async () => {
  try {
    const optionsFromServer = await getWebAuthnOptions();

    decodeOptionsChallengeAndUserId(optionsFromServer);

    const credentials = await generateCredentials(optionsFromServer);
    const convertedCredentials = await prepareCredentials(credentials);

    await registerWebAuthn(convertedCredentials);

  } catch (e) {
    console.log(e);
  }
};

export const authenticationByTouchId = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/webAuthnLogin`,
        {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      if (response.status === 200) {
        const data = await response.json();
        const { options } = data.options;
        localStorage.setItem('token', data.options.token);

        options.challenge = base64buffer.decode(options.challenge);
        options.allowCredentials.forEach(cred => {
          cred.id = base64buffer.decode(cred.id);
        });

        options.userVerification = 'required';
        options.rpId = 'localhost';

        const credential = await navigator.credentials.get({ publicKey: options });

        const credentials = {};
        credentials.id = credential.id;
        credentials.type = credential.type;
        credentials.rawId = base64buffer.encode(credential.rawId);

        if (credential.response) {
          const clientDataJSON =
            base64buffer.encode(credential.response.clientDataJSON);
          const authenticatorData =
            base64buffer.encode(credential.response.authenticatorData);
          const signature =
            base64buffer.encode(credential.response.signature);
          const userHandle =
            base64buffer.encode(credential.response.userHandle);
          credentials.response = {
            clientDataJSON,
            authenticatorData,
            signature,
            userHandle,
          };
        }

        const result = await makeRequestToApi(
          'webAuthnLogin',
          'POST',
          JSON.stringify(credentials),
          {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        );

        if (result.status === 200) {
          const data = await result.json();
          console.log(data);

          localStorage.setItem('token', data.options.token);
          return dispatch(loginUser(data.options.user));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};

async function registerWebAuthn(credentials) {
  const webAuthnRegistration = await makeRequestToApi(
    'webAuthnRegister',
    'POST',
    JSON.stringify(credentials),
    {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  );
}

async function getWebAuthnOptions() {
  try {
    const response = await fetch(
      `${BASE_URL}/getWebAuthnOptions`,
      {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );

    if (response.status === 200) {
      const result = await response.json();
      const { token } = result.options;
      const { options } = result.options;

      localStorage.setItem('token', token);

      return options;
    }
  } catch (e) {
    console.log(e);
  }
}

function decodeOptionsChallengeAndUserId(options) {
  options.challenge = base64buffer.decode(
    options.challenge,
  );
  options.user.id = base64buffer.decode(
    options.user.id,
  );
}

async function generateCredentials(options) {
  const credentials = await navigator.credentials.create({
    publicKey: options,
  });

  return credentials;
}

function prepareCredentials(credentials) {
  const convertedCredentials = {};

  convertedCredentials.id = credentials.id;
  convertedCredentials.rawId = base64buffer.encode(credentials.rawId);
  convertedCredentials.type = credentials.type;

  if (credentials.response) {
    const clientDataJSON = base64buffer.encode(
      credentials.response.clientDataJSON
    );
    const attestationObject = base64buffer.encode(
      credentials.response.attestationObject
    );

    convertedCredentials.response = {
      clientDataJSON,
      attestationObject,
    };
  }

  return convertedCredentials;
}
