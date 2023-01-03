//requireとは、モジュールを読み込むための関数
//expressとは、Webアプリケーションフレームワーク
const express = require('express');
//appとは、expressのインスタンス
const app = express();
//pathとは、ファイルパスを扱うためのモジュール
const path = require('path');
//body-parserとは、リクエストのbodyをパースするためのモジュール
const bodyParser = require('body-parser');
//cookie-parserとは、クッキーをパースするためのモジュール
const cookieParser = require('cookie-parser');
//morganとは、リクエストのログを出力するためのモジュール
const morgan = require('morgan');
//corsとは、クロスオリジンリソース共有を許可するためのモジュール
const cors = require('cors');
//mongooseとは、MongoDBを操作するためのモジュール
const mongoose = require('mongoose');
//passportとは、認証を行うためのモジュール
const passport = require('passport');
//passport-jwtとは、JWTを使用した認証を行うためのモジュール
const passportJWT = require('passport-jwt');
//jwtとは、JWTを生成するためのモジュール
const jwt = require('jsonwebtoken');
//configとは、設定ファイルを扱うためのモジュール
const config = require('./config');
//Userとは、ユーザー情報を扱うためのモデル
const User = require('./models/user');
//listenとは、サーバーを起動するための関数
app.listen = function () {
   var server = http.createServer(this)
   return server.listen.apply(server, arguments)
}

//app.getとは、GETリクエストを受け取るための関数
app.get(path, callback[ callback ...])
//app.postとは、POSTリクエストを受け取るための関数
app.post(path, callback[ callback ...])
//app.deleteとは、DELETEリクエストを受け取るための関数
app.delete('/', function (req, res) {
   res.send('DELETE request to homepage')
})
//app.putとは、PUTリクエストを受け取るための関数
app.put('/', function (req, res) {
   res.send('PUT request to homepage')
}
)
//app.allとは、全てのリクエストを受け取るための関数
app.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...')
   next() // pass control to the next handler
})
//app.onとは、イベントを受け取るための関数
app.on('mount', function (parent) {
   console.log('Admin Mounted')
   console.log(parent) // refers to the parent app
}
)
var admin = express()

admin.on('mount', function (parent) {
   console.log('Admin Mounted')
   console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
   res.send('Admin Homepage')
})

app.use('/admin', admin)

//app.localsとは、ローカル変数を設定するための関数
app.locals.title = 'My App'
app.locals.strftime = require('strftime')
app.locals.email = 'me@myapp.com'

//admin.mountpathとは、ミドルウェアのパスを取得するための関数
admin.mountpath // /admin
var express = require('express')

var app = express() // the main app
var admin = express() // the sub app

admin.get('/', function (req, res) {
   console.log(admin.mountpath) // /admin
   res.send('Admin Homepage')
})

app.use('/admin', admin)

//express.Routerとは、ルーティングを行うための関数
var express = require('express')
var router = express.Router()

//express.staticとは、静的ファイルを提供するための関数
var options = {
   dotfiles: 'ignore',
   etag: false,
   extensions: ['htm', 'html'],
   index: false,
   maxAge: '1d',
   redirect: false,
   setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
   }
}

app.use(express.static('public', options))

//express.text([options])とは、テキストをパースするための関数
var express = require('express')

//express.urlencoded([options])とは、URLエンコードされたデータをパースするための関数
var express = require('express')
express.urlencoded([options])

//express.json([options])とは、JSONをパースするための関数
var express = require('express')
express.json([options])

//app.mountpathとは、ミドルウェアのパスを取得するための関数
app.mountpath // undefined
var express = require('express')

//app.all(path, callback [, callback ...])とは、全てのリクエストを受け取るための関数
app.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...')
   next() // pass control to the next handler
}
)

//app.disable(name)とは、設定を無効にするための関数
app.disable('x-powered-by')

//app.delete(path, callback [, callback ...])とは、DELETEリクエストを受け取るための関数
app.delete('/', function (req, res) {
   res.send('DELETE request to homepage')
}
)

//app.disabled(name)とは、設定が無効かどうかを確認するための関数
app.disabled('trust proxy')
// => true

app.enable('trust proxy')
app.disabled('trust proxy')

//app.engine(ext, callback)とは、テンプレートエンジンを設定するための関数
app.engine('html', require('ejs').renderFile)

//app.enable(name)とは、設定を有効にするための関数
app.enable('trust proxy')

//app.enabled(name)とは、設定が有効かどうかを確認するための関数
app.enabled('trust proxy')
// => false

app.enable('trust proxy')
app.enabled('trust proxy')

//app.get(name)とは、設定を取得するための関数
app.get('env')
app.get('title')
// => undefined

app.set('title', 'My Site')
app.get('title')
// => "My Site"

//app.get(path, callback [, callback ...])とは、GETリクエストを受け取るための関数
app.get('/', function (req, res) {
   res.send('GET request to homepage')
}
)

//app.listen([port [, host [, backlog]]][, callback])とは、サーバーを起動するための関数
app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
}
)

//app.listen([port[, host[, backlog]]][, callback])
app.listen(3000, '   ', function () {
   console.log('Example app listening on port 3000!')
}
)
var express = require('express')
var https = require('https')
var http = require('http')
var app = express()

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

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

app.param('id', function (req, res, next, id) {
   console.log('CALLED ONLY ONCE')
   next()
})

app.get('/user/:id', function (req, res, next) {
   console.log('although this matches')
   next()
})

app.get('/user/:id', function (req, res) {
   console.log('and this matches too')
   res.end()
})

//app.patch(path, callback [, callback ...])とは、PATCHリクエストを受け取るための関数
app.patch('/', function (req, res) {
   res.send('PATCH request to homepage')
}
)

//app.path()とは、現在のパスを取得するための関数
var app = express()
var blog = express()
var blogAdmin = express()

app.use('/blog', blog)
blog.use('/admin', blogAdmin)

console.dir(app.path()) // ''
console.dir(blog.path()) // '/blog'
console.dir(blogAdmin.path()) // '/blog/admin'

//app.put(path, callback [, callback ...])
app.put('/', function (req, res) {
   res.send('PUT request to homepage')
}
)

//app.route(path)とは、ルートのパスを取得するための関数
var app = express()

app.route('/events')
   .all(function (req, res, next) {
      // runs for all HTTP verbs first
      // think of it as route specific middleware!
   })
   .get(function (req, res, next) {
      res.json({})
   })
   .post(function (req, res, next) {
      // maybe add a new event...
   })

//app.set(name, value)とは、設定を設定するための関数
app.set('title', 'My Site')
app.get('title') 
// => "My Site"
app.set('etag', function (body, encoding) {
   return generateHash(body, encoding) // consider the function is defined
})

//app.use([path,] callback [, callback...])とは、ミドルウェアを設定するための関数
app.use(function (req, res, next) {
   console.log('Time: %d', Date.now())
   next()
})

app.use('/user/:id', function (req, res, next) {
   console.log('Request Type:', req.method)
   next()
}
)

app.use(function (err, req, res, next) {
   console.error(err.stack)
   res.status(500).send('Something broke!')
})

app.use('/user/:id', function (req, res, next) {
   console.log('Request URL:', req.original)
   next()
}
)

app.use(function (req, res, next) {
   next()
})

var r1 = express.Router()
r1.get('/', function (req, res, next) {
   next()
})

var r2 = express.Router()
r2.get('/', function (req, res, next) {
   next()
})

app.use([r1, r2])

//app.get(path, callback [, callback ...])とは、GETリクエストを受け取るための関数
app.get('/user/:id', function (req, res) {
   res.send('user ' + req.params.id)
})

app.get('/user/:id', function (req, res, next) {
   if (req.params.id == 0) next('route')
   // otherwise pass control to the next middleware function in this stack
   else next()
}
)

//req.appとは、Expressアプリケーションを取得するためのプロパティ
// index.js
app.get('/viewdirectory', require('./mymiddleware.js'))
var app = express()
app.get('/', function (req, res) {
   res.send(req.app.locals.title)
}
)

// mymiddleware.js
module.exports = function (req, res) {
   res.send('The views directory is ' + req.app.get('views'))
}

//req.baseUrlとは、ベースURLを取得するためのプロパティ
var greet = express.Router()

greet.get('/jp', function (req, res) {
   console.log(req.baseUrl) // /greet
   res.send('Konichiwa!')
})

app.use('/greet', greet) // load the router on '/greet'

//req.bodyとは、POSTリクエストのボディを取得するためのプロパティ
var express = require('express')
var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/', function (req, res) {
   res.send('welcome, ' + req.body.username)
}
)

//app.use(['/gre+t', '/hel{2}o'], greet) // load the router on '/gre+t' and '/hel{2}o'
app.use('/greet', greet) // load the router on '/greet'

var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
   console.log(req.body)
   res.json(req.body)
})

app.listen(3000)

//req.cookiesとは、クッキーを取得するためのプロパティ
var express = require('express')
// Cookie: name=tj
console.dir(req.cookies.name)

//req.freshとは、リクエストがキャッシュされているかどうかを判定するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.fresh)

//req.hostnameとは、ホスト名を取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.hostname)

//req.ipとは、リクエストのIPアドレスを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.ip)

//req.ipsとは、リクエストのIPアドレスを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.ips)

//req.methodとは、リクエストのメソッドを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.method)

//req.originalUrlとは、リクエストのオリジナルURLを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.originalUrl)

app.use('/admin', function (req, res, next) { // GET 'http://www.example.com/admin/new?sort=desc'
   console.dir(req.originalUrl) // '/admin/new?sort=desc'
   console.dir(req.baseUrl) // '/admin'
   console.dir(req.path) // '/new'
   next()
})

//req.paramsとは、パスパラメータを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.params)
// GET /file/javascripts/jquery.js
console.dir(req.params[0])

//req.pathとは、リクエストのパスを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.path)

//req.protocol
var express = require('express')
var app = express()
console.dir(req.protocol)

//req.queryとは、クエリパラメータを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.query)

var qs = require('qs')
app.setting('query parser', function (str) {
   return qs.parse(str, { /* custom options */ })
})

//req.routeとは、現在のルートを取得するためのプロパティ
app.get('/user/:id?', function userIdHandler(req, res) {
   console.log(req.route)
   res.send('GET')
})

//req.secureとは、リクエストが安全かどうかを判定するためのプロパティ
console.dir(req.protocol === 'https')
// => true

//req.signedCookiesとは、署名されたクッキーを取得するためのプロパティ
var express = require('express')
var app = express()
console.dir(req.signedCookies)
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
console.dir(req.signedCookies.user)

//req.staleとは、リクエストがキャッシュされているかどうかを判定するためのプロパティ
console.dir(req.stale)
// => false

//req.subdomainsとは、サブドメインを取得するためのプロパティ
// Host: "tobi.ferrets.example.com"
console.dir(req.subdomains)
// => ['ferrets', 'tobi']

//req.xhrとは、リクエストがXMLHttpRequestかどうかを判定するためのプロパティ
console.dir(req.xhr)
// => true

//req.accepts(types)とは、リクエストが指定されたMIMEタイプを受け入れ可能かどうかを判定するためのメソッド
// Accept: text/html
req.accepts('html')
// => "html"

// Accept: text/*, application/json
req.accepts('html')
// => "html"
req.accepts('text/html')
// => "text/html"
req.accepts(['json', 'text'])
// => "json"
req.accepts('application/json')
// => "application/json"

// Accept: text/*, application/json
req.accepts('image/png')
req.accepts('png')
// => false

// Accept: text/*;q=.5, application/json
req.accepts(['html', 'json'])
// => "json"

//req.acceptsCharsets(charset [, ...])とは、リクエストが指定された文字セットを受け入れ可能かどうかを判定するためのメソッド

//req.get(field)とは、リクエストヘッダーを取得するためのメソッド
req.get('Content-Type')
// => "text/plain"

req.get('content-type')
// => "text/plain"

req.get('Something')
// => undefined

//req.is(type)とは、リクエストが指定されたMIMEタイプかどうかを判定するためのメソッド
// With Content-Type: text/html; charset=utf-8
req.is('html')
// => 'html'
req.is('text/html')
// => 'text/html'
req.is('text/*')
// => 'text/*'

// When Content-Type is application/json
req.is('json')
// => 'json'
req.is('application/json')
// => 'application/json'
req.is('application/*')
// => 'application/*'

req.is('html')
// => false

//req.param(name [, default])とは、リクエストパラメータを取得するためのメソッド
// GET /search?q=tobi+ferret
req.param('q')

//req.range(size[, options])とは、リクエストが指定された範囲を受け入れ可能かどうかを判定するためのメソッド
// parse header from request
var range = req.range(1000)

// the type of the range
if (range.type === 'bytes') {
   // the ranges
   range.forEach(function (r) {
      // do something with r.start and r.end
   })
}

app.get('/user/:id', function (req, res) {
   res.send('user ' + req.params.id)
})

//res.headersSentとは、レスポンスヘッダーが送信されたかどうかを判定するためのプロパティ
app.get('/', function (req, res) {
   console.dir(res.headersSent) // false
   res.send('OK')
   console.dir(res.headersSent) // true
})

//res.localsとは、レスポンスローカル変数を取得するためのプロパティ
app.use(function (req, res, next) {
   res.locals.user = req.user
   next()
}
)

//res.append(field [, value])とは、レスポンスヘッダーを追加するためのメソッド
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
app.use(function (req, res, next) {
   // Make `user` and `authenticated` available in templates
   res.locals.user = req.user
   res.locals.authenticated = !req.user.anonymous
   next()
})

//res.append(field[, value])とは、レスポンスヘッダーを追加するためのメソッド
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
res.append('Warning', '199 Miscellaneous warning')

//res.attachment([filename])とは、レスポンスを添付ファイルとして送信するためのメソッド
res.attachment()
// Content-Disposition: attachment

res.attachment('path/to/logo.png')

//res.cookie(name, value [, options])とは、レスポンスにクッキーを送信するためのメソッド
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })

res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })

// Default encoding
res.cookie('some_cross_domain_cookie', 'http://mysubdomain.example.com', { domain: 'example.com' })
// Result: 'some_cross_domain_cookie=http%3A%2F%2Fmysubdomain.example.com; Domain=example.com; Path=/'

// Custom encoding
res.cookie('some_cross_domain_cookie', 'http://mysubdomain.example.com', { domain: 'example.com', encode: String })
// Result: 'some_cross_domain_cookie=http://mysubdomain.example.com; Domain=example.com; Path=/;'

//res.clearCookie(name [, options])とは、レスポンスにクッキーを削除するためのメソッド
res.clearCookie('name', { path: '/admin' })

//res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })とは、レスポンスにクッキーを送信するためのメソッド
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })

res.cookie('cart', { items: [1, 2, 3] })
res.cookie('cart', { items: [1, 2, 3] }, { maxAge: 900000 })

//res.download(path [, filename] [, options] [, fn])とは、レスポンスをダウンロードするためのメソッド
res.download('/report-12345.pdf')
res.download('/report-12345.pdf', 'report.pdf')
res.download('/report-12345.pdf', 'report.pdf', function (err) {
   if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
   } else {
      // decrement a download credit, etc.
   }
}
)

//res.clearCookie(name [, options])とは、レスポンスにクッキーを削除するためのメソッド
res.clearCookie('name', { path: '/admin' })

res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
   if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
   } else {
      // decrement a download credit, etc.
   }
})

//res.end([data] [, encoding])とは、レスポンスを終了するためのメソッド
res.end()
res.end()
res.status(404).end()

//res.format(object)とは、レスポンスをフォーマットするためのメソッド
res.format({
   'text/plain': function () {
      res.send('hey')
   }
   , 'text/html': function () {
      res.send('<p>hey</p>')
   }
   , 'application/json': function () {
      res.send({ message: 'hey' })
   }
   , 'default': function () {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable')
   }
})

//res.get(field)とは、レスポンスヘッダーを取得するためのメソッド
res.get('Content-Type')
// => "text/plain"

//res.json([body])とは、レスポンスをJSON形式で送信するためのメソッド
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })

//res.jsonp([body])とは、レスポンスをJSONP形式で送信するためのメソッド
res.jsonp(null)
// => callback(null)

res.jsonp({ user: 'tobi' })
// => callback({ "user": "tobi" })

res.status(500).jsonp({ error: 'message' })
// => callback({ "error": "message" })

//res.links(links)とは、レスポンスにリンクヘッダーを送信するためのメソッド
res.links({
   next: 'http://api.example.com/users?page=2'
   , last: 'http://api.example.com/users?page=5'
})

//res.location(path)とは、レスポンスにLocationヘッダーを送信するためのメソッド
res.location('/foo/bar')
res.location('http://example.com')
res.location('../login')

//res.redirect([status,] path)とは、レスポンスをリダイレクトするためのメソッド
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')

//res.renderとは、レスポンスをレンダリングするためのメソッド
res.render('user', { name: 'Tobi' })
// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function (err, html) {
   res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function (err, html) {
   // ...
})

//res.send([body])とは、レスポンスを送信するためのメソッド
res.send(Buffer.from('whoop'))
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(404).send('Sorry, we cannot find that!')
res.status(500).send({ error: 'something blew up' })

//res.sendFileとは、レスポンスをファイルとして送信するためのメソッド
app.get('/file/:name', function (req, res, next) {
   var options = {
      root: path.join(__dirname, 'public'),
      dotfiles: 'deny',
      headers: {
         'x-timestamp': Date.now(),
         'x-sent': true
      }
   }

   var fileName = req.params.name
   res.sendFile(fileName, options, function (err) {
      if (err) {
         next(err)
      } else {
         console.log('Sent:', fileName)
      }
   })
})

app.get('/user/:uid/photos/:file', function (req, res) {
   var uid = req.params.uid
   var file = req.params.file

   req.user.mayViewFilesFrom(uid, function (yes) {
      if (yes) {
         res.sendFile('/uploads/' + uid + '/' + file)
      } else {
         res.status(403).send("Sorry! You can't see that.")
      }
   })
})

//res.sendStatus(statusCode)とは、レスポンスをステータスコードと共に送信するためのメソッド
res.sendStatus(200) // equivalent to res.status(200).send('OK')

//res.set(field [, value])とは、レスポンスヘッダーを設定するためのメソッド
res.set('Content-Type', 'text/plain')
res.set({
   'Content-Type': 'text/plain',
   'Content-Length': '123',
   ETag: '12345'
})

//res.status(code)とは、レスポンスのステータスコードを設定するためのメソッド
res.status(403).end()
res.status(400).send('Bad Request')
res.status(404).sendFile('/absolute/path/to/404.png')

//res.type(type)とは、レスポンスのContent-Typeヘッダーを設定するためのメソッド
res.type('.html')
// => 'text/html'
res.type('html')
// => 'text/html'
res.type('json')
// => 'application/json'
res.type('application/json')
// => 'application/json'
res.type('png')
// => 'image/png'

//res.vary(field)とは、レスポンスのVaryヘッダーを設定するためのメソッド
res.vary('User-Agent').render('docs')

router.use(function (req, res, next) {
   // .. some logic here .. like any other middleware
   next()
})

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function (req, res, next) {
   // ..
})

//router.all(path, [callback, ...] callback)とは、指定したパスに対するすべてのHTTPメソッドに対してルーティングを行うためのメソッド
router.all('*', requireAuthentication, loadUser)

//router.METHOD(path, [callback, ...] callback)とは、指定したパスに対する指定したHTTPメソッドに対してルーティングを行うためのメソッド
router.get('/', function (req, res, next) {
   // ..
}
)
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
   var from = req.params[0]
   var to = req.params[1] || 'HEAD'
   res.send('commit range ' + from + '..' + to)
})


//router.param(name, callback)とは、指定したパラメータに対してルーティングを行うためのメソッド
router.param('user', function (req, res, next, id) {
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

router.param('user', function (req, res, next, id) {
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


var express = require('express')
var app = express()
var router = express.Router()

// customizing the behavior of router.param()
router.param(function (param, option) {
   return function (req, res, next, val) {
      if (val === option) {
         next()
      } else {
         res.sendStatus(403)
      }
   }
})

// using the customized router.param()
router.param('id', '1337')

// route to trigger the capture
router.get('/user/:id', function (req, res) {
   res.send('OK')
})

app.use(router)

app.listen(3000, function () {
   console.log('Ready')
})

//router.route(path)とは、指定したパスに対するすべてのHTTPメソッドに対してルーティングを行うためのメソッド
router.route('/book')
   .get(function (req, res) {
      res.send('Get a random book')
   }
)
  
router.param(function (param, validator) {
   return function (req, res, next, val) {
      if (validator(val)) {
         next()
      } else {
         res.sendStatus(403)
      }
   }
})

router.param('id', function (candidate) {
   return !isNaN(parseFloat(candidate)) && isFinite(candidate)
})

//router.route(path)とは、指定したパスに対するすべてのHTTPメソッドに対してルーティングを行うためのメソッド

router.param('user_id', function (req, res, next, id) {
   // sample user, would actually fetch from DB, etc...
   req.user = {
      id: id,
      name: 'TJ'
   }
   next()
})

router.route('/users/:user_id')
   .all(function (req, res, next) {
      // runs for all HTTP verbs first
      // think of it as route specific middleware!
      next()
   })
   .get(function (req, res, next) {
      res.json(req.user)
   })
   .put(function (req, res, next) {
      // just an example of maybe updating the user
      req.user.name = req.params.name
      // save user ... etc
      res.json(req.user)
   })
   .post(function (req, res, next) {
      next(new Error('not implemented'))
   })
   .delete(function (req, res, next) {
      next(new Error('not implemented'))
   })

//router.use([path], [function, ...] function)とは、指定したパスに対してルーティングを行うためのメソッド

var express = require('express')
var app = express()
var router = express.Router()

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
   console.log('%s %s %s', req.method, req.url, req.path)
   next()
})

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function (req, res, next) {
   // ... maybe some additional /bar logging ...
   next()
})

// always invoked
router.use(function (req, res, next) {
   res.send('Hello World')
})

app.use('/foo', router)

app.listen(3000)

var authRouter = express.Router()
var openRouter = express.Router()

authRouter.use(require('./authenticate').basic(usersdb))

authRouter.get('/:user_id/edit', function (req, res, next) {
   // ... Edit user UI ...
})
openRouter.get('/', function (req, res, next) {
   // ... List users ...
})
openRouter.get('/:user_id', function (req, res, next) {
   // ... View user ...
})

app.use('/users', authRouter)
app.use('/users', openRouter)

//express.raw([options])とは、リクエストのbodyをBufferオブジェクトとして取得するためのミドルウェア
var express = require('express')
var app = express()

//express.Router([options])とは、ルーティングを行うためのミドルウェア
var router = express.Router([options])

//express.static(root, [options])とは、静的ファイルを提供するためのミドルウェア
var options = {
   dotfiles: 'ignore',
   etag: false,
   extensions: ['htm', 'html'],
   index: false,
   maxAge: '1d',
   redirect: false,
   setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
   }
}

app.use(express.static('public', options))

//express.text([options])とは、リクエストのbodyを文字列として取得するためのミドルウェア
var express = require('express')

//express.urlencoded([options])とは、リクエストのbodyをURLエンコードされたデータとして取得するためのミドルウェア

var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.send('hello world')
})

app.listen(3000)

//app.localsとは、アプリケーションのローカル変数を設定するためのプロパティ
console.dir(app.locals.title)
// => 'My App'

console.dir(app.locals.email)
// => 'me@myapp.com'
app.locals.title = 'My App'
app.locals.strftime = require('strftime')
app.locals.email = 'me@myapp.com'

//app.mountpathとは、アプリケーションがマウントされたパスを取得するためのプロパティ
var express = require('express')

var app = express() // the main app
var admin = express() // the sub app

admin.get('/', function (req, res) {
   console.log(admin.mountpath) // /admin
   res.send('Admin Homepage')
})

app.use('/admin', admin) // mount the sub app

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

//app.on('mount', callback(parent))とは、アプリケーションがマウントされたときに発生するイベント
var admin = express()

admin.on('mount', function (parent) {
   console.log('Admin Mounted')
   console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
   res.send('Admin Homepage')
})

app.use('/admin', admin)

//app.all(path, callback [, callback ...])とは、指定したパスに対して全てのHTTPメソッドに対してルーティングを行うためのメソッド
app.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...')
   next() // pass control to the next handler
})
app.all('*', requireAuthentication, loadUser)

//app.delete(path, callback [, callback ...])とは、指定したパスに対してDELETEメソッドに対してルーティングを行うためのメソッド
app.delete('/user', function (req, res) {
   res.send('Delete user')
})

app.delete('/', function (req, res) {
   res.send('DELETE request to homepage')
})

//app.disable(name)とは、アプリケーションの設定を無効にするためのメソッド
app.disable('trust proxy')
app.get('trust proxy')

//app.disabled(name)とは、アプリケーションの設定が無効かどうかを判定するためのメソッド
app.disabled('trust proxy')
// => true

app.enable('trust proxy')
app.disabled('trust proxy')

//app.enable(name)とは、アプリケーションの設定を有効にするためのメソッド
app.enable('trust proxy')
app.get('trust proxy')
// => true

//app.enabled(name)とは、アプリケーションの設定が有効かどうかを判定するためのメソッド
app.enabled('trust proxy')
// => false

app.enable('trust proxy')
app.enabled('trust proxy')
// => true

//app.engine(ext, callback)とは、テンプレートエンジンを設定するためのメソッド
app.engine('pug', require('pug').__express)

var engines = require('consolidate')
app.engine('haml', engines.haml)
app.engine('html', engines.hogan)

//app.get(path, callback [, callback ...])とは、指定したパスに対してGETメソッドに対してルーティングを行うためのメソッド
app.get('/', function (req, res) {
   res.send('GET request to homepage')
}
)

//app.get(path, callback [, callback ...])とは、指定したパスに対してGETメソッドに対してルーティングを行うためのメソッド
app.get('/', function (req, res) {
   res.send('GET request to homepage')
}
)
app.get('/', function (req, res) {
   res.send('GET request to homepage')
})

//app.listen(path, [callback])とは、アプリケーションを指定したポートで起動するためのメソッド
var express = require('express')
var app = express()
app.listen('/tmp/sock')

//app.listen([port[, host[, backlog]]][, callback])とは、アプリケーションを指定したポートで起動するためのメソッド
var express = require('express')
var https = require('https')
var http = require('http')
var app = express()

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

//app.METHOD(path, callback [, callback ...])
//とは、指定したパスに対してHTTPメソッドに対してルーティングを行うためのメソッド

//app.param([name], callback)とは、パラメータを処理するためのメソッド
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

app.param('id', function (req, res, next, id) {
   console.log('CALLED ONLY ONCE')
   next()
})

app.get('/user/:id', function (req, res, next) {
   console.log('although this matches')
   next()
})

app.get('/user/:id', function (req, res) {
   console.log('and this matches too')
   res.end()
})

app.param(['id', 'page'], function (req, res, next, value) {
   console.log('CALLED ONLY ONCE with', value)
   next()
})

app.get('/user/:id/:page', function (req, res, next) {
   console.log('although this matches')
   next()
})

app.get('/user/:id/:page', function (req, res) {
   console.log('and this matches too')
   res.end()
})

var express = require('express')
var app = express()

// customizing the behavior of app.param()
app.param(function (param, option) {
   return function (req, res, next, val) {
      if (val === option) {
         next()
      } else {
         next('route')
      }
   }
})

// using the customized app.param()
app.param('id', 1337)

// route to trigger the capture
app.get('/user/:id', function (req, res) {
   res.send('OK')
})

app.listen(3000, function () {
   console.log('Ready')
})

//app.path()とは、アプリケーションのルートパスを取得するためのメソッド
var app = express()
var blog = express()
var blogAdmin = express()

app.use('/blog', blog)
blog.use('/admin', blogAdmin)

console.dir(app.path()) // ''
console.dir(blog.path()) // '/blog'
console.dir(blogAdmin.path()) // '/blog/admin'

//app.post(path, callback [, callback ...])とは、指定したパスに対してPOSTメソッドに対してルーティングを行うためのメソッド
app.post('/', function (req, res) {
   res.send('POST request to homepage')
}
)

app.post('/', function (req, res) {
   res.send('POST request to homepage')
})

//app.put(path, callback [, callback ...])とは、指定したパスに対してPUTメソッドに対してルーティングを行うためのメソッド
app.put('/', function (req, res) {
   res.send('PUT request to homepage')
}
)

app.put('/', function (req, res) {
   res.send('PUT request to homepage')
})

//app.render(view, [locals], callback)とは、テンプレートをレンダリングするためのメソッド
app.render(view, [locals], callback)

app.render('email', function (err, html) {
   // ...
})

app.render('email', { name: 'Tobi' }, function (err, html) {
   // ...
})

//app.route(path)とは、ルーティングを行うためのメソッド
var app = express()

var app = express()

app.route('/events')
   .all(function (req, res, next) {
      // runs for all HTTP verbs first
      // think of it as route specific middleware!
   })
   .get(function (req, res, next) {
      res.json({})
   })
   .post(function (req, res, next) {
      // maybe add a new event...
   })

//app.set(name, value)とは、アプリケーションの設定を行うためのメソッド
app.set('title', 'My Site')
app.get('title') 

//app.use([path,] callback [, callback...])とは、アプリケーションにミドルウェアを設定するためのメソッド
var express = require('express')
var app = express()

app.use(function (req, res, next) {
   console.log('Time: %d', Date.now())
   next()
})

// this middleware will not allow the request to go beyond it
app.use(function (req, res, next) {
   res.send('Hello World')
})

// requests will never reach this route
app.get('/', function (req, res) {
   res.send('Welcome')
})

app.use(function (err, req, res, next) {
   console.error(err.stack)
   res.status(500).send('Something broke!')
})

//app.use([path,] function [, function...])とは、アプリケーションにミドルウェアを設定するためのメソッド
var express = require('express')

var router = express.Router()
router.get('/', function (req, res, next) {
   next()
})
app.use(router)

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger())

app.get('/user/:id', function (req, res) {
   res.send('user ' + req.params.id)
})

app.get('/user/:id', function (request, response) {
   response.send('user ' + request.params.id)
})

//req.appとは、リクエストを処理しているアプリケーションを取得するためのプロパティ
module.exports = function (req, res) {
   res.send('The views directory is ' + req.app.get('views'))
}

//req.baseUrlとは、リクエストのベースURLを取得するためのプロパティ
var greet = express.Router()

greet.get('/jp', function (req, res) {
   console.log(req.baseUrl) // /greet
   res.send('Konichiwa!')
})

app.use('/greet', greet) // load the router on '/greet'

//req.bodyとは、リクエストのボディを取得するためのプロパティ
var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
   console.log(req.body)
   res.json(req.body)
})

//req.cookiesとは、リクエストのクッキーを取得するためのプロパティ
// Cookie: name=tj
console.dir(req.cookies.name)

//req.freshとは、リクエストがキャッシュされているかどうかを判定するためのプロパティ
app.get('/fresh', function (req, res) {
   res.send(req.fresh)
}
)

//req.hostnameとは、リクエストのホスト名を取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.hostname)
}
)

// Host: "example.com:3000"
console.dir(req.hostname)
// => 'example.com'

//req.ipとは、リクエストのIPアドレスを取得するためのプロパティ
console.dir(req.ip)

//req.ipsとは、リクエストのIPアドレスを取得するためのプロパティ

//req.originalUrlとは、リクエストのオリジナルURLを取得するためのプロパティ
app.get('/user/:id', function (req, res) {
   res.send(req.originalUrl)
}
)
// GET /search?q=something
console.dir(req.originalUrl)
// => '/search?q=something'

app.use('/admin', function (req, res, next) { // GET 'http://www.example.com/admin/new?sort=desc'
   console.dir(req.originalUrl) // '/admin/new?sort=desc'
   console.dir(req.baseUrl) // '/admin'
   console.dir(req.path) // '/new'
   next()
})

//req.paramsとは、リクエストのパラメータを取得するためのプロパティ
app.get('/user/:id', function (req, res) {
   res.send('user ' + req.params.id)
}
)

console.dir(req.params.name)

//req.pathとは、リクエストのパスを取得するためのプロパティ
app.get('/user/:id', function (req, res) {
   res.send('user ' + req.params.id)
}
)

console.dir(req.path)

//req.protocolとは、リクエストのプロトコルを取得するためのプロパティ

//req.queryとは、リクエストのクエリを取得するためのプロパティ
var qs = require('qs')
app.setting('query parser', function (str) {
   return qs.parse(str, { /* custom options */ })
})

app.get('/user/:id?', function userIdHandler (req, res) {
console.log(req.route)
res.send('GET')
})

//req.secureとは、リクエストが暗号化されているかどうかを判定するためのプロパティ
app.get('/secure', function (req, res) {
   res.send(req.secure)
}
)

//req.signedCookiesとは、リクエストの署名されたクッキーを取得するためのプロパティ
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
console.dir(req.signedCookies.user)
// => 'tobi'

//req.staleとは、リクエストがキャッシュされているかどうかを判定するためのプロパティ
app.get('/stale', function (req, res) {
   res.send(req.stale)
}
)

//req.staleとは、リクエストがキャッシュされているかどうかを判定するためのプロパティ

//req.subdomainsとは、リクエストのサブドメインを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.subdomains)
}
)

//req.xhrとは、リクエストがXMLHttpRequestかどうかを判定するためのプロパティ
app.get('/xhr', function (req, res) {
   res.send(req.xhr)
}
)

//req.accepts(types)とは、リクエストが指定されたMIMEタイプを受け入れ可能かどうかを判定するためのメソッド
// Accept: text/html
req.accepts('html')
// => "html"

// Accept: text/*, application/json
req.accepts('html')
// => "html"
req.accepts('text/html')
// => "text/html"
req.accepts(['json', 'text'])
// => "json"
req.accepts('application/json')
// => "application/json"

// Accept: text/*, application/json
req.accepts('image/png')
req.accepts('png')
// => false

// Accept: text/*;q=.5, application/json
req.accepts(['html', 'json'])
// => "json"

//req.acceptsCharsets(charset [, ...])とは、リクエストが指定された文字セットを受け入れ可能かどうかを判定するためのメソッド

//req.get(field)とは、リクエストのヘッダーを取得するためのメソッド
req.get('Content-Type')
// => "text/plain"

req.get('content-type')
// => "text/plain"

req.get('Something')
// => undefined

//req.is(type)とは、リクエストが指定されたMIMEタイプを受け入れ可能かどうかを判定するためのメソッド
// With Content-Type: text/html; charset=utf-8
req.is('html')
// => 'html'
req.is('text/html')
// => 'text/html'
req.is('text/*')
// => 'text/*'

// When Content-Type is application/json
req.is('json')
// => 'json'
req.is('application/json')
// => 'application/json'
req.is('application/*')
// => 'application/*'

req.is('html')
// => false

//req.param(name [, defaultValue])とは、リクエストのパラメータを取得するためのメソッド
// ?name=tobi
req.param('name')
// => "tobi"

// POST name=tobi
req.param('name')
// => "tobi"

// /user/tobi for /user/:name
req.param('name')
// => "tobi"

//req.range(size[, options])とは、リクエストの範囲を取得するためのメソッド
// parse header from request
var range = req.range(1000)

// the type of the range
if (range.type === 'bytes') {
   // the ranges
   range.forEach(function (r) {
      // do something with r.start and r.end
   })
}

//res.appとは、リクエストを処理しているExpressアプリケーションを取得するためのプロパティ
res.app.get('title')

//res.headersSentとは、レスポンスが送信されたかどうかを判定するためのプロパティ
app.get('/', function (req, res) {
   console.dir(res.headersSent) // false
   res.send('OK')
   console.dir(res.headersSent) // true
})

//res.localsとは、レスポンスのローカル変数を取得するためのプロパティ
app.use(function (req, res, next) {
   // Make `user` and `authenticated` available in templates
   res.locals.user = req.user
   res.locals.authenticated = !req.user.anonymous
   next()
})

//res.append(field [, value])とは、レスポンスのヘッダーを追加するためのメソッド
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
res.append('Warning', '199 Miscellaneous warning')

//res.attachment([filename])とは、レスポンスの添付ファイルを設定するためのメソッド
res.attachment()
// Content-Disposition: attachment

res.attachment('path/to/logo.png')
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png

//res.cookie(name, value[, options])とは、レスポンスのクッキーを設定するためのメソッド
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })

res
   .status(201)
   .cookie('access_token', 'Bearer ' + token, {
      expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
   })
   .cookie('test', 'test')
   .redirect(301, '/admin')

// Default encoding
res.cookie('some_cross_domain_cookie', 'http://mysubdomain.example.com', { domain: 'example.com' })
// Result: 'some_cross_domain_cookie=http%3A%2F%2Fmysubdomain.example.com; Domain=example.com; Path=/'

// Custom encoding
res.cookie('some_cross_domain_cookie', 'http://mysubdomain.example.com', { domain: 'example.com', encode: String })
// Result: 'some_cross_domain_cookie=http://mysubdomain.example.com; Domain=example.com; Path=/;'

//res.clearCookie(name[, options])とは、レスポンスのクッキーを削除するためのメソッド
res.cookie('cart', { items: [1, 2, 3] })
res.cookie('cart', { items: [1, 2, 3] }, { maxAge: 900000 })

//res.download(path [, filename] [, options] [, fn])とは、レスポンスの添付ファイルをダウンロードするためのメソッド
res.download('/report-12345.pdf')
// Content-Disposition: attachment; filename="report-12345.pdf"
// Content-Type: application/pdf
res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
   if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
   } else {
      // decrement a download credit, etc.
   }
})

//router.all(path, [callback, ...] callback)とは、すべてのHTTPメソッドに対してルーティングを設定するためのメソッド
router.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...')
   next() // pass control to the next handler
}
)

router.all('*', requireAuthentication)
router.all('*', loadUser)

//router.METHOD(path, [callback, ...] callback)とは、HTTPメソッドに対してルーティングを設定するためのメソッド
router.get('/', function (req, res) {
   res.send('Birds home page')
}
)

//router.param(name, callback)とは、パラメータに対してルーティングを設定するためのメソッド
router.param('user_id', function (req, res, next, id) {
   console.log('CALLED ONLY ONCE')
   next()
}
)

router.param('user', function (req, res, next, id) {
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

router.param('id', function (req, res, next, id) {
   console.log('CALLED ONLY ONCE')
   next()
})

router.get('/user/:id', function (req, res, next) {
   console.log('although this matches')
   next()
})

router.get('/user/:id', function (req, res) {
   console.log('and this matches too')
   res.end()
})

var express = require('express')
var app = express()
var router = express.Router()

// customizing the behavior of router.param()
router.param(function (param, option) {
   return function (req, res, next, val) {
      if (val === option) {
         next()
      } else {
         res.sendStatus(403)
      }
   }
})

// using the customized router.param()
router.param('id', '1337')

// route to trigger the capture
router.get('/user/:id', function (req, res) {
   res.send('OK')
})

app.use(router)

app.listen(3000, function () {
   console.log('Ready')
})

router.param(function (param, validator) {
   return function (req, res, next, val) {
      if (validator(val)) {
         next()
      } else {
         res.sendStatus(403)
      }
   }
})

router.param('id', function (candidate) {
   return !isNaN(parseFloat(candidate)) && isFinite(candidate)
})

//router.route(path)とは、ルーティングを設定するためのメソッド
var router = express.Router()

router.param('user_id', function (req, res, next, id) {
   // sample user, would actually fetch from DB, etc...
   req.user = {
      id: id,
      name: 'TJ'
   }
   next()
})

router.route('/users/:user_id')
   .all(function (req, res, next) {
      // runs for all HTTP verbs first
      // think of it as route specific middleware!
      next()
   })
   .get(function (req, res, next) {
      res.json(req.user)
   })
   .put(function (req, res, next) {
      // just an example of maybe updating the user
      req.user.name = req.params.name
      // save user ... etc
      res.json(req.user)
   })
   .post(function (req, res, next) {
      next(new Error('not implemented'))
   })
   .delete(function (req, res, next) {
      next(new Error('not implemented'))
   })

//router.use([path], [function, ...] function)とは、ルーティングを設定するためのメソッド
var express = require('express')
var app = express()
var router = express.Router()

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
   console.log('%s %s %s', req.method, req.url, req.path)
   next()
})

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function (req, res, next) {
   // ... maybe some additional /bar logging ...
   next()
})

// always invoked
router.use(function (req, res, next) {
   res.send('Hello World')
})

app.use('/foo', router)

app.listen(3000)

var logger = require('morgan')
var path = require('path')

router.use(logger())
router.use(express.static(path.join(__dirname, 'public')))
router.use(function (req, res) {
   res.send('Hello')
})

router.use(express.static(path.join(__dirname, 'public')))
router.use(logger())
router.use(function (req, res) {
   res.send('Hello')
})

router.use(express.static(path.join(__dirname, 'public')))
router.use(express.static(path.join(__dirname, 'files')))
router.use(express.static(path.join(__dirname, 'uploads')))

var authRouter = express.Router()
var openRouter = express.Router()

authRouter.use(require('./authenticate').basic(usersdb))

authRouter.get('/:user_id/edit', function (req, res, next) {
   // ... Edit user UI ...
})
openRouter.get('/', function (req, res, next) {
   // ... List users ...
})
openRouter.get('/:user_id', function (req, res, next) {
   // ... View user ...
})

app.use('/users', authRouter)
app.use('/users', openRouter)

//express.json([options])とは、JSONをパースするためのミドルウェア
var express = require('express')
var app = express()

//express.raw([options])とは、バッファをパースするためのミドルウェア

//express.Router([options])とは、ルーティングを設定するためのメソッド
var router = express.Router([options])

//express.static(root, [options])とは、静的ファイルを提供するためのミドルウェア
var express = require('express')
var app = express()

//express.text([options])とは、テキストをパースするためのミドルウェア
var options = {
   dotfiles: 'ignore',
   etag: false,
   extensions: ['htm', 'html'],
   index: false,
   maxAge: '1d',
   redirect: false,
   setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
   }
}

app.use(express.static('public', options))

var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.send('hello world')
})

app.listen(3000)

//app.localsとは、アプリケーションのローカル変数を設定するためのプロパティ
var express = require('express')
var app = express()
console.dir(app.locals.title)
// => 'My App'

console.dir(app.locals.email)
// => 'me@myapp.com'
app.locals.title = 'My App'
app.locals.strftime = require('strftime')
app.locals.email = 'me@myapp.com'

//app.mountpathとは、アプリケーションのマウントパスを取得するためのプロパティ
var express = require('express')

var app = express() // the main app
var admin = express() // the sub app

admin.get('/', function (req, res) {
   console.log(admin.mountpath) // /admin
   res.send('Admin Homepage')
})

app.use('/admin', admin) // mount the sub app

app.listen(3000)

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

//app.on('mount', callback(parent))とは、アプリケーションがマウントされたときに発生するイベント
var admin = express()

admin.on('mount', function (parent) {
   console.log('Admin Mounted')
   console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
   res.send('Admin Homepage')
})

app.use('/admin', admin)

//app.all(path, callback [, callback ...])とは、指定したパスに対するすべてのHTTPメソッドに対してコールバックを実行するためのメソッド
app.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...')
   next() // pass control to the next handler
})

app.all('*', requireAuthentication)
app.all('*', loadUser)

//app.delete(path, callback [, callback ...])とは、指定したパスに対するDELETEメソッドに対してコールバックを実行するためのメソッド
app.delete('/', function (req, res) {
   res.send('DELETE request to homepage')
})

//app.disable(name)とは、アプリケーションの設定を無効にするためのメソッド
app.disable('x-powered-by')

//app.disabled(name)とは、アプリケーションの設定が無効かどうかを判定するためのメソッド
app.disabled('x-powered-by') // => true
app.enable('x-powered-by')

//app.enable(name)とは、アプリケーションの設定を有効にするためのメソッド
app.enable('trust proxy')
app.get('trust proxy')
// => true

//app.enabled(name)とは、アプリケーションの設定が有効かどうかを判定するためのメソッド
app.enabled('trust proxy') // => true
app.disable('trust proxy')

//app.engine(ext, callback)とは、テンプレートエンジンを設定するためのメソッド
app.engine('html', require('ejs').renderFile)
app.engine('pug', require('pug').__express)

//app.get(name)とは、アプリケーションの設定を取得するためのメソッド
app.get('title')
// => undefined

app.set('title', 'My Site')
app.get('title')
// => "My Site"
//app.get(path, callback [, callback ...])とは、指定したパスに対するGETメソッドに対してコールバックを実行するためのメソッド
app.get('/', function (req, res) {
   res.send('GET request to homepage')
})

//app.listen(path, [callback])とは、アプリケーションを指定したポートで起動するためのメソッド
var express = require('express')
var app = express()
app.listen('/tmp/sock')

//app.listen([port[, host[, backlog]]][, callback])とは、アプリケーションを指定したポートで起動するためのメソッド
var express = require('express')
var app = express()
app.listen(3000)

var express = require('express')
var https = require('https')
var http = require('http')
var app = express()

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

//app.METHOD(path, callback [, callback ...])とは、指定したパスに対するHTTPメソッドに対してコールバックを実行するためのメソッド
app.get('/', function (req, res) {
   res.send('GET request to homepage')
}
)

//app.param([name], callback)とは、パラメータを設定するためのメソッド
app.param('user', function (req, res, next, id) {
   // find the user by id and store it in req.user
   next()
}
)

app.get('/user/:user', function (req, res, next) {
   res.end(req.user.name)
}
)

//app.patch(path, callback [, callback ...])とは、指定したパスに対するPATCHメソッドに対してコールバックを実行するためのメソッド
app.patch('/', function (req, res) {
   res.send('PATCH request to homepage')
}
)

//app.post(path, callback [, callback ...])とは、指定したパスに対するPOSTメソッドに対してコールバックを実行するためのメソッド
app.post('/', function (req, res) {
   res.send('POST request to homepage')
}
)

app.param('id', function (req, res, next, id) {
   console.log('CALLED ONLY ONCE')
   next()
})

app.get('/user/:id', function (req, res, next) {
   console.log('although this matches')
   next()
})

app.get('/user/:id', function (req, res) {
   console.log('and this matches too')
   res.end()
})

app.param(['id', 'page'], function (req, res, next, value) {
   console.log('CALLED ONLY ONCE with', value)
   next()
})

app.get('/user/:id/:page', function (req, res, next) {
   console.log('although this matches')
   next()
})

app.get('/user/:id/:page', function (req, res) {
   console.log('and this matches too')
   res.end()
})

var express = require('express')
var app = express()

// customizing the behavior of app.param()
app.param(function (param, option) {
   return function (req, res, next, val) {
      if (val === option) {
         next()
      } else {
         next('route')
      }
   }
})

// using the customized app.param()
app.param('id', 1337)

// route to trigger the capture
app.get('/user/:id', function (req, res) {
   res.send('OK')
})

app.listen(3000, function () {
   console.log('Ready')
})

//app.path()とは、アプリケーションのパスを取得するためのメソッド
var app = express()
var blog = express()
var blogAdmin = express()

app.use('/blog', blog)
blog.use('/admin', blogAdmin)

console.dir(app.path()) // ''
console.dir(blog.path()) // '/blog'
console.dir(blogAdmin.path()) // '/blog/admin'

//app.post(path, callback [, callback ...])とは、指定したパスに対するPOSTメソッドに対してコールバックを実行するためのメソッド
app.post('/', function (req, res) {
   res.send('POST request to homepage')
})

//app.put(path, callback [, callback ...])とは、指定したパスに対するPUTメソッドに対してコールバックを実行するためのメソッド
app.put('/', function (req, res) {
   res.send('PUT request to homepage')
}
)

//app.render(view, [locals], callback)とは、テンプレートをレンダリングするためのメソッド
app.render('email', function (err, html) {
   // ...
})

app.render('email', { name: 'Tobi' }, function (err, html) {
   // ...
})

//app.route(path)とは、指定したパスに対するルートを取得するためのメソッド
var app = express()

app.route('/events')
   .all(function (req, res, next) {
      // runs for all HTTP verbs first
      // think of it as route specific middleware!
   })
   .get(function (req, res, next) {
      res.json({})
   })
   .post(function (req, res, next) {
      // maybe add a new event...
   })


//app.set(name, value)とは、アプリケーションの設定を行うためのメソッド
app.set('title', 'My Site')
app.set('etag', function (body, encoding) {
   return generateHash(body, encoding) // consider the function is defined
})

//app.use([path,] callback [, callback...])とは、アプリケーションにミドルウェアを設定するためのメソッド
app.use(function (req, res, next) {
   console.log('Time:', Date.now())
   next()
}
)

app.use(function (req, res, next) {
   console.log('Time: %d', Date.now())
   next()
})

app.use(function (req, res, next) {
   res.send('Hello World')
})

// requests will never reach this route
app.get('/', function (req, res) {
   res.send('Welcome')
})

//app.use([path,] function [, function...])とは、アプリケーションにミドルウェアを設定するためのメソッド
app.use(function (req, res, next) {
   console.log('Request Type:', req.method)
   next()
}
)

app.use('/abcd', function (req, res, next) {
   next()
})

app.get('/user/:id', function (req, res) {
   res.send('user ' + req.params.id)
})

//req.appとは、リクエストを処理しているアプリケーションを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.app.locals.title)
}
)

//req.baseUrlとは、リクエストのベースURLを取得するためのプロパティ
app.get('/user/:id', function (req, res) {
   res.send(req.baseUrl)
}
)

//req.bodyとは、リクエストのボディを取得するためのプロパティ
app.post('/', function (req, res) {
   res.send(req.body)
}
)

//req.cookiesとは、リクエストのクッキーを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.cookies)
}
)

//req.freshとは、リクエストがキャッシュされているかどうかを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.fresh)
}
)
var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
   console.log(req.body)
   res.json(req.body)
})

//req.cookiesとは、リクエストのクッキーを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.cookies)
}
)

//req.ipとは、リクエストのIPアドレスを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.ip)
}
)

//req.ipsとは、リクエストのIPアドレスを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.ips)
}
)

//req.originalUrlとは、リクエストのオリジナルURLを取得するためのプロパティ
app.get('/', function (req, res) {
})

//req.paramsとは、リクエストのパラメータを取得するためのプロパティ
app.get('/user/:id', function (req, res) {
   res.send(req.params.id)
}
)

//req.pathとは、リクエストのパスを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send
})

//req.queryとは、リクエストのクエリを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.query)
}
)

//req.routeとは、リクエストのルートを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.route)
}
)


//req.queryとは、リクエストのクエリを取得するためのプロパティ
var qs = require('qs')
app.setting('query parser', function (str) {
   return qs.parse(str, { /* custom options */ })
})

//req.routeとは、リクエストのルートを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.route)
}
)

//req.routeとは、リクエストのルートを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.route)
}
)

//req.staleとは、リクエストがキャッシュされているかどうかを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.stale)
}
)

//req.subdomainsとは、リクエストのサブドメインを取得するためのプロパティ
app.get('/', function (req, res) {
   res.send(req.subdomains)
}
)


