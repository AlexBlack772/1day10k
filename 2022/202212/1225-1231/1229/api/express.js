//express.static とは、静的ファイルを提供するためのミドルウェアです。
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

//express.text([options]) とは、テキストボディを解析するためのミドルウェアです。
app.use(express.text({ type: 'text/*' }))

//express.json([options]) とは、JSONボディを解析するためのミドルウェアです。
app.use(express.json())

//express.urlencoded([options]) とは、URLエンコードされたボディを解析するためのミドルウェアです。

app.use(express.urlencoded({ extended: false }))


var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.send('hello world')
})

app.listen(3000)

//app.locals とは、アプリケーションのローカル変数を設定するためのオブジェクトです。
console.dir(app.locals.title)
