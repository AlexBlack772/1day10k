//express.json([options])とは、リクエストのbodyをJSONとしてパースするミドルウェアを作成する関数です。

//express.Router([options])とは、ルーティングのためのミドルウェアを作成する関数です。
var router = express.Router([options])

//express.static(root, [options])とは、静的ファイルを提供するミドルウェアを作成する関数です。
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
