var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var Verify = require('./verify');
/* GET users listing. */


router.route('/').get(Verify.verifyAdmin, function (req, res, next) {
  //res.send('respond with a resource');
  User.find({}, function (err, uu) {
    if (err) throw err;
    res.json(uu);
  });

});

router.get('/coo', function (req, res) {
  console.log(req.secure);
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  //console.log(cookie);
  //res.cookie('cookieName', token, { maxAge: 900000, httpOnly: true });
  res.end();

});

router.post('/register', function (req, res) {
  console.log(req.body);
  User.register(new User({
    firstname: req.body.firstName, lastName: req.body.lastName, username: req.body.firstName //+ req.body.lastName
    , createdBy: req.body.createdBy, modifiedBy: req.body.modifiedBy, role: req.body.role
  }), req.body.password,
    function (err, user) {
      if (err) {
        return res.status(500).json({ err: err });
      }
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({ status: 'Registration Successful!' });
      });
    });
});
router.post('/login', function (req, res, next) {
  console.log(req.secure);
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      //console.log(token);  , secure:true 
      res.cookie('cookieName', token, { maxAge: 900000, httpOnly: true });
      res.status(200).json({
        status: 'Login successful!',
        role: user.role,
        name: user.username,
        success: true,
        token: token
      });
    });
  })(req, res, next);
});
router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});
module.exports = router;
