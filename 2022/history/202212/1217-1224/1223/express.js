var http = require('http');
var server = http.createServer(function(req, res) {
  res.write("Hello world!\n");
  res.end();
}).listen(8080);

var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.send('hello world')
})

app.listen(3000)

//admin.get 
var express = require('express')

var app = express() // the main app
var admin = express() // the sub app

admin.get('/', function (req, res) {
   console.log(admin.mountpath) // /admin
   res.send('Admin Homepage')
})

app.use('/admin', admin) // mount the sub app

//admin.on
var admin = express()

admin.on('mount', function (parent) {
   console.log('Admin Mounted')
   console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
   res.send('Admin Homepage')
})

app.use('/admin', admin)

var http = require('http');
var server = http.createServer(function(req, res) {
  res.write("Hello world!\n");
  res.end();
}).listen(8080);

//
var http = require('http');
var server = http.createServer(function (req, res) {
   console.log("URL: " + req.url);
   console.log("Method: " + req.method);
   console.log("Header[Content-Type]: " + req.headers['content-type']);
   res.end();
}).listen(8080);

//
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
   var url_parse = url.parse(req.url, true);
   console.log(url_parse);
   res.end();
}).listen(8080);

var admin = express()

admin.get('/', function (req, res) {
   console.dir(admin.mountpath) // [ '/adm*n', '/manager' ]
   res.send('Admin Homepage')
})

var secret = express()
secret.get('/', function (req, res) {
   console.log(secret.mountpath) // /secr*t
   res.send('Admin Secret')
})

admin.use('/secr*t', secret) // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/adm*n', '/manager'], admin) // load the 'admin' router on '/adm*n' and '/manager', on the parent app

var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.send('hello world')
}
)

app.listen(3000)

CJS
copy
const assert = require('node:assert');

// Generate an AssertionError to compare the error message later:
const { message } = new assert.AssertionError({
   actual: 1,
   expected: 2,
   operator: 'strictEqual',
});

// Verify error output:
try {
   assert.strictEqual(1, 2);
} catch (err) {
   assert(err instanceof assert.AssertionError);
   assert.strictEqual(err.message, message);
   assert.strictEqual(err.name, 'AssertionError');
   assert.strictEqual(err.actual, 1);
   assert.strictEqual(err.expected, 2);
   assert.strictEqual(err.code, 'ERR_ASSERTION');
   assert.strictEqual(err.operator, 'strictEqual');
   assert.strictEqual(err.generatedMessage, true);
}


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: '*/*' }));

app.post('/', function (req, res) {
   console.log(req.body);
   res.end();
});
app.listen(8080);
//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/', function (req, res) {
   for (key in req.body) {
      console.log(key, '=', req.body[key]);
   }
   res.end();
});
app.listen(8080);

var admin = express()

admin.on('mount', function (parent) {
   console.log('Admin Mounted')
   console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
   res.send('Admin Homepage')
})

app.use('/admin', admin)

app.get('/', function (req, res) {
   res.send('GET request to homepage')
})

app.post('/', function (req, res) {
   res.send('POST request to homepage')
}
)

app.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...')
   next() // pass control to the next handler
}
)

app.get('/secret', function (req, res, next) {
   res.send('GET request to the secret section')
}
)

app.post('/secret', function (req, res, next) {
   res.send('POST request to the secret section')
}
)

app.get('/example/a', function (req, res) {
   res.send('Hello from A!')
}
)

//var express = require('express')
var https = require('https')
var http = require('http')
var app = express()

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

var express = require('express')
var app = express()

app.param('user', function (req, res, next, id) {
   // try to get the user details from the User model and attach it to the request object
   User.find(id, function (err, user) {
      if (err) {
         next(err)
      } else if (user) {
         req.user = user
         next()
      } else {
         next(new Error('failed to load user'))
      }
   })
})

app.get('/user/:user', function (req, res, next) {
   res.send('user ' + req.user.name)
}
)

app.get('/user/:user', function (req, res, next) {
   res.send('user ' + req.user.name)
}
)

app.param('user', function (req, res, next, id) {
   // try to get the user details from the User model and attach it to the request object
   User.find(id, function (err, user) {
      if (err) {
         next(err)
      } else if (user) {
         req.user = user
         next()
      } else {
         next(new Error('failed to load user'))
      }
   })
})

app.get('/user/:user', function (req, res, next) {
   res.send('user ' + req.user.name)
}
)

app.get('/user/:user', function (req, res, next) {
   res.send('user ' + req.user.name)
}
)

app.param('user', function (req, res, next, id) {
   // try to get the user details from the User model and attach it to the request object
   User.find(id, function (err, user) {
      if (err) {
         next(err)
      } else if (user) {
         req.user = user
         next()
      } else {
         next(new Error('failed to load user'))
      }
   })
}
)

