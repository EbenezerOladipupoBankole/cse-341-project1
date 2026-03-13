const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello World');
});

router.use('/contacts', require('./contacts'));

module.exports = router;