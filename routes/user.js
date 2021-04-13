/* eslint-disable no-param-reassign */
/* eslint-disable space-before-function-paren */
const { Router } = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const SessionController = require('../controllers/sessionController');
const WebAuthnController = require('../controllers/webAuthnController');
const SessionService = require('../services/sessionService');
const UserRepository = require('../repository/userRepository');
const WebAuthnService = require('../services/webAuthnService');
const userModel = require('../models/userModel');
const fido2Options = require('../configs/fido2Options');

const router = Router();
const upload = multer();
const userRepository = new UserRepository(userModel);
const sessionService = new SessionService(userRepository);
const webAuthnService = new WebAuthnService(userRepository, fido2Options);
const sessionController = new SessionController(sessionService);
const webAuthnController = new WebAuthnController(webAuthnService);

router.post(
  '/signUp',
  upload.any(),
  sessionController.signUp.bind(sessionController),
);

router.post(
  '/signIn',
  upload.any(),
  sessionController.signIn.bind(sessionController),
);

router.get(
  '/getWebAuthnOptions',
  webAuthnController.getWebAuthnOptions.bind(webAuthnController),
);

router.post(
  '/webAuthnRegister',
  bodyParser.json(),
  webAuthnController.webAuthnRegister.bind(webAuthnController),
);

router.get(
  '/webAuthnLogin',
  webAuthnController.generateWebAuthnLoginOptions.bind(webAuthnController),
);

router.post(
  '/webAuthnLogin',
  bodyParser.json(),
  webAuthnController.webAuthnLogin.bind(webAuthnController),
);

module.exports = router;
