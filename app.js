const express = require('express')

const passwordHash = require('password-hash')
const passport = require('passport');
const JSONStrategy = require('passport-json').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const MongoClient = require('mongodb').MongoClient;

const app = express()

const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const port = process.env.WEB_PORT || 3000
const dbName = process.env.DB_NAME || 'pm'
const userCollection = process.env.USER_COLLECTION || 'user'
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'

var argv = require('minimist')(process.argv.slice(2));

var mongodb = null;

passport.use(new JSONStrategy((user, password, cb) => {
  var db = mongodb.db(dbName);
  var collection = db.collection(userCollection);
  collection.findOne({'user':user})
  .then(user => {
    if(!user) {
      return cb(null, false, {message: 'Invalid User'});
    }
    if(passwordHash.verify(password, user.password)) {
      return cb(null, user, {message: 'Logged In Successfully'});
    }
    return cb(null, false, {message: 'Invalid Password'});
  })
  .catch(err => cb(err));
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey   : jwtSecret
}, (jwtPayload, cb) => {
  try {
    return cb(null,jwtPayload.user);
  } catch(err) {
    cb(err);
  }
}));

const ensureLogin_jwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req,res,next);
};

const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


app.use(require("webpack-hot-middleware")(compiler,{
  path: '/__webpack_hmr'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));

app.param('db', function(req, res, next, value) {
  req.db = mongodb.db(value);
  next();
});

app.param('collection', function(req, res, next, value) {
  req.collection = req.db.collection(value);
  next();
});

app.use('/auth',require('./auth'));
app.use('/db/:db/:collection', ensureLogin_jwt, require('./db_adapters/mongodb'));

MongoClient.connect(argv.mongodb_url, { useNewUrlParser: true }, (err, client) => {
  if(!err) {
    mongodb = client;
    app.listen(port, function() {
      console.log('Server listening on port %d', port);
    });
  } else {
    throw new Error(err);
  }
})
