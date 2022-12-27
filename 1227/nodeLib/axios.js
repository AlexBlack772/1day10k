//axios(config)とは、axiosのメソッドで、引数にconfigを渡すと、axiosのインスタンスを返す。
// Send a POST request
axios({
   method: 'post',
   url: '/user/12345',
   data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
   }
});

// GET request for remote image in node.js
axios({
   method: 'get',
   url: 'http://bit.ly/2mTM3nY',
   responseType: 'stream'
})
   .then(function (response) {
      response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
   });


//axios.request(config)とは、リクエストを送るためのメソッドで、引数にconfigを渡すと、axiosのインスタンスを返す。

//axios.get(url[, config])とは、GETリクエストを送るためのメソッドで、引数にurlとconfigを渡すと、axiosのインスタンスを返す。

//axios.delete(url[, config])とは、DELETEリクエストを送るためのメソッドで、引数にurlとconfigを渡すと、axiosのインスタンスを返す。

//axios.head(url[, config])とは、HEADリクエストを送るためのメソッドで、引数にurlとconfigを渡すと、axiosのインスタンスを返す。
axios.head(url[, config])

//axios.post(url[, data[, config]])とは、POSTリクエストを送るためのメソッドで、引数にurlとdataとconfigを渡すと、axiosのインスタンスを返す。
axios.post(url[, data[, config]])

//axios.put(url[, data[, config]])とは、PUTリクエストを送るためのメソッドで、引数にurlとdataとconfigを渡すと、axiosのインスタンスを返す。
axios.post(url[, data[, config]])

//axios.patch(url[, data[, config]])とは、PATCHリクエストを送るためのメソッドで、引数にurlとdataとconfigを渡すと、axiosのインスタンスを返す。
axios.post(url[, data[, config]])

//axios.interceptors.request.use([fulfilled, rejected])とは、リクエストのインターセプターを登録するためのメソッドで、引数にfulfilledとrejectedを渡すと、axiosのインスタンスを返す。
axios.post(url[, data[, config]])
