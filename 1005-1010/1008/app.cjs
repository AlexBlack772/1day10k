//requireとは
//requireはモジュールを読み込むための関数です。
//モジュールとは、別のファイルに書かれた関数や変数などを読み込むことができます。
//const functions = require('firebase-functions');
//exportsとは
//exportsはモジュールを公開するためのオブジェクトです。
//モジュールとは、別のファイルに書かれた関数や変数などを読み込むことができます。
//express()とは
//express()は、expressモジュールの関数です。
//expressを使う
import express from 'express';
const app = express();
//expressモジュールの関数であるexpress()を実行すると、expressアプリケーションを作成することができます。
//listen()を使う
//listen()の定義
listen(port, [hostname], [backlog], [callback])
//listen()の説明
//listen()は、サーバーを開始するための関数です。
express.json()　//express.json()は、リクエストのbodyをJSONとしてパースするための関数です。
app.use(express.json())
//app.use()は、ミドルウェアを登録するための関数です。
app.post('/api', (req, res) => {
   const data = req.body;
   res.send(data);
})
//exoress.Router()とは
//express.Router()は、ルーティングを行うための関数です。
const router = express.Router();
app.get('/api', (req, res) => {
   res.send('hello world');
})
//express.static()とは
//express.static()は、静的ファイルを提供するための関数です。
app.use(express.static('public'));
//app.use()は、ミドルウェアを登録するための関数です。
//app.use()の定義
//app.use([path], callback[ ...callback])
//app.use()の説明
//app.use()は、ミドルウェアを登録するための関数です。
//express.static()の定義
app.use(express.static(root, [options]))
//express.text()とは
//express.text()は、リクエストのbodyをテキストとしてパースするための関数です。
app.use(express.text())
//app.use()は、ミドルウェアを登録するための関数です。
//express.text()の定義
//express.text()は、リクエストのbodyをテキストとしてパースするための関数です。
//express.text()の説明
app.get('/api', (req, res) => {
   res.send('hello world');
})
//localsとは
//localsは、レンダリングされるテンプレートにローカル変数を提供するためのオブジェクトです。
app.get('/api', (req, res) => {
   res.locals.data = 'hello world';
   res.render('index');
})
//app.localsとは
//app.localsは、レンダリングされるテンプレートにローカル変数を提供するためのオブジェクトです。
app.locals.data = 'hello world';
app.get('/api', (req, res) => {
   res.render('index');
})
//mount pathとは
//mount pathは、ルーティングのパスです。

//app.get()の定義
app.get(path, [callback ...callback], callback)
//app.get()の説明
//app.get()は、GETリクエストを処理するための関数です。
//pathとは
//pathは、ルーティングのパスです。
//callbackとは
//callbackは、リクエストを処理するための関数です。
app.get('/api', (req, res) => {
   res.send('hello world');
})
//app.listen()の定義
app.listen(port, [hostname], [backlog], [callback])
//app.listen()の説明
//app.listen()は、サーバーを開始するための関数です。
//portとは
//portは、サーバーのポート番号です。
//hostnameとは
//hostnameは、サーバーのホスト名です。
hostname = 'localhost'
//backlogとは
//backlogは、接続待ちの最大数です。
//json()とは
//json()は、リクエストのbodyをJSONとしてパースするための関数です。
//json()の定義
json([options])
//json()の説明
//json()は、リクエストのbodyをJSONとしてパースするための関数です。
//optionsとは
//optionsは、オプションです。
//options.reviverとは
//options.reviverは、JSONをパースする際に使用する関数です。
//options.strictとは
//options.strictは、JSONをパースする際に使用する関数です。
options.strict = true
//set()とは
//set()は、レスポンスのヘッダーを設定するための関数です。
//set()の定義
set(field, [value])
//set()の説明
//set()は、レスポンスのヘッダーを設定するための関数です。
//fieldとは
//fieldは、ヘッダーのフィールドです。
//valueとは
//valueは、ヘッダーの値です。
//status()とは
//status()は、レスポンスのステータスコードを設定するための関数です。
//status()の定義
status(code)
//status()の説明
//baseUrlとは
