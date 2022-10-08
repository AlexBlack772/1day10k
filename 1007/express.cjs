//expressを使う
const express = require('express');
const app = express();
const port = 3000;
//getでアクセスされたときの処理
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//postでアクセスされたときの処理
app.post('/', (req, res) => res.send('Got a POST request'));
//putでアクセスされたときの処理
app.put('/user', (req, res) => res.send('Got a PUT request at /user'));
//deleteでアクセスされたときの処理
app.delete('/user', (req, res) => res.send('Got a DELETE request at /user'));
//express.json()を使う
app.use(express.json());
//express.raw()を使う

app.use(express.raw());
//express.Router()を使う
//express.Router()とは、ルーティングのためのミドルウェアを作成するためのヘルパー関数
const router = express.Router();
//express.text()を使う
//express.text()とは、リクエストボディをテキストとして解釈するミドルウェアです。
app.use(express.text());
//express.static()を使う
//静的ファイルを提供する
app.use(express.static('public'));
//express.urlencoded()を使う
//express.urlencoded()とは、リクエストボディをURLエンコードされたデータとして解釈するミドルウェアです。
app.use(express.urlencoded({ extended: false }));
//onメソッドを使う
//onメソッドとは、イベントを登録するメソッドです。
app.on('mount', function (parent) {
   console.log('App mounted');
}
//app.mountpathを使う
//app.mountpathとは、アプリケーションがミドルウェアとしてマウントされたパスを示すプロパティです。
app.use('/admin', admin);
console.log(admin.mountpath); // /admin
//app.path()を使う
//app.path()とは、アプリケーションがミドルウェアとしてマウントされたパスを示すプロパティです。
app.use('/admin', admin);
console.log(admin.path()); // /admin
//app.localsを使う
//app.localsとは、アプリケーションのローカル変数を設定するプロパティです。
app.locals.title = 'My App';
app.locals.email = '';
//app.requestを使う
//app.requestとは、アプリケーションのリクエストオブジェクトを設定するプロパティです。
app.request.foo = 'bar';
//(req,res) => res.send('Hello World!')を使う
//アロー関数とは、functionキーワードを省略した関数のことです。
app.get('/', (req, res) => res.send('Hello World!'));
//app.responseを使う
//app.responseとは、アプリケーションのレスポンスオブジェクトを設定するプロパティです。
app.response.foo = 'bar';
//app.route()を使う
//app.render()を使う
//app.render()とは、テンプレートエンジンを使ってレンダリングしたHTMLをレスポンスとして返すメソッドです。
app.set('view engine', 'pug');
app.get('/', function (req, res) {
   res.render('index', { title: 'Hey', message: 'Hello there!'});
})
//app.next()を使う
//app.next()とは、アプリケーションの次のミドルウェアを呼び出すメソッドです。
app.use(function (req, res, next) {
   console.log('Time:', Date.now());
   next();
})
//app.set()を使う
//app.set()とは、アプリケーションの設定を行うメソッドです。
app.set('view engine', 'pug');
//app.json()を使う
//app.json()とは、リクエストボディをJSONとして解釈するミドルウェアです。
//app.all()を使う
//app.all()とは、すべてのHTTPメソッドに対してのルーティングを行うメソッドです。
app.all('/secret', function (req, res, next) {
   console.log('Accessing the secret section ...');
   next(); // pass control to the next handler
})
//app.disable()を使う
//app.disable()とは、アプリケーションの設定を無効にするメソッドです。
app.disable('x-powered-by');
//app.disabled()を使う
//app.disabled()とは、アプリケーションの設定が無効かどうかを判定するメソッドです。
app.disabled('x-powered-by');
//app.enable()を使う
//app.enable()とは、アプリケーションの設定を有効にするメソッドです。
app.enable('trust proxy');
//app.enabled()を使う
//app.enabled()とは、アプリケーションの設定が有効かどうかを判定するメソッドです。
app.enabled('trust proxy');
//app.engine()を使う
//app.engine()とは、テンプレートエンジンを設定するメソッドです。
app.engine('pug', require('pug').__express);
//app.get()を使う
//app.get()とは、HTTP GETメソッドに対してのルーティングを行うメソッドです。
app.get('/', function (req, res) {
   res.send('Hello World!');
})
//app.listen()を使う
//app.listen()とは、アプリケーションを起動するメソッドです。
app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
})
//app.param()を使う
//app.param()とは、パラメータを指定してルーティングを行うメソッドです。
app.param('user_id', function (req, res, next, id) {
   console.log('CALLED ONLY ONCE');
   next();
})
//app.path()を使う
//app.path()とは、アプリケーションがミドルウェアとしてマウントされたパスを示すプロパティです。
app.use('/admin', admin);
console.log(admin.path()); // /admin
//app.patch()を使う
//app.patch()とは、HTTP PATCHメソッドに対してのルーティングを行うメソッドです。
app.patch('/', function (req, res) {
   res.send('Got a PATCH request');
})
//app.post()を使う
//app.post()とは、HTTP POSTメソッドに対してのルーティングを行うメソッドです。
app.post('/', function (req, res) {
   res.send('Got a POST request');
})
//app.put()を使う
//app.put()とは、HTTP PUTメソッドに対してのルーティングを行うメソッドです。
app.put('/', function (req, res) {
   res.send('Got a PUT request');
})
//app.baseUrlを使う
//app.baseUrlとは、アプリケーションがミドルウェアとしてマウントされたベースURLを示すプロパティです。
app.use('/admin', admin);
console.log(admin.baseUrl); // /admin
//app.mountpathを使う
//app.mountpathとは、アプリケーションがミドルウェアとしてマウントされたパスを示すプロパティです。
app.use('/admin', admin);
console.log(admin.mountpath); // /admin
//app.route()を使う
//app.route()とは、ルーティングを行うメソッドです。
app.route('/book')

   .get(function (req, res) {
      
      res.send('Get a random book');
   })
//app.body()を使う
//app.body()とは、リクエストボディを解釈するミドルウェアです。
app.body('user[name]', 'user[email]');
//app.cookie()を使う
//app.cookie()とは、クッキーを解釈するミドルウェアです。
app.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
//app.fresh()を使う
//app.fresh()とは、リクエストがキャッシュされているかどうかを判定するミドルウェアです。
app.fresh();
//app.ipを使う
//app.ipとは、リクエストのIPアドレスを示すプロパティです。
app.ip;
//app.ipsを使う
//app.ipsとは、リクエストのIPアドレスを示すプロパティです。
app.ips;
//app.methodを使う
//methodとは、リクエストのHTTPメソッドを示すプロパティです。

//app.originalUrlを使う
//app.originalUrlとは、リクエストの元のURLを示すプロパティです。
//xhr()を使う
//xhr()とは、リクエストがXMLHttpRequestかどうかを判定するミドルウェアです。
//app.param()を使う
//app.param()とは、パラメータを指定してルーティングを行うメソッドです。
app.param('user_id', function (req, res, next, id) {
   console.log('CALLED ONLY ONCE');
   next();
})
