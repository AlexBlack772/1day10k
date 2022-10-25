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
//web3.eth.getBalance()の定義
web3.eth.getBalance = function (address, defaultBlock, callback) { }
//web3.eth.getBalance()の関数
web3.eth.getBalance = function (address, defaultBlock, callback) { }
//web3.eth.getStorageAt()のapi
web3.eth.getStorageAt = function (address, position, defaultBlock, callback) { }
//web3.eth.getCode()の使い方
web3.eth.getCode = function (address, defaultBlock, callback) { }
//web3.eth.getBlock()の使い方
web3.eth.getBlock = function (blockHashOrBlockNumber, returnTransactionObjects, callback) { }
//web3.eth.getBlockTransactionCount()を使用すると、ブロックのトランザクション数を取得することができる
//parameter1:ブロックハッシュまたはブロック番号
//parameter2:コールバック関数
web3.eth.getBlockTransactionCount = function (blockHashOrBlockNumber, callback) { }
//web3.givenProviderとは、web3.givenProviderのインスタンスを生成するという意味
web3.givenProvider()
//web3.currentProviderとは、web3.currentProviderのインスタンスを生成するという意味
web3.currentProvider()
//new web3.BatchRequest()とは、web3.BatchRequest()のインスタンスを生成するという意味
new web3.BatchRequest()
//web3.eth.net.getId()とは、web3.eth.net.getId()のネットワークIDを取得するという意味
web3.eth.net.getId()
//web3.eth.net.isListening()とは、web3.eth.net.isListening()のネットワークがリッスンしているかどうかを取得するという意味
web3.eth.net.isListening()
//web3.eth.net.getPeerCount()とは、web3.eth.net.getPeerCount()のネットワークのピア数を取得するという意味
web3.eth.net.getPeerCount()
//web3.eth.net.getNetworkType()とは、web3.eth.net.getNetworkType()のネットワークの種類を取得するという意味
web3.eth.net.getNetworkType()
//web3.eth.net.getNetworkType()の定義
web3.eth.net.getNetworkType = function (callback) { }
//web3.eth.Iban()とは、web3.eth.Iban()のインスタンスを生成するという意味
web3.eth.Iban()
//ibanとは、Ibanとは、国際銀行口座番号のこと
web3.eth.Iban.toAddress()
//web3.eth.Iban.toAddress()とは、web3.eth.Iban.toAddress()のアドレスを取得するという意味
web3.eth.Iban.toAddress()
//web3.eth.Iban.fromBban()とは、web3.eth.Iban.fromBban()のインスタンスを生成するという意味
web3.eth.Iban.fromBban()
//Bbanとは、Bbanとは、国際銀行口座番号のこと
web3.eth.Iban.fromBban()
//bzzとは、bzzとは、swarmのこと
bzz
//shhとは、shhとは、whisperのこと
shh
//web3.eth.Contract()とは、web3.eth.Contract()のインスタンスを生成するという意味
web3.eth.Contract()
//web3.eth.Contract()の定義
web3.eth.Contract = function (jsonInterface, address, options) { }
//web3.eth.account.hasMessage()とは、web3.eth.account.hasMessage()のアカウントがメッセージを持っているかどうかを確認するという意味
web3.eth.account.hasMessage()
//web3.eth.account.sign()とは、web3.eth.account.sign()のアカウントに署名するという意味
web3.eth.account.sign()
//web3.eth.account.recover()とは、web3.eth.account.recover()のアカウントを復元するという意味
web3.eth.account.recover()
//web3.eth.account.encrypt()とは、web3.eth.account.encrypt()のアカウントを暗号化するという意味
web3.eth.account.encrypt()
//web3.eth.account.decrypt()とは、web3.eth.account.decrypt()のアカウントを復号化するという意味
web3.eth.account.decrypt()
//web3.eth.accounts.wallet.create()とは、web3.eth.accounts.wallet.create()のアカウントを作成するという意味
web3.eth.accounts.wallet.create()
//web3.eth.accounts.wallet.add()とは、web3.eth.accounts.wallet.add()のアカウントを追加するという意味
web3.eth.accounts.wallet.add()
//web3.eth.accounts.wallet.remove()とは、web3.eth.accounts.wallet.remove()のアカウントを削除するという意味
web3.eth.accounts.wallet.remove()
//web3.eth.accounts.wallet.clear()とは、web3.eth.accounts.wallet.clear()のアカウントをクリアするという意味
web3.eth.accounts.wallet.clear()
//web3.eth.accounts.wallet.encrypt()とは、web3.eth.accounts.wallet.encrypt()のアカウントを暗号化するという意味
web3.eth.accounts.wallet.encrypt()
//web3.eth.accounts.wallet.decrypt()とは、web3.eth.accounts.wallet.decrypt()のアカウントを復号化するという意味
web3.eth.accounts.wallet.decrypt()
//web3.eth.accounts.wallet.save()とは、web3.eth.accounts.wallet.save()のアカウントを保存するという意味
web3.eth.accounts.wallet.save()
//web3.eth.accounts.wallet.load()とは、web3.eth.accounts.wallet.load()のアカウントを読み込むという意味
web3.eth.accounts.wallet.load()
//web3.eth.accounts.wallet.encrypt()の定義
web3.eth.accounts.wallet.encrypt = function (password, options) { }
//web3.eth.personal.ecRecover()とは、web3.eth.personal.ecRecover()の個人情報を復元するという意味
web3.eth.personal.ecRecover()
//web3.eth.personal.sign()とは、web3.eth.personal.sign()の個人情報に署名するという意味
web3.eth.personal.sign()
//web3.eth.personal.signTransaction()とは、web3.eth.personal.signTransaction()の個人情報に署名するという意味
web3.eth.personal.signTransaction()
//web3.eth.personal.sendTransaction()とは、web3.eth.personal.sendTransaction()の個人情報を送信するという意味
web3.eth.personal.sendTransaction()
//web3.eth.personal.unlockAccount()とは、web3.eth.personal.unlockAccount()の個人情報をアンロックするという意味
web3.eth.personal.unlockAccount()
//web3.eth.personal.lockAccount()とは、web3.eth.personal.lockAccount()の個人情報をロックするという意味
web3.eth.personal.lockAccount()
//web3.eth.personal.importRawKey()とは、web3.eth.personal.importRawKey()の個人情報をインポートするという意味
web3.eth.personal.importRawKey()
//web3.eth.personal.newAccount()とは、web3.eth.personal.newAccount()の個人情報を新規作成するという意味
web3.eth.personal.newAccount()
//web3.eth.personal.listAccounts()とは、web3.eth.personal.listAccounts()の個人情報をリストアップするという意味
web3.eth.personal.listAccounts()
//web3.eth.personal.sign()の定義
web3.eth.personal.sign = function (dataToSign, address, callback) { }
//web3.eth.ens.registryAddressとは、web3.eth.ens.registryAddressのENSレジストリアドレスを取得するという意味
web3.eth.ens.registryAddress
//web3.eth.ens.registryとは、web3.eth.ens.registryのENSレジストリを取得するという意味
web3.eth.ens.registry
//web3.eth.ens.resolverとは、web3.eth.ens.resolverのENSリゾルバを取得するという意味
web3.eth.ens.resolver
//web3.eth.ens.resolverとは、web3.eth.ens.resolverのENSリゾルバを取得するという意味
web3.eth.ens.resolver
//web3.eth.ens.getResolver()とは、web3.eth.ens.getResolver()のENSリゾルバを取得するという意味
web3.eth.ens.getResolver()
//web3.eth.ens.setResolver()とは、web3.eth.ens.setResolver()のENSリゾルバを設定するという意味
web3.eth.ens.setResolver()
//web3.eth.ens.getOwner()とは、web3.eth.ens.getOwner()のENSオーナーを取得するという意味
web3.eth.ens.getOwner()
//web3.eth.ens.setOwner()とは、web3.eth.ens.setOwner()のENSオーナーを設定するという意味
web3.eth.ens.setOwner()
//web3.eth.ens.getContent()とは、web3.eth.ens.getContent()のENSコンテンツを取得するという意味
web3.eth.ens.getContent()
//web3.eth.ens.setContent()とは、web3.eth.ens.setContent()のENSコンテンツを設定するという意味
web3.eth.ens.setContent()
//web3.eth.ens.setSubnodeOwner()とは、web3.eth.ens.setSubnodeOwner()のENSサブノードオーナーを設定するという意味
web3.eth.ens.setSubnodeOwner()
//web3.eth.ens.setSubnodeRecord()とは、web3.eth.ens.setSubnodeRecord()のENSサブノードレコードを設定するという意味
web3.eth.ens.setSubnodeRecord()
//web3.eth.ens.registryとは、web3.eth.ens.registryのENSレジストリを取得するという意味
