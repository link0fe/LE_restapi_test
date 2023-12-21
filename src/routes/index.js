const express = require('express');
const router = express.Router();
const controller = require('../services/controller');
const swaggConfig = require('../config/service.config');
const { reqLogger, resLogger } = require('../middleware/loggingMiddleware');
// const serializeResponse = require('../middleware/serializeResponse');
// const parseRequest = require('../middleware/parseRequest');

// i tried to do this
// router.use(serializeResponse)
// router.use(parseRequest)
router.use(reqLogger);

router.post('/search-products', resLogger, controller);

module.exports = router;
