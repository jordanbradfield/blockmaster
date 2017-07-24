var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var chain = require('../helloblockchain.js');
var util = require('util');
var exec = require('child_process').exec;

//init out chaincode and deployment
chain.init();

//hardcoded list of roles will need to be changed to get from the database
var roles = [{
    name:"Button1",
    args:["David"]
  },
  {
      name:"Button2",
      args:["Java"]
    },
    {
        name:"Button3",
        args:["Angular"]
      }

];

var authenticated = function(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't send back the message and error code
  res.send({
    message: "Not logged in",
    status: 403
  });
}

var redirectUser = function(path, res, $window) {
  res.redirect(path); //use response redirect to redirect the user to a differnet page
}

router.get('/authenticated', authenticated, function(req, res) {
  res.send(req.user); //made it through middleware which means use is logged in now send back
});

router.post('/login', function(req, res, next) {
  var creds = req.body;
  chain.queryLogin(req, res, creds.args, next);
});

router.get('/logout', function(req, res) {
  req.logout(); //passport function to deserialize user and remove them from the session
  redirectUser("/#/login", res); //call function to send user to a different page
});

//gets the current user using the req.user object
router.get('/user', authenticated, function(req, res) {
  res.send(req.user);
});

/* HARDCODED RETURNS A GENERIC LIST OF ROLES BUT WE WOULD GET THESE FROM THE DB */
router.get('/get/roles', authenticated, function(req, res) {
  res.send(roles);
});

router.get('/role/:id', authenticated, function(req, res) {
  for (var i = 0; i < roles.length; i++) {
    if (req.params.id == roles[i].name) {
      res.send(roles[i]);
    }
  }
});

router.get('/query/chain/:id', authenticated, function(req, res) {
  var args = [req.params.id];
  chain.query(res, args);
});


module.exports = router;
