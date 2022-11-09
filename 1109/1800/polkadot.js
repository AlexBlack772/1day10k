//WsProvider,ApiPromise
const { WsProvider, ApiPromise } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const wsProvider = new WsProvider('ws:');
const api = await ApiPromise.create({ provider: wsProvider });
const keyring = new Keyring({ type: 'sr25519' });
const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });
const bob = keyring.addFromUri('//Bob', { name: 'Bob default' }); 
const transfer = api.tx.balances.transfer(bob.address, 12345);
const hash = await transfer.signAndSend(alice);
console.log('Transfer sent with hash', hash.toHex());
//signAndSendとは、署名と送信を同時に行うメソッドです。
//signAndSendは、Promiseを返すので、awaitをつけて、Promiseが解決されるまで待ちます。
//Promiseが解決されると、トランザクションのハッシュが返ってきます。
//WsProviderとは、WebSocketを使って、Polkadotノードに接続するためのクラスです。
const wsProvider2 = new WsProvider('ws:');
//ApiPromiseとは、PolkadotのAPIを使うためのクラスです。
const api2 = await ApiPromise.create({ provider: wsProvider2 });
//Keyringとは、アカウントを管理するためのクラスです。
const keyring2 = new Keyring({ type: 'sr25519' });
//アカウントを作成します。
const alice2 = keyring2.addFromUri('//Alice', { name: 'Alice default' });
const bob2 = keyring2.addFromUri('//Bob', { name: 'Bob default' });
//トランザクションを作成します。
const transfer2 = api2.tx.balances.transfer(bob2.address, 12345);
//トランザクションを署名して送信します。
const hash2 = await transfer2.signAndSend(alice2);
console.log('Transfer sent with hash', hash2.toHex());
//runtime constantsとは、  
//Runtimeの定数を取得するためのメソッドです。
const { constants } = await api2.query.balances;
console.log(constants);
//runtime constantsの結果
//{ ExistentialDeposit: 5000000000n,
//  CreationFee: 5000000000n,
//  TransactionBaseFee: 1000000000n,
//  TransactionByteFee: 1000000000n,
//  TransferFee: 1000000000n,
//  DustRemovalFee: 1000000000n,
//  MaxLocks: 50n,
//  MaxReserves: 50n }
//runtime constantsの結果を見ると、
//ExistentialDepositは、アカウントの残高がこの値より小さくなると、アカウントは削除されます。
const [now, { nonce, data: balance }] = await Promise.all([
   api.query.timestamp.now(),
   api.query.system.account(ADDR)
]);
console.log(`Current time is ${now}`);
console.log(`Account ${ADDR} has a nonce of ${nonce}`);
//api.queryとは、RuntimeのStorageを取得するためのメソッドです。
//api.query.timestamp.now()とは、Runtimeのtimestampモジュールのnow()関数を呼び出すメソッドです。
const now = await api.query.timestamp.now();

// Retrieve the account balance & nonce via the system module
const { nonce, data: balance } = await api.query.system.account(ADDR);

console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
