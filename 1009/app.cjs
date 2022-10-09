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
