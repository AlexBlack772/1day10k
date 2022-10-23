//web3.ethとは、web3.jsのインスタンスのこと
//web3.eth.getBlock()とは、web3.ethのgetBlock()メソッドのこと
web3.eth.getBlock(1, function (error, result) {
   if (!error) {
      console.log(result);
   } else {
      console.error(error);
   }
}
//web3.eth.Contract()とは、web3.ethのContract()メソッドのこと
new web3.eth.Contract(abi, address, options);
//web3.eth.Contract()の第一引数は、abiのこと
//web3.eth.Contract()の第二引数は、コントラクトのアドレスのこと
//web3.eth.Contract()の第三引数は、オプションのこと
//web3.eth.Contract()の戻り値は、コントラクトのインスタンスのこと
web3.eth.Contract.defaultAccount = '0x1234567890123456789012345678901234567891';
//web3.eth.Contract.defaultAccountとは、web3.eth.ContractのdefaultAccountプロパティのこと
//web3.eth.Contract.defaultAccountの初期値は、nullのこと
web3.eth.accounts.recover(message, signature);
//web3.eth.accounts.recover()とは、web3.eth.accountsのrecover()メソッドのこと
//web3.eth.accounts.recover()の第一引数は、メッセージのこと
web3.eth.accounts.encrypt(privateKey, password);
//web3.eth.accounts.encrypt()とは、web3.eth.accountsのencrypt()メソッドのこと
//encrypt()メソッドは、秘密鍵を暗号化するメソッドのこと
//web3.eth.accounts.encrypt()の第一引数は、秘密鍵のこと
encryptoed = web3.eth.accounts.encrypt(privateKey, password);
//encryptoedとは、暗号化された秘密鍵のこと
web3.eth.accounts.decrypt(encrypted, password);
//wallet.addressとは、walletのaddressプロパティのこと
//web3.setProvider()とは、web3のsetProvider()メソッドのこと
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
//web3.setProvider()の引数は、プロバイダのこと
