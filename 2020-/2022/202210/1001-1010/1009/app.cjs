//require   = require('esm')(module/*, options*/)
//module.exports = require('./app.js')
//express.json()とは、リクエストボディをJSONとしてパースするミドルウェアです。
//postとは、POSTメソッドを使用してリソースを作成するために使用されるHTTPメソッドです。
app.get('/', (req, res) => {
   res.send('Hello World!')
}
//getとは、GETメソッドを使用してリソースを取得するために使用されるHTTPメソッドです。
//postとは、POSTメソッドを使用してリソースを作成するために使用されるHTTPメソッドです。
//postの定義
app.post('/api', express.json(), (req, res) => {
   res.send('Hello World!')
}
//listenとは、サーバーを開始するために使用されるメソッドです。
//listenの定義
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
}
//console.logとは、コンソールに文字列を出力するメソッドです。
//console.logの定義
console.log('Hello World!')
//portとは、ポート番号を表す変数です。
//portの定義
const port = 3000
//appとは、express()を実行した結果を格納する変数です。
//appの定義
const app = express()
//expressとは、Node.jsのWebアプリケーションフレームワークです。
//expressの定義
const express = require('express')
//requireとは、モジュールを読み込むメソッドです。
//requireの定義
const { createRequire } = require('module')
const require = createRequire(import.meta.url)
//createRequireとは、モジュールを読み込むメソッドです。
//createRequireの定義
const { createRequire } = require('module')
const require = createRequire(import.meta.url)
//import.meta.urlとは
//現在のモジュールのURLを表すプロパティです。
//renderとは、テンプレートをレンダリングするメソッドです。
//renderの定義
res.render('index', { title: 'Hey', message: 'Hello there!' })
//resとは、レスポンスを表す変数です。
//resの定義
res.render('index', { title: 'Hey', message: 'Hello there!' })
//freshとは、レスポンスが新鮮かどうかを判定するメソッドです。
//freshの定義
res.fresh
//resとは、レスポンスを表す変数です。
//app.hostnameとは、ホスト名を表すプロパティです。
//originalUrlとは、リクエストの元のURLを表すプロパティです。
//originalUrlの定義
req.originalUrl('http://localhost:3000/api', express.json(), (req, res) => {
   res.send('Hello World!')
})
//reqとは、リクエストを表す変数です。
app.path
// express protocolとは、プロトコルを表すプロパティです。
// express protocolの定義
app.protocol
// express queryとは、クエリを表すプロパティです。
// express queryの定義
app.query
//acceptsCharsetsとは、リクエストの文字セットを判定するメソッドです。
//acceptsCharsetsの定義
req.acceptsCharsets('utf-8')
//acceptsEncodingsとは、リクエストのエンコーディングを判定するメソッドです。
//acceptsEncodingsの定義
req.acceptsEncodings('gzip')
//acceptsLanguagesとは、リクエストの言語を判定するメソッドです。
//acceptsLanguagesの定義
req.acceptsLanguages('ja')
//acceptsとは、リクエストのMIMEタイプを判定するメソッドです。
//acceptsの定義
req.accepts('html')
//appとは、express()を実行した結果を格納する変数です。
//sendFileとは、ファイルを送信するメソッドです。
//sendFileの定義
res.sendFile('/path/to/index.html')
//sendStatusとは、ステータスコードを送信するメソッドです。
//sendStatusの定義
//sendStatus
res.sendStatus(200)
//sendとは、レスポンスを送信するメソッドです。
//sendの定義
res.send(Buffer.from('whoop'))
//redirect
res.redirect('/foo/bar')
//redirectの定義
