const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /index
router.get('/', (req, res, next) => {
    return res.render('index.html', { title: 'index' });
  });


  module.exports = router;