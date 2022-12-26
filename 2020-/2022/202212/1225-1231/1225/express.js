//express.raw([options])とは、express.json()とexpress.urlencoded()の両方を含むミドルウェア関数を返します。
var router = express.Router([options])

//express.static(root, [options])とは、静的ファイルを提供するためのミドルウェア関数を返します。
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

//express.text([options])とは、テキストボディを解析するミドルウェア関数を返します。
var router = express.Router([options])

//express.urlencoded([options])とは、URLエンコードされたボディを解析するミドルウェア関数を返します。
var router = express.Router([options])

//app.localsとは、アプリケーションのローカル変数を設定します。
app.locals.title = 'My App'
app.locals.strftime = require('strftime')
app.locals.email = 'me@myapp.com'

//app.mountpathとは、アプリケーションがマウントされたパスを返します。
var express = require('express')

var app = express() // the main app
var admin = express() // the sub app

admin.get('/', function (req, res) {
   console.log(admin.mountpath) // /admin
   res.send('Admin Homepage')
})

app.use('/admin', admin) // mount the sub app

//app.on('mount', parent)とは、アプリケーションがマウントされたときに発生するイベントを設定します。
var express = require('express')
var admin = express()

admin.on('mount', function (parent) {
   console.log('Admin Mounted')
   console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
   res.send('Admin Homepage')
})

app.use('/admin', admin)

//app.all(パス、コールバック [、コールバック ...])とは、すべてのHTTPメソッドに対してルーティングを行います。
app.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...')
   next() // pass control to the next handler
})

//app.delete(パス、コールバック [、コールバック ...])とは、DELETEメソッドに対してルーティングを行います。
app.delete('/user', function (req, res) {
   res.send('DELETE request to homepage')
}
)

//app.disable(name)とは、アプリケーションの設定を無効にします。
app.disable('x-powered-by')

//app.enable(name)とは、アプリケーションの設定を有効にします。
app.enable('trust proxy')

//app.enabled(name)とは、アプリケーションの設定が有効かどうかを返します。
app.enabled('trust proxy')
app.enabled('trust proxy')
// => false

app.enable('trust proxy')
app.enabled('trust proxy')

//app.engine(ext, callback)とは、テンプレートエンジンを設定します。
app.engine('html', require('ejs').renderFile)

//app.get(パス、コールバック [、コールバック ...])とは、GETメソッドに対してルーティングを行います。
app.get('/', function (req, res) {
   res.send('GET request to homepage')
}
)

//app.handle(req, res, callback)とは、アプリケーションのリクエストを処理します。
app.handle(req, res, function (err) {
   if (err) {
      // エラー処理
   }
}
)

//app.head(パス、コールバック [、コールバック ...])とは、HEADメソッドに対してルーティングを行います。
app.head('/user', function (req, res) {
   res.send('HEAD request to homepage')
}
)

//app.listen([port [, host [, backlog]]][, callback])とは、アプリケーションをリッスンします。
app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
}
)

//app.METHOD(パス、コールバック [、コールバック ...])とは、HTTPメソッドに対してルーティングを行います。
app.METHOD(path, callback[, callback ...])

//app.param(name, callback)とは、パラメータを設定します。
app.param('user', function (req, res, next, id) {
   // idは、パラメータの値
   next()
}
)

//app.patch(パス、コールバック [、コールバック ...])とは、PATCHメソッドに対してルーティングを行います。
app.patch('/user', function (req, res) {
   res.send('PATCH request to homepage')
}
)

//app.listen([port [, host [, backlog]]][, callback])とは、アプリケーションをリッスンします。
app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
}
)

var express = require('express')
var https = require('https')
var http = require('http')
var app = express()

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)

//app.post(パス、コールバック [、コールバック ...])とは、POSTメソッドに対してルーティングを行います。
app.post('/user', function (req, res) {
   res.send('POST request to homepage')
}
)
//app.put(パス、コールバック [、コールバック ...])とは、PUTメソッドに対してルーティングを行います。
app.listen = function () {
   var server = http.createServer(this)
   return server.listen.apply(server, arguments)
}