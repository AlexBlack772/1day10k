//provider.getBalance( address [ , blockTag = latest ] )とは、指定したアドレスの残高を取得するメソッドです。
provider.getBalance(address[ , blockTag = latest])

//await provider.getCode("registrar.firefly.eth");とは、指定したアドレスのコードを取得するメソッドです。
await provider.getCode("registrar.firefly.eth");

//provider.getStorageAt( addr , pos [ , blockTag = latest ] ) とは、指定したアドレスのストレージを取得するメソッドです。
provider.getStorageAt(addr, pos[ , blockTag = latest])

//provider.getTransactionCount(address[ , blockTag = latest]) とは、指定したアドレスのトランザクションカウントを取得するメソッドです。
provider.getTransactionCount(address[ , blockTag = latest]) 

//await provider.getBlock(100004);とは、指定したブロック番号のブロックを取得するメソッドです。
await provider.getBlock(100004);

//provider.getBlockNumber() とは、現在のブロック番号を取得するメソッドです。

//provider.getBlockWithTransactions( block ) とは、指定したブロック番号のブロックを取得するメソッドです。
provider.getBlockWithTransactions(block)

//provider.getGasPrice() とは、現在のガス価格を取得するメソッドです。
provider.getGasPrice()

//provider.getAvatar( name ) とは、指定した名前のアバターを取得するメソッドです。
provider.getAvatar(name) 

//await provider.lookupAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa");
resolver.getAddress([cointType = 60]) 

//await provider.resolveName("registrar.firefly.eth");
resolver.getAddr()

//provider.getLogs( filter ) とは、指定したフィルターのログを取得するメソッドです。
provider.getLogs(filter)

//provider.getNetwork() とは、現在のネットワークを取得するメソッドです。
provider.getNetwork()

//resolver.getText( key ) とは、指定したキーのテキストを取得するメソッドです。
resolver.getText(key)


