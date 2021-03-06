var express = require('express');
var proxy = require('simple-http-proxy');

module.exports = function(user, pass) {
  var app = express();

  user = user || process.env.PROXY_USERNAME;
  pass = pass || process.env.PROXY_PASSWORD;

  var auth = express.basicAuth(user, pass);

  app.use(function(req, res, next) {
    var orig = req.headers.authorization;
    req.headers.authorization = req.headers['x-fproxy-authorization'] || orig;

    auth(req, res, function() {
      req.headers.authorization = orig;
      delete req.headers['x-fproxy-authorization'];
      next.apply(null, arguments);
    });
  });

  app.use(function(req, res, next) {
    var host = req.headers['x-fproxy-host'];
    if (!host) return res.send(400);

    var proto = req.headers['x-forwarded-proto'] || 'http';
    req.headers.host = '';
    delete req.headers['x-forwarded-proto'];
    proxy(proto + '://' + host, {timeout: false})(req, res, next);
  });

  return app;
};
