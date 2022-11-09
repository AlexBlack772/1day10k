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
//api.query.system.account(ADDR)とは、Runtimeのsystemモジュールのaccount()関数を呼び出すメソッドです。
//account()関数は、アカウントの残高とnonceを返します。
//const [now, { nonce, data: balance }] = await Promise.all([
api.query.timestamp.now(),
   api.query.system.account(ADDR)
]);
//Promise.all()とは、複数のPromiseを並列に実行するためのメソッドです。
const chain = await api.rpc.system.chain();
//api.rpcとは、RuntimeのRPCを呼び出すためのメソッドです。
//api.rpc.system.chain()とは、Runtimeのsystemモジュールのchain()関数を呼び出すメソッドです。
const chain = await api.rpc.system.chain();

// Retrieve the latest header
const lastHeader = await api.rpc.chain.getHeader();

// Log the information
console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
await api.rpc.chain.subscribeNewHeads((lastHeader) => {
   console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
});
//api.rpc.chain.subscribeNewHeads()とは、RuntimeのchainモジュールのsubscribeNewHeads()関数を呼び出すメソッドです。
//subscribeNewHeads()関数は、新しいブロックが作成されるたびに、そのブロックのヘッダーを引数にコールバック関数を呼び出します。
let count = 0;

// Subscribe to the new headers
const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
   console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

   if (++count === 10) {
      unsubHeads();
   }
});
//api.rpc.chain.subscribeNewHeads()とは、RuntimeのchainモジュールのsubscribeNewHeads()関数を呼び出すメソッドです。
//// Retrieve the current timestamp via subscription
const unsub = await api.query.timestamp.now((moment) => {
   console.log(`The last block has a timestamp of ${moment}`);
});
//api.query.timestamp.now()とは、Runtimeのtimestampモジュールのnow()関数を呼び出すメソッドです。
//now()関数は、現在のブロックのタイムスタンプを返します。
//api.query.timestamp.now((moment) => {
//   console.log(`The last block has a timestamp of ${moment}`);
//}); 
// Subscribe to balance changes for our account
const unsub = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
   console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
});
//api.query.system.accountとは、Runtimeのsystemモジュールのaccount()関数を呼び出すメソッドです。
//account()関数は、アカウントの残高とnonceを返します。
//api.query.system.account(ADDR, ({ nonce, data: balance }) => {
//   console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
//});
const unsub = await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
   const [{ data: balance1 }, { data: balance2 }] = balances;

   console.log(`The balances are ${balance1.free} and ${balance2.free}`);
});
//api.query.system.account.multiとは、Runtimeのsystemモジュールのaccount.multi()関数を呼び出すメソッドです。
//account.multi()関数は、複数のアカウントの残高を返します。
//api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
//   const [{ data: balance1 }, { data: balance2 }] = balances;
const validatorKeys = await api.query.staking.validators.keys();

// Subscribe to the balances for these accounts
const unsub = await api.query.balances.account.multi(validatorKeys, (balances) => {
   console.log(`The nonce and free balances are: ${balances.map(([nonce, { free }]) => [nonce, free])}`);
});
//api.query.balances.account.multiとは、Runtimeのbalancesモジュールのaccount.multi()関数を呼び出すメソッドです。
//account.multi()関数は、複数のアカウントの残高を返します。
//api.query.balances.account.multi(validatorKeys, (balances) => {
const unsub = await api.queryMulti([
   api.query.timestamp.now,
   [api.query.system.account, ADDR]
], ([now, { nonce, data: balance }]) => {
   console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
});
//api.queryMultiとは、複数のRuntimeのクエリを呼び出すメソッドです。
//api.query.timestamp.now
//api.query.system.account
//api.queryMulti([api.query.timestamp.now, [api.query.system.account, ADDR]], ([now, { nonce, data: balance }]) => {
//   console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
//});
// Retrieve the current block header
const lastHdr = await api.rpc.chain.getHeader();

// Get a decorated api instance at a specific block
const apiAt = await api.at(lastHdr.hash);

// query the balance at this point of the chain
const { data: { free } } = await apiAt.query.system.account(ADDR);

// Display the free balance
console.log(`The current free is ${free.toString()}`);
//api.atとは、特定のブロックの状態を取得するメソッドです。
//api.at(lastHdr.hash);
//apiAt.query.system.account(ADDR);
//api.at(lastHdr.hash)とは、特定のブロックの状態を取得するメソッドです。
//apiAt.query.system.account(ADDR)とは、Runtimeのsystemモジュールのaccount()関数を呼び出すメソッドです。
//account()関数は、アカウントの残高とnonceを返します。
//api.rpc.chain.getHeader()とは、RuntimeのchainモジュールのgetHeader()関数を呼び出すメソッドです。
//getHeader()関数は、現在のブロックのヘッダーを返します。
// Retrieve the active era
const activeEra = await api.query.staking.activeEra();

// retrieve all exposures for the active era
const exposures = await api.query.staking.erasStakers.entries(activeEra.unwrap().index);

exposures.forEach(([key, exposure]) => {
   console.log('key arguments:', key.args.map((k) => k.toHuman()));
   console.log('     exposure:', exposure.toHuman());
});
//api.query.staking.activeEra()とは、RuntimeのstakingモジュールのactiveEra()関数を呼び出すメソッドです。
//activeEra()関数は、現在のエラを返します。
//api.query.staking.erasStakers.entries(activeEra.unwrap().index);
// retrieve all the nominator keys
const keys = await api.query.staking.nominators.keys();

// extract the first key argument [AccountId] as string
const nominatorIds = keys.map(({ args: [nominatorId] }) => nominatorId);

console.log('all nominators:', nominatorIds.join(', '));
//api.query.staking.nominators.keys()とは、Runtimeのstakingモジュールのnominators.keys()関数を呼び出すメソッドです。
//nominators.keys()関数は、全てのノミネーターのアカウントIDを返します。
//api.query.staking.nominators.keys().map(({ args: [nominatorId] }) => nominatorId);
// Retrieve the current block header
const lastHdr1   = await api.rpc.chain.getHeader();
//api.rpc.chain.getHeader()とは、RuntimeのchainモジュールのgetHeader()関数を呼び出すメソッドです。

// Retrieve the hash & size of the entry as stored on-chain
const [entryHash, entrySize] = await Promise.all([
   api.query.system.account.hash(ADDR),
   api.query.system.account.size(ADDR)
]);

// Output the info
console.log(`The current size is ${entrySize} bytes with a hash of ${entryHash}`);
//api.query.system.account.hash(ADDR)とは、Runtimeのsystemモジュールのaccount.hash()関数を呼び出すメソッドです。
//// Extract the info
const { meta, method, section } = api.query.system.account;
// Display some info on a specific entry
console.log(`${section}.${method}: ${meta.documentation.join(' ')}`);
console.log(`query key: ${api.query.system.account.key(ADDR)}`);
//api.query.system.accountとは、Runtimeのsystemモジュールのaccount()関数を呼び出すメソッドです。
// Import the keyring as required
import { Keyring } from '@polkadot/api';

// Initialize the API as we would normally do
...

// Create a keyring instance
const keyring = new Keyring({ type: 'sr25519' });
//keringとは、アカウントを作成するためのクラスです。
// Create a new account
const alice = keyring.addFromUri('//Alice');
//aliceとは、アカウントを作成するための変数です。
// util-cryptoとは、暗号化関連のモジュールです。
// 
// 
...

// Some mnemonic phrase
const PHRASE = 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought';

// Add an account, straight mnemonic
const newPair = keyring.addFromUri(PHRASE);

// (Advanced) add an account with a derivation path (hard & soft)
const newDeri = keyring.addFromUri(`${PHRASE}//hard-derived/soft-derived`);

// (Advanced, development-only) add with an implied dev seed and hard derivation
const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });
//aliceとは、アカウントを作成するための変数です。
//keyring.addFromUri()とは、アカウントを作成するメソッドです。
//keyring.addFromUri(PHRASE)とは、アカウントを作成するメソッドです。
// add a hex seed, 32-characters in length
const hexPair = keyring.addFromUri('0x1234567890123456789012345678901234567890123456789012345678901234');

// add a string seed, internally this is padded with ' ' to 32-bytes in length
const strPair = keyring.addFromUri('Janice');
//keyring.addFromUri('0x1234567890123456789012345678901234567890123456789012345678901234')とは、アカウントを作成するメソッドです。
//keyring.addFromUri('Janice')とは、アカウントを作成するメソッドです。
...

// Add our Alice dev account
const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

// Log some info
console.log(`${alice.meta.name}: has address ${alice.address} with publicKey [${alice.publicKey}]`);
//alice.publicKeyとは、アカウントの公開鍵を取得するメソッドです。
// Some helper functions used here
import { stringToU8a, u8aToHex } from '@polkadot/util';

...

// Convert message, sign and then verify
const message = stringToU8a('this is our message');
const signature = alice.sign(message);
const isValid = alice.verify(message, signature, alice.publicKey);

// Log info
console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
//u8aToHex(signature)とは、アカウントの署名を取得するメソッドです。
//alice.verify(message, signature, alice.publicKey)とは、アカウントの署名を検証するメソッドです。
//alice.publicKeyとは、アカウントの公開鍵を取得するメソッドです。
//alice.sign(message)とは、アカウントの署名を取得するメソッドです。
// Create alice (carry-over from the keyring section)
const alice = keyring.addFromUri('//Alice');

// Make a transfer from Alice to BOB, waiting for inclusion
const unsub = await api.tx.balances
   .transfer(BOB, 12345)
   .signAndSend(alice, (result) => {
      console.log(`Current status is ${result.status}`);

      if (result.status.isInBlock) {
         console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
      } else if (result.status.isFinalized) {
         console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
         unsub();
      }
   });
//api.tx.balances.transfer(BOB, 12345)とは、Runtimeのbalancesモジュールのtransfer()関数を呼び出すメソッドです。
// Make a transfer from Alice to BOB, waiting for inclusion
const unsub = await api.tx.balances
   .transfer(BOB, 12345)
   .signAndSend(alice, ({ events = [], status, txHash }) => {
      console.log(`Current status is ${status.type}`);

      if (status.isFinalized) {
         console.log(`Transaction included at blockHash ${status.asFinalized}`);
         console.log(`Transaction hash ${txHash.toHex()}`);

         // Loop through Vec<EventRecord> to display all events
         events.forEach(({ phase, event: { data, method, section } }) => {
            console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
         });

         unsub();
      }
   });
//api.tx.balances.transfer(BOB, 12345)とは、Runtimeのbalancesモジュールのtransfer()関数を呼び出すメソッドです。
//api.tx.balances.transfer(BOB, 12345).signAndSend()とは
//api.tx.balances.transfer(BOB, 12345)とは、Runtimeのbalancesモジュールのtransfer()関数を呼び出すメソッドです。
// construct a transaction
const transfer = api.tx.balances.transfer(BOB, 12345);

// retrieve the payment info
const { partialFee, weight } = await transfer.paymentInfo(alice);

console.log(`transaction will have a weight of ${weight}, with ${partialFee.toHuman()} weight fees`);

// send the tx
transfer.signAndSend(alice, ({ events = [], status }) => { ... });
//transfer.paymentInfo(alice)とは、トランザクションの手数料を取得するメソッドです。
transfer.signAndSend(alice)
//transfer.signAndSend(alice)とは、トランザクションを送信するメソッドです。
// construct a transaction
const transfer = api.tx.balances.transfer(BOB, 12345);

// retrieve the payment info
const { partialFee, weight } = await transfer.paymentInfo(alice);

console.log(`transaction will have a weight of ${weight}, with ${partialFee.toHuman()} weight fees`);

// send the tx
transfer.signAndSend(alice, ({ events = [], status }) => { ... });
//transfer.paymentInfo(alice)とは、トランザクションの手数料を取得するメソッドです。
transfer.signAndSend(alice)
//transfer.signAndSend(alice)とは、トランザクションを送信するメソッドです。
// construct a transaction
const transfer = api.tx.balances.transfer(BOB, 12345);
