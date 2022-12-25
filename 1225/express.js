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