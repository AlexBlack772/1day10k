//
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');
// or
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// change provider
web3.setProvider('ws://localhost:8546');
// or
web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// Using the IPC provider in node.js
var net = require('net');
var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
// or
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"

//
// ====
// Http
// ====

var Web3HttpProvider = require('web3-providers-http');

var options = {
   keepAlive: true,
   withCredentials: false,
   timeout: 20000, // ms
   headers: [
      {
         name: 'Access-Control-Allow-Origin',
         value: '*'
      },
      {
         ...
        }
   ],
   agent: {
      http: http.Agent(...),
      baseUrl: ''
   }
};

var provider = new Web3HttpProvider('http://localhost:8545', options);

// ==========
// Websockets
// ==========

var Web3WsProvider = require('web3-providers-ws');

var options = {
   timeout: 30000, // ms

   // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
   headers: {
      authorization: 'Basic username:password'
   },

   clientConfig: {
      // Useful if requests are large
      maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000 // ms
   },

   // Enable auto reconnection
   reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false
   }
};

var ws = new Web3WsProvider('ws://localhost:8546', options);

var contract = new web3.eth.Contract(abi, address);

var batch = new web3.BatchRequest();
batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
batch.add(contract.methods.balance(address).call.request({ from: '0x0000000000000000000000000000000000000000' }, callback2));
batch.execute();

//
web3.extend({
   property: 'myModule',
   methods: [{
      name: 'getBalance',
      call: 'eth_getBalance',
      params: 2,
      inputFormatter: [web3.extend.formatters.inputAddressFormatter, web3.extend.formatters.inputDefaultBlockNumberFormatter],
      outputFormatter: web3.utils.hexToNumberString
   }, {
      name: 'getGasPriceSuperFunction',
      call: 'eth_gasPriceSuper',
      params: 2,
      inputFormatter: [null, web3.utils.numberToHex]
   }]
});

web3.extend({
   methods: [{
      name: 'directCall',
      call: 'eth_callForFun',
   }]
});

//
web3.eth.Contract.blockHeaderTimeout
contract.blockHeaderTimeout 

//
//getCoinbaseとは、現在のノードがマイニングを行っている場合に、そのマイニング報酬を受け取るアドレスを取得するメソッドです。
web3.eth.getCoinbase().then(console.log);

//web3.eth.isMining([callback])は、現在のノードがマイニングを行っているかどうかを取得するメソッドです。
web3.eth.isMining([callback])

//web3.eth.getAccounts([callback])は、現在のノードが管理しているアカウントの一覧を取得するメソッドです。
web3.eth.getAccounts([callback])

//getStorageAtとは、指定したアドレスの指定したスロットの値を取得するメソッドです。

//web3.eth.getCode(address [, defaultBlock] [, callback])は、指定したアドレスのコードを取得するメソッドです。
web3.eth.getCode(address[, defaultBlock][, callback])

//web3.eth.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])
web3.eth.getBlock(blockHashOrBlockNumber[, returnTransactionObjects][, callback])

   //web3.eth.getBlock(3150)
   .then(console.log);

//web3.eth.getBlockNumber([callback])は、現在のブロック番号を取得するメソッドです。
web3.eth.getBlockNumber([callback])

//web3.eth.getBlockTransactionCount(blockHashOrBlockNumber [, callback])は、指定したブロックに含まれるトランザクションの数を取得するメソッドです。

//getPendingTransactionsとは、現在のノードが管理しているアカウントの一覧を取得するメソッドです。
web3.eth.getPendingTransactions([callback])

//web3.eth.getTransactionReceipt(hash [, callback])とは、指定したトランザクションのレシートを取得するメソッドです。
web3.eth.getTransactionReceipt(hash[, callback])

//web3.eth.getTransactionCount(address [, defaultBlock] [, callback])とは、指定したアドレスのトランザクション数を取得するメソッドです。
web3.eth.getTransactionCount(address[, defaultBlock][, callback])

//web3.eth.sendTransaction(transactionObject [, callback])とは、トランザクションを送信するメソッドです。
web3.eth.sendTransaction(transactionObject[, callback])

//web3.eth.sendSignedTransaction(signedTransactionData [, callback])とは、署名済みトランザクションを送信するメソッドです。
web3.eth.sendSignedTransaction(signedTransactionData[, callback])

//web3.eth.sign(dataToSign, address [, callback])とは、指定したアドレスでデータを署名するメソッドです。
web3.eth.sign(dataToSign, address[, callback])

//
var Tx = require('@ethereumjs/tx').Transaction;
var privateKey = Buffer.from('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex');

var rawTx = {
   nonce: '0x00',
   gasPrice: '0x09184e72a000',
   gasLimit: '0x2710',
   to: '0x0000000000000000000000000000000000000000',
   value: '0x00',
   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
}

var tx = new Tx(rawTx, { 'chain': 'ropsten' });
var signedTx = tx.sign(privateKey);

var serializedTx = signedTx.serialize();

//web3.eth.signTransactionとは、トランザクションを署名するメソッドです。
web3.eth.signTransaction({
   from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
   gasPrice: "20000000000",
   gas: "21000",
   to: '0x3535353535353535353535353535353535353535',
   value: "1000000000000000000",
   data: ""
}).then(console.log);

//web3.eth.getProof(address, storageKey, blockNumber, [callback])とは、指定したアドレスの指定したスロットの値を取得するメソッドです。
web3.eth.getProof(address, storageKey, blockNumber, [callback])

//Contract.setProvider()とは、Contractインスタンスにプロバイダを設定するメソッドです。
var Contract = require('web3-eth-contract');

// set provider for all later instances to use
Contract.setProvider('ws://localhost:8546');

var contract = new Contract(jsonInterface, address);

contract.methods.somFunc().send({ from: ....})
   .on('receipt', function () {
    ...
});

//web3.eth.Contract.defaultAccount
web3.eth.Contract.defaultAccount

//web3.eth.Contract.defaultBlock
web3.eth.Contract.defaultBlock

//web3.eth.Contract.blockHeaderTimeoutとは、ブロックヘッダのタイムアウトを設定するメソッドです。
web3.eth.Contract.blockHeaderTimeout

//
var contract1 = new eth.Contract(abi, address, { gasPrice: '12345678', from: fromAddress });

var contract2 = contract1.clone();
contract2.options.address = address2;

(contract1.options.address !== contract2.options.address);

//
var contract = new eth.Contract(abi, address, { from: fromAddress });

//
myContract.deploy({
   data: '0x12345...',
   arguments: [123, 'My String']
})
   .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      gasPrice: '30000000000000'
   }, function (error, transactionHash) { ... })
   .on('error', function (error) { ... })
   .on('transactionHash', function (transactionHash) { ... })
   .on('receipt', function (receipt) {
      console.log(receipt.contractAddress) // contains the new contract address
   })
   .on('confirmation', function (confirmationNumber, receipt) { ... })
   .then(function (newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
   });


// When the data is already set as an option to the contract itself
myContract.options.data = '0x12345...';

myContract.deploy({
   arguments: [123, 'My String']
})
   .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      gasPrice: '30000000000000'
   })
   .then(function (newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
   });


//myContract.methods.myMethod([param1[, param2[, ...]]])とは、コントラクトのメソッドを呼び出すメソッドです。
myContract.methods.myMethod([param1[, param2[, ...]]])

myContract.methods.myMethod(123).call({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' }, function (error, result) {
    ...
});

// using the promise
myContract.methods.myMethod(123).call({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' })
   .then(function (result) {
    ...
});


// MULTI-ARGUMENT RETURN:

// Solidity
contract MyContract {
   function myFunction() returns(uint256 myNumber, string myString) {
      return (23456, "Hello!%");
   }
}

// web3.js
var MyContract = new web3.eth.Contract(abi, address);
MyContract.methods.myFunction().call()
   .then(console.log);
> Result {
   myNumber: '23456',
      myString: 'Hello!%',
         0: '23456', // these are here as fallbacks if the name is not know or given
            1: 'Hello!%'
}


// SINGLE-ARGUMENT RETURN:

// Solidity
contract MyContract {
   function myFunction() returns(string myString) {
      return "Hello!%";
   }
}


myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])

myContract.methods.myMethod(123).send({

//myContract.methods.myMethod([param1[, param2[, ...]]]).estimateGas(options[, callback])
   myContract.methods.myMethod([param1[, param2[, ...]]]).estimateGas(options[, callback])

   