const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'

router.post('/login', function (req, res, next) {
  passport.authenticate('json', {session: false}, (err, user, info) => {
    if(err || !user) {
      return res.status(400).json({
        message: info.message,
        user : user
      });
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, jwtSecret);
      return res.json({user, token});
    });
 })(req, res);
});

module.exports = router;
