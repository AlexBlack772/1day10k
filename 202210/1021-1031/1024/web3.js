//new web3.BatchRequest().add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback)).execute();
new web3.BatchRequest().add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback)).execute();
//new web3.BatchRequest()とは、web3.BatchRequest()のインスタンスを生成するという意味
//web3.extend()とは、web3.jsの拡張機能を追加するという意味
web3.extend({
   property: 'eth',
   methods: [{
   }]
})
//web3.eth.getBalance.request()とは、web3.eth.getBalance()のリクエストを生成するという意味
//web3.eth.defaultAccount()とは、web3.eth.defaultAccount()のデフォルトアカウントを設定するという意味
web3.eth.defaultAccount = web3.eth.accounts[0];
//web3.eth.getBalance()とは、web3.eth.getBalance()の残高を取得するという意味
web3.eth.getBalance('0x0000000000000000000000000000000000000000', 'latest', callback);
//web3.eth.defaultAccount()とは、web3.eth.defaultAccount()のデフォルトアカウントを設定するという意味
web3.eth.defaultAccount = web3.eth.accounts[0];
//customChainIdとは、カスタムチェーンIDを設定するという意味
web3.eth.defaultChainId = customChainId;
//web3.eth.getBalance()とは、web3.eth.getBalance()の残高を取得するという意味
web3.eth.getBalance('0x0000000000000000000000000000000000000000', 'latest', callback);
//web3.eth.getBalance()の定義、
web3.eth.getBalance = function(address, defaultBlock, callback) {
   return web3._requestManager.send({
      method: 'eth_getBalance',
      params: [address, defaultBlock],
      callback: callback
   });
}
//web3.eth.defaultAccount()の定義
web3.eth.defaultAccount = null;
//web3.eth.getBalance.request()の定義
web3.eth.getBalance.request = function(address, defaultBlock, callback) {
   return web3._requestManager.send({
      method: 'eth_getBalance',
      params: [address, defaultBlock],
      callback: callback
   });
}
//web3.eth.defaultAccount()の定義
web3.eth.defaultAccount();
//web3.eth.getBlockNumber()の関数
web3.eth.getBlockNumber = function (callback) { }
//web3.ethとは、web3.ethのインスタンスを生成するという意味
