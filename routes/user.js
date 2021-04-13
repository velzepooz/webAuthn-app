/* eslint-disable no-param-reassign */
/* eslint-disable space-before-function-paren */
const { Router } = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const AuthHelpers = require('../helpers/authHelpers');
const user = require('../models/user');
const session = require('express-session');

const router = Router();
const upload = multer();

router.post('/api/signUp', upload.any(), async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { name, password } = req.body;
  const authHelper = new AuthHelpers();

  try {
    const userData = await authHelper.signUp(name, password);

    if (userData) {
      return res.json({
        status: 'success', userData,
      });
    }
  } catch (e) {
    console.log(e);

    return res.json({
      status: 'error', message: e.message,
    });
  }

  res.json({
    status: 'error', message: `Can't create user`,
  });
});

router.post('/api/signIn', upload.any(), async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization;
  const authHelper = new AuthHelpers();

  try {
    // Typeof token - string
    if (token && token !== 'null') {
      console.log('Login by token');
      const userData = await authHelper.signInWithJwtToken(token);

      if (userData) {
        req.session.username = userData.name;

        return res.json({
          status: 'success',
          userData,
        });
      }
    }

    const { name, password } = req.body || undefined;

    if (name && password) {
      console.log('Login by body');

      const userData = await authHelper.signIn(name, password);

      if (userData) {
        return res.json({
          status: 'success',
          userData,
        });
      }
    }
  } catch (e) {
    console.log(e);

    return res.json({
      status: 'error', message: e.message,
    });
  }

  res.json({
    status: 'error',
    message: 'No user data',
  });
});

router.post('/api/webAuthRequest', bodyParser.json(), async(req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization;

  try {
    if (token && token !== 'null') {
      const authHelper = new AuthHelpers();
      const options = await authHelper.getWebAuthnOptions(
        token,
        req.body,
      );

      if (options) {
        return res.json({
          status: 'success',
          options,
        });
      }
    }
  } catch (e) {
    console.log(e);

    return res.json({
      status: 'error',
      message: e.message,
    });
  }

  return res.json({
    status: 'error',
    message: 'Not options from server',
  });
});

router.post('/api/webAuthSave', bodyParser.json(), async(req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const token = req.headers.authorization;

  try {
    if (token && token !== 'null') {
      const authHelper = new AuthHelpers();
      const options = await authHelper.createUserPublicKey(
        token,
        req.body,
      );

      if (options) {
        return res.json({
          status: 'success', options,
        });
      }
    }
  } catch (e) {
    console.log(e);

    return res.json({
      status: 'error',
      message: e.message,
    });
  }

  return res.json({
    status: 'error',
    message: 'Not options from server',
  });
});

module.exports = router;
