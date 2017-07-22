var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');

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
  var roles = [
    {
      id:"abcd",
      returns:"Queries A"
    },
    {
      id:"efgh",
      returns:"Queries B"
    },
    {
      id:"ijkl",
      returns:"Transfer A to B"
    },
    {
      id:"mnop",
      returns:"Transfer B to A"
    }
  ];
  res.send(roles);
});


module.exports = router;
