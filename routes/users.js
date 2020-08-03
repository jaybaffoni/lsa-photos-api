var express = require('express');
var router = express.Router();

//Sign In
router.get('/', function(req, res, next) {
  res.send('sign in');
});

//Register
router.post('/', function(req, res, next) {
  res.send('register');
});

//Change Password
router.put('/password', function(req, res, next) {
  res.send('change pw');
});

//Change Email
router.put('/email', function(req, res, next) {
  res.send('change email');
});

//Change Name
router.put('/name', function(req, res, next) {
  res.send('change name');
});

//Toggle Hidden
router.put('/hidden', function(req, res, next) {
  res.send('toggle hidden content');
});

//Get User Prefs
router.get('/prefs', function(req, res, next) {
  res.send('get user prefs');
});

module.exports = router;
