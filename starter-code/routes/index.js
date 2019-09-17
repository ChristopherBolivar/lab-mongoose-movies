const express = require('express');
const router  = express.Router();
const celebs = require('../models/celebModel')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
