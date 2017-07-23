var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var chain = require('../helloblockchain.js');

//hardcoded list of roles will need to be changed to get from the database
var roles = [
  {
    id:"abcd",
    returns:"Queries A",
    message:"Querying A in the Blockchain"
  },
  {
    id:"efgh",
    returns:"Queries B",
    message:"Querying B in the Blockchain"
  },
  {
    id:"ijkl",
    returns:"Transfer A to B",
    message:"Transfering from A to B in the Blockchain"
  },
  {
    id:"mnop",
    returns:"Transfer B to A",
    message:"Transfering from B to A in the Blockchain"
  }
];

var authenticated = function(req, res, next){
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
      return next();
  }
  // if they aren't send back the message and error code
  res.send({message:"Not logged in", status:403});
}

var redirectUser = function(path, res, $window){
  res.redirect(path); //use response redirect to redirect the user to a differnet page
}

router.get('/authenticated', authenticated, function(req, res){
  res.send(req.user); //made it through middleware which means use is logged in now send back
});

router.post('/login', function(req, res, next) {
  //passport called in the config folder it calls serializeUser and then nextTick
  //sends back the error if any and then the user along with any messages
    passport.authenticate('local-login', function(err, user, info) {
        req.logIn(user, function(err) { //logs the user in with function from the passport library
            if (err) {
                return next(err);
            }
            return res.send(user);
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout(); //passport function to deserialize user and remove them from the session
  redirectUser("/#/login", res); //call function to send user to a different page
});

//gets the current user using the req.user object
router.get('/user', authenticated, function(req, res){
  res.send(req.user);
});

/* HARDCODED RETURNS A GENERIC LIST OF ROLES BUT WE WOULD GET THESE FROM THE DB */
router.get('/get/roles', authenticated, function(req, res){
  res.send(roles);
});

router.get('/role/:id', authenticated, function(req, res){
  for (var i = 0; i < roles.length; i++) {
    if(req.params.id == roles[i].id){
      res.send(roles[i]);
    }
  }
});

router.get('/query/chain/:id', authenticated, function(req, res){

});


module.exports = router;
