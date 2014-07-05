fproxy-server
=============

A simple forward proxy run on heroku

Installation
------------

```sh
$ npm install --save camshaft/fproxy-server
```

Usage
-----

```js
var proxy = require('fproxy-server');

var app = module.exports = proxy('my-username', 'my-password');
```

This is a plain HTTP/HTTPS forward server with the exception of the `host` header. Heroku uses this header to route to the different applications so it cannot be used. The `x-fproxy-host` header is used instead. If a client does not support the `x-fproxy-host` header try pairing the setup with [fproxy-client](https://github.com/camshaft/fproxy-client).
