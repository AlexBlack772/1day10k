//web3.eth.subscribeとは、イベントを購読するためのメソッドです。
var Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
var web3 = new Web3(Web3.givenProvider || 'ws://remotenode.com:8546');
// or
var web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://remotenode.com:8546'));

// Using the IPC provider in node.js
var net = require('net');

var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
// or
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"

web3.givenProvider
web3.eth.givenProvider
web3.shh.givenProvider
web3.bzz.givenProvider

var Web3 = require('web3');

// "Web3.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
web3.setProvider(myProvider)

//web3.eth.getAccountsとは、アカウントの一覧を取得するためのメソッドです。
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

//web3.ethとは、Ethereumのブロックチェーンに関するメソッドを提供するオブジェクトです。
var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
var eth = new Eth(Eth.givenProvider || 'ws://some.local-or-remote.node:8546');


// or using the web3 umbrella package

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

//web3.setProvider()とは、プロバイダーを設定するためのメソッドです。

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


//Web3.providers.WebsocketProviderとは、Websocketプロバイダーを作成するためのクラスです。
var Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
var web3 = new Web3(Web3.givenProvider || 'ws://remotenode.com:8546');
// or
var web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://remotenode.com:8546'));

// Using the IPC provider in node.js
var net = require('net');

var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
// or
var web3 = new Web3(new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"

//
var contract = new web3.eth.Contract(abi, address);

var batch = new web3.BatchRequest();
batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
batch.add(contract.methods.balance(address).call.request({ from: '0x0000000000000000000000000000000000000000' }, callback2));
batch.execute();

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

console.log(web3);


//
var subscription = web3.eth.subscribe('logs', {
   address: '0x123456..',
   topics: ['0x12345...']
}, function (error, result) {
   if (!error)
      console.log(result);
});

//
var subscription = web3.eth.subscribe('pendingTransactions', function (error, result) {
   if (!error)
      console.log(result);
})
   .on("data", function (transaction) {
      console.log(transaction);
   });

// unsubscribes the subscription
subscription.unsubscribe(function (error, success) {
   if (success)
      console.log('Successfully unsubscribed!');
});

//signer.connect( provider ) とは、プロバイダーを接続するためのメソッドです。
signer.connect(provider) 

//signer.getAddress( ) とは、アドレスを取得するためのメソッドです。
signer.getAddress()

//signer.getBalance( [ blockTag = "latest" ] ) とは、残高を取得するためのメソッドです。
signer.getBalance( [ blockTag = "latest" ] )

//signer.getChainId( ) とは、チェーンIDを取得するためのメソッドです。

signer.getChainId()

//signer.getGasPrice( ) とは、ガス価格を取得するためのメソッドです。
signer.getGasPrice()

//signer.getTransactionCount( [ blockTag = "latest" ] ) とは、トランザクションカウントを取得するためのメソッドです。
signer.getTransactionCount([blockTag = "latest"])

//contract.attach( addressOrName ) とは、コントラクトをアタッチするためのメソッドです。
contract.attach(addressOrName)

//contract.connect( signerOrProvider ) とは、シグナーまたはプロバイダーを接続するためのメソッドです。
contract.connect(signerOrProvider)

//contract.deployed( ) とは、デプロイされたコントラクトを取得するためのメソッドです。
contract.deployed()

//contract.resolvedAddress ⇒ string< Address > とは、アドレスを取得するためのプロパティです。
//contract.resolvedAddress; string < Address >

   //contract.deployTransaction ⇒ TransactionResponse とは、トランザクションレスポンスを取得するためのプロパティです。
//contract.deployTransaction; TransactionResponse


//contract.interface ⇒ Interface とは、インターフェースを取得するためのプロパティです。

//Contract.isIndexed( value ) とは、インデックスされた値かどうかを判定するためのメソッドです。
Contract.isIndexed(value)

//contract.queryFilter( event [ , fromBlockOrBlockHash [ , toBlock ] ) とは、イベントフィルターを取得するためのメソッドです。
contract.queryFilter(event, fromBlockOrBlockHash, toBlock)

//contract.listeners( event ) とは、イベントリスナーを取得するためのメソッドです。
contract.listeners(event)

//contract.removeAllListeners( [ event ] ) とは、イベントリスナーを全て削除するためのメソッドです。
contract.removeAllListeners([event])

//contract.METHOD_NAME( ...args [ , overrides ] ) とは、コントラクトメソッドを呼び出すためのメソッドです。
contract.METHOD_NAME(...args[ , overrides])

//new ethers.utils.AbiCoder( [ coerceFunc ] )
new ethers.utils.AbiCoder([coerceFunc])

//abiCoder.encode([ "uint", "string" ], [ 1234, "Hello World" ])とは、エンコードするためのメソッドです。
abiCoder.encode(["uint", "string"], [1234, "Hello World"]);

//abiCoder.encode()とは、エンコードするためのメソッドです。
abiCoder.encode(
   ["uint", "tuple(uint256, string)"],
   [
      1234,
      [5678, "Hello World"]
   ]
);

//contract.addressとは、コントラクトアドレスを取得するためのプロパティです。
contract.address

//contract.queryFilter( event [ , fromBlockOrBlockHash [ , toBlock ] ) とは、イベントフィルターを取得するためのメソッドです。
contract.queryFilter(event, fromBlockOrBlockHash, toBlock)

//contract.listeners( event ) とは、イベントリスナーを取得するためのメソッドです。
contract.listeners(event)

//contract.off( event , listener ) とは、イベントリスナーを削除するためのメソッドです。
contract.off(event, listener)

//contract.on( event , listener ) とは、イベントリスナーを追加するためのメソッドです。
contract.on(event, listener)

//contract.METHOD_NAME( ...args [ , overrides ] )
contract.METHOD_NAME(...args[ , overrides])

//contract.estimateGas.METHOD_NAME( ...args [ , overrides ] ) とは、コントラクトメソッドのガスを推定するためのメソッドです。
contract.estimateGas.METHOD_NAME(...args[ , overrides])

//contract.filters.EVENT_NAME( ...args ) とは、イベントフィルターを取得するためのメソッドです。
contract.filters.EVENT_NAME(...args)

//new ethers.ContractFactory( interface , bytecode [ , signer ] ) とは、コントラクトファクトリーを作成するためのメソッドです。
new ethers.ContractFactory(interface, bytecode[, signer])

//ContractFactory.fromSolidity( compilerOutput [ , signer ] ) とは、コンパイラーアウトプットからコントラクトファクトリーを作成するためのメソッドです。
ContractFactory.fromSolidity(compilerOutput[, signer])

//contractFactory.interface ⇒ Interface とは、インターフェースを取得するためのプロパティです
contractFactory.interface

//contractFactory.attach( address ) とは、コントラクトをアタッチするためのメソッドです。
contractFactory.attach(address)

//contractFactory.getDeployTransaction( ...args [ , overrides ] ) とは、デプロイトランザクションを取得するためのメソッドです。
contractFactory.getDeployTransaction(...args[, overrides])

//contractFactory.deploy( ...args [ , overrides ] ) とは、コントラクトをデプロイするためのメソッドです。
contractFactory.deploy(...args[, overrides])

