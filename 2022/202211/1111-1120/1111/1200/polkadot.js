//OffchainWorkerApiとは、ブロックチェーンの外部にあるプログラムを実行するためのAPIです。
api.call.offchainWorkerApi.offchainWorker
//getAllValues()は、オフチェーンワーカーの実行結果を取得するためのメソッドです。
api.call.offchainWorkerApi.getAllValues()
//実行結果を取得するためのメソッドです。
api.call.offchainWorkerApi.getValues()
//ParachainHostApiとは、パラチェーンのホストを実行するためのAPIです。
api.call.parachainHostApi.parachainHost
//availabilityCores()とは、パラチェーンのホストを実行するためのメソッドです。
api.call.parachainHostApi.availabilityCores()
//PolkadotFinalityApiとは、ポリカドットの最終性を実行するためのAPIです。
api.call.polkadotFinalityApi.polkadotFinality
//bestFinalized()とは、ポリカドットの最終性を実行するためのメソッドです。
api.call.polkadotFinalityApi.bestFinalized()
//PolkadotInclusionApiとは、ポリカドットのインクルージョンを実行するためのAPIです。
api.call.polkadotInclusionApi.polkadotInclusion
//inclusionState()とは、ポリカドットのインクルージョンを実行するためのメソッドです。
api.call.polkadotInclusionApi.inclusionState()
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
// Construct
const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });
// Do something
console.log(api.genesisHash.toHex());
//wsProviderとは、WebSocketプロバイダーを実行するためのクラスです。
//ApiPromiseとは、Promiseを実行するためのクラスです。
//create()とは、Promiseを実行するためのメソッドです。
//genesisHashとは、ジェネシスハッシュを実行するためのプロパティです。
// Create the instance
const api = new ApiPromise({ provider: wsProvider });
// Wait until we are ready and conneted
await api.isReady;
// Do something
console.log(api.genesisHash.toHex());
//isReadyとは、準備ができているかどうかを確認するためのプロパティです。
// ApiPromiseとは。Promiseを実行するためのクラスです。
// Initialize the API as per previous sections
// The length of an epoch (session) in Babe
console.log(api.consts.babe.epochDuration.toNumber());
// The amount required to create a new account
console.log(api.consts.balances.existentialDeposit.toNumber());
// The amount required per byte on an extrinsic
console.log(api.consts.transactionPayment.transactionByteFee.toNumber());
//toNumber()とは、数値に変換するためのメソッドです。
//constsとは、定数を実行するためのプロパティです。
//consts.babe.epochDurationとは、Babeのエポックの長さを実行するためのプロパティです。
//consts.balances.existentialDepositとは、新しいアカウントを作成するために必要な量を実行するためのプロパティです。
//consts.transactionPayment.transactionByteFeeとは、トランザクションのバイト数に応じて必要な量を実行するためのプロパティです。
// Initialize the API as in previous sections
// The actual address that we will use
const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';
// Retrieve the last timestamp
const now = await api.query.timestamp.now();
// Retrieve the account balance & nonce via the system module
const { nonce, data: balance } = await api.query.system.account(ADDR);
console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
//queryとは、クエリを実行するためのプロパティです。
//query.timestamp.now()とは、現在のタイムスタンプを実行するためのメソッドです。
//query.system.account()とは、アカウントの残高とノンスをシステムモジュールを介して取得するためのメソッドです。
// Retrieve last block timestamp, account nonce & balances
const [now, { nonce, data: balance }] = await Promise.all([
   api.query.timestamp.now(),
   api.query.system.account(ADDR)
]);
console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
//Promise.all()とは、複数のPromiseを並列で実行するためのメソッドです。
// Retrieve the chain name
const chain = await api.rpc.system.chain();
// Retrieve the latest header
const lastHeader = await api.rpc.chain.getHeader();
// Log the information
console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
//rpcとは、リモートプロシージャコールを実行するためのプロパティです。
//rpc.system.chain()とは、チェーン名を実行するためのメソッドです。
//rpc.chain.getHeader()とは、最新のヘッダーを実行するためのメソッドです。
// Subscribe to the new headers
await api.rpc.chain.subscribeNewHeads((lastHeader) => {
   console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
});
//subscribeNewHeads()とは、新しいヘッダーを購読するためのメソッドです。
let count = 0;
// Subscribe to the new headers
const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
   console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

   if (++count === 10) {
      unsubHeads();
   }
});
//unsubscribe()とは、購読を解除するためのメソッドです。
const unsub = await api.derive.chain.subscribeNewHeads((lastHeader) => {
   console.log(`#${lastHeader.number} was authored by ${lastHeader.author}`);
});
// Subscribe to balance changes for 2 accounts, ADDR1 & ADDR2 (already defined)
const unsub = await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
   const [{ data: balance1 }, { data: balance2 }] = balances;

   console.log(`The balances are ${balance1.free} and ${balance2.free}`);
});
//multi()とは、複数のアカウントの残高を変更するためのメソッドです。
// Subscribe to balance changes for 2 accounts, ADDR1 & ADDR2 (already defined)
const unsub = await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
   const [{ data: balance1 }, { data: balance2 }] = balances;

   console.log(`The balances are ${balance1.free} and ${balance2.free}`);
});
//multi()とは、複数のアカウントの残高を変更するためのメソッドです。
// Subscribe to the timestamp, our index and balance
const unsub = await api.queryMulti([
   api.query.timestamp.now,
   [api.query.system.account, ADDR]
], ([now, { nonce, data: balance }]) => {
   console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
});
//queryMulti()とは、複数のクエリを実行するためのメソッドです。
// Retrieve the current block header
const lastHdr = await api.rpc.chain.getHeader();

// Get a decorated api instance at a specific block
const apiAt = await api.at(lastHdr.hash);

// query the balance at this point of the chain
const { data: { free } } = await apiAt.query.system.account(ADDR);

// Display the free balance
console.log(`The current free is ${free.toString()}`);
//at()とは、特定のブロックで装飾されたAPIインスタンスを取得するためのメソッドです。
// Retrieve the active era
const activeEra = await api.query.staking.activeEra();

// retrieve all exposures for the active era
const exposures = await api.query.staking.erasStakers.entries(activeEra.unwrap().index);

exposures.forEach(([key, exposure]) => {
   console.log('key arguments:', key.args.map((k) => k.toHuman()));
   console.log('     exposure:', exposure.toHuman());
});
//entries()とは、エントリーを取得するためのメソッドです。
//activeEra.unwrap().indexとは、アクティブなエラのインデックスを取得するためのメソッドです。
//entries()とは、エントリーを取得するためのメソッドです。
// retrieve all the nominator keys
const keys = await api.query.staking.nominators.keys();
// extract the first key argument [AccountId] as string
const nominatorIds = keys.map(({ args: [nominatorId] }) => nominatorId);
console.log('all nominators:', nominatorIds.join(', '));
//keys()とは、キーを取得するためのメソッドです。
//args: [nominatorId]とは、第一引数を取得するためのメソッドです。
// Retrieve the hash & size of the entry as stored on-chain
const [entryHash, entrySize] = await Promise.all([
   api.query.system.account.hash(ADDR),
   api.query.system.account.size(ADDR)
]);

// Output the info
console.log(`The current size is ${entrySize} bytes with a hash of ${entryHash}`);
//hash()とは、エントリーのハッシュを取得するためのメソッドです。
//size()とは、エントリーのサイズを取得するためのメソッドです。
// Extract the info
const { meta, method, section } = api.query.system.account;

// Display some info on a specific entry
console.log(`${section}.${method}: ${meta.documentation.join(' ')}`);
console.log(`query key: ${api.query.system.account.key(ADDR)}`);
//meta.documentation.join(' ')とは、ドキュメントを取得するためのメソッドです。
//key()とは、エントリーのキーを取得するためのメソッドです。
// Sign and send a transfer from Alice to Bob
const txHash = await api.tx.balances
   .transfer(BOB, 12345)
   .signAndSend(alice);

// Show the hash
console.log(`Submitted with hash ${txHash}`);
//signAndSend()とは、トランザクションを署名して送信するためのメソッドです。
// Import the keyring as required
import { Keyring } from '@polkadot/api';

// Initialize the API as we would normally do

// Create a keyring instance
const keyring = new Keyring({ type: 'sr25519' });
//Keyring()とは、鍵を管理するためのクラスです。

// Some mnemonic phrase
const PHRASE = 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought';
// Add an account, straight mnemonic
const newPair = keyring.addFromUri(PHRASE);
// (Advanced) add an account with a derivation path (hard & soft)
const newDeri = keyring.addFromUri(`${PHRASE}//hard-derived/soft-derived`);
// (Advanced, development-only) add with an implied dev seed and hard derivation
const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });
//addFromUri()とは、鍵を追加するためのメソッドです。
//...
// add a hex seed, 32-characters in length
const hexPair = keyring.addFromUri('0x1234567890123456789012345678901234567890123456789012345678901234');

// add a string seed, internally this is padded with ' ' to 32-bytes in length
const strPair = keyring.addFromUri('Janice');
//addFromUri()とは、鍵を追加するためのメソッドです。
// Some helper functions used here
import { stringToU8a, u8aToHex } from '@polkadot/util';

// Convert message, sign and then verify
const message = stringToU8a('this is our message');
const signature = alice.sign(message);
const isValid = alice.verify(message, signature, alice.publicKey);

// Log info
console.log(`The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`);
//sign()とは、メッセージを署名するためのメソッドです。
//verify()とは、メッセージを検証するためのメソッドです。
//u8aToHex()とは、u8aを16進数に変換するためのメソッドです。
//stringToU8a()とは、文字列をu8aに変換するためのメソッドです。
...

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
//signAndSend()とは、トランザクションを署名して送信するためのメソッドです。
...

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
//signAndSend()とは、トランザクションを署名して送信するためのメソッドです。
// construct a transaction
const transfer = api.tx.balances.transfer(BOB, 12345);

// retrieve the payment info
const { partialFee, weight } = await transfer.paymentInfo(alice);

console.log(`transaction will have a weight of ${weight}, with ${partialFee.toHuman()} weight fees`);

// send the tx
transfer.signAndSend(alice, ({ events = [], status }) => { ... });
//paymentInfo()とは、トランザクションの支払い情報を取得するためのメソッドです。
//signAndSend()とは、トランザクションを署名して送信するためのメソッドです。

// Get the current sudo key in the system
const sudoKey = await api.query.sudo.key();

// Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
const sudoPair = keyring.getPair(sudoKey);

// Send the actual sudo transaction
const unsub = await api.tx.sudo
   .sudo(
      api.tx.balances.setBalance(ADDR, 12345, 678)
   )
   .signAndSend(sudoPair, (result) => { ... });

//signAndSend()とは、トランザクションを署名して送信するためのメソッドです。
//sudo()とは、sudo権限を持つアカウントにトランザクションを実行させるためのメソッドです。
//getPair()とは、鍵を取得するためのメソッドです。
//query.sudo.key()とは、sudo権限を持つアカウントの鍵を取得するためのメソッドです。
const txHash = await api.tx.staking.validate({
   validatorPayment: 12345
});
//validate()とは、バリデーターとして登録するためのメソッドです。
//txHashとは、トランザクションのハッシュです。
//トランザクションのハッシュは、トランザクションのハッシュを取得するためのメソッドです。
const { metadata } = await api.rpc.state.getMetadata();
const modules = metadata.asLatest.modules;

// This will not work, because `name` is an instance of `Text`, not a string
// const system = modules.find(m => m.name === 'system');

// This will work, because `Text.eq()` can compare against a string
const system = modules.find(m => m.name.eq('system'));
//eq()とは、文字列を比較するためのメソッドです。
//asLatestとは、最新のメタデーターを取得するためのメソッドです。
//modulesとは、メタデーターのモジュールを取得するためのメソッドです。
//metadataとは、メタデーターを取得するためのメソッドです。
//rpc.state.getMetadata()とは、メタデーターを取得するためのメソッドです。
//rpcとは、リモートプロシージャコールを行うためのメソッドです。
// Assuming a tuple defined as `(32, AccountId)`
const [count, accountId] = tuple;

console.log(`${accountId} has ${count.toNumber()} values`);
const api = await ApiPromise.create({
   provider: wsProvider,
   types: {
      Balance: 'u64'
   }
});
//create()とは、APIを作成するためのメソッドです。
//providerとは、プロバイダーを設定するためのメソッドです。
//typesとは、カスタム型を設定するためのメソッドです。
//u64とは、64ビットの符号なし整数です。
const api = await ApiPromise.create({
   ...,
   typesChain: {
      Kusama: {
         BlockNumber: 'u32',
         Index: 'u32'
      }
   }
});
//typesChainとは、チェーンごとのカスタム型を設定するためのメソッドです。
//Kusamaとは、Kusamaチェーンの名前です。
//BlockNumberとは、ブロック番号です。
//Indexとは、インデックスです。
//u32とは、32ビットの符号なし整数です。
const api = await ApiPromise.create({
   ...,
   types: {
      // mapping the actual specified address format
      Address: 'AccountId',
      // mapping the lookup
      LookupSource: 'AccountId'
   }
});
//Addressとは、アドレスです。
//AccountIdとは、アカウントIDです。
//LookupSourceとは、アカウントIDを取得するためのメソッドです。
// type import for TypeScript
import type { Balance } from '@polkadot/types/interfaces';

...
// unwrap out option into a zero Balance when not found
// (This can be done via `.unwrapOrDefault()`, which does the same underlying)
const balance: Balance = balanceOpt.unwrapOr(api.createType('Balance'));
//unwrapOr()とは、オプションが存在しない場合にデフォルト値を返すためのメソッドです。
//createType()とは、型を作成するためのメソッドです。
import { createType } from '@polkadot/types';

// via API (recommended)
api.createType('Balance', 123);

// via registry (`.registry` is on all API and Codec objects)
api.registry.createType('Balance', 123n);

// via the low-level approach (not recommended)
createType(api.registry, 'Balance', '123');
const firstHead = api.rpc.chain.getHeader();

api.rpc.chain.subscribeNewHeads((lastHead: Header): void => {
   console.log('current header:', JSON.stringify(lastHead));
});
// returns Hash
const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
// returns SignedBlock
const signedBlock = await api.rpc.chain.getBlock(blockHash);

// the hash for the block, always via header (Hash -> toHex()) - will be
// the same as blockHash above (also available on any header retrieved,
// subscription or once-off)
console.log(signedBlock.block.header.hash.toHex());

// the hash for each extrinsic in the block
signedBlock.block.extrinsics.forEach((ex, index) => {
   console.log(index, ex.hash.toHex());
});
//hash.toHex()とは、ハッシュを16進数に変換するためのメソッドです。
//block.extrinsicsとは、ブロックのエクストリンジックを取得するためのメソッドです。
//blockとは、ブロックを取得するためのメソッドです。
//headerとは、ヘッダーを取得するためのメソッドです。
// returns Hash
const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
// returns SignedBlock
const signedBlock = await api.rpc.chain.getBlock(blockHash);

// the hash for the block, always via header (Hash -> toHex()) - will be
// the same as blockHash above (also available on any header retrieved,
// subscription or once-off)
console.log(signedBlock.block.header.hash.toHex());

// the hash for each extrinsic in the block
signedBlock.block.extrinsics.forEach((ex, index) => {
   console.log(index, ex.hash.toHex());
});
//hash.toHex()とは、ハッシュを16進数に変換するためのメソッドです。
//block.extrinsicsとは、ブロックのエクストリンジックを取得するためのメソッドです。
// no blockHash is specified, so we retrieve the latest
const signedBlock = await api.rpc.chain.getBlock();

// the information for each of the contained extrinsics
signedBlock.block.extrinsics.forEach((ex, index) => {
   // the extrinsics are decoded by the API, human-like view
   console.log(index, ex.toHuman());

   const { isSigned, meta, method: { args, method, section } } = ex;

   // explicit display of name, args & documentation
   console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
   console.log(meta.documentation.map((d) => d.toString()).join('\n'));

   // signer/nonce info
   if (isSigned) {
      console.log(`signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`);
   }
});
//toHuman()とは、人間が読みやすい形式に変換するためのメソッドです。
//method.argsとは、メソッドの引数を取得するためのメソッドです。
//method.methodとは、メソッドの名前を取得するためのメソッドです。
//method.sectionとは、メソッドのセクションを取得するためのメソッドです。
//meta.documentationとは、メタデータのドキュメントを取得するためのメソッドです。
//isSignedとは、署名されているかどうかを取得するためのメソッドです。
//ex.signerとは、署名者を取得するためのメソッドです。
//ex.nonceとは、ノンスを取得するためのメソッドです。
// returns Hash
// no blockHash is specified, so we retrieve the latest
const signedBlock = await api.rpc.chain.getBlock();
const apiAt = await api.at(signedBlock.block.header.hash);
const allRecords = await apiAt.query.system.events();

// map between the extrinsics and events
signedBlock.block.extrinsics.forEach(({ method: { method, section } }, index) => {
   // filter the specific events based on the phase and then the
   // index of our extrinsic in the block
   const events = allRecords
      .filter(({ phase }) =>
         phase.isApplyExtrinsic &&
         phase.asApplyExtrinsic.eq(index)
      )
      .map(({ event }) => `${event.section}.${event.method}`);

   console.log(`${section}.${method}:: ${events.join(', ') || 'no events'}`);
});
//at()とは、特定のブロックハッシュを指定してインスタンスを作成するためのメソッドです。
//query.system.events()とは、システムのイベントを取得するためのメソッドです。
// retrieve Option<StakingLedger>
const ledger = await api.query.staking.ledger('EoukLS2Rzh6dZvMQSkqFy4zGvqeo14ron28Ue3yopVc8e3Q');
// retrieve ValidatorPrefs (will yield the default value)
const prefs = await api.query.staking.validators('EoukLS2Rzh6dZvMQSkqFy4zGvqeo14ron28Ue3yopVc8e3Q');

console.log(ledger.isNone, ledger.isSome); // true, false
console.log(JSON.stringify(prefs.toHuman())); // {"commission":"0"}
//ledger.isNoneとは、ledgerがNoneであるかどうかを取得するためのメソッドです。
// exists
const sizeY = await api.query.staking.validators.size('DB2mp5nNhbFN86J9hxoAog8JALMhDXgwvWMxrRMLNUFMEY4');
// non existent
const sizeN = await api.query.staking.validators.size('EoukLS2Rzh6dZvMQSkqFy4zGvqeo14ron28Ue3yopVc8e3Q');

console.log(sizeY.isZero(), sizeY.toNumber()); // false 4
console.log(sizeN.isZero(), sizeY.toNumber()); // true 0
// Retrieves the entries for all slashes, in all eras (no arg)
const allEntries = await api.query.staking.nominatorSlashInEra.entries();

// nominatorSlashInEra(EraIndex, AccountId) for the types of the key args
allEntries.forEach(([{ args: [era, nominatorId] }, value]) => {
   console.log(`${era}: ${nominatorId} slashed ${value.toHuman()}`);
});
//entries()とは、全てのエントリーを取得するためのメソッドです。
//argsとは、エントリーの引数を取得するためのメソッドです。
//toHuman()とは、人間が読みやすい形式に変換するためのメソッドです。
const info = await api.tx.balances
   .transfer(recipient, 123)
   .paymentInfo(sender);

// log relevant info, partialFee is Balance, estimated for current
console.log(`
  class=${info.class.toString()},
  weight=${info.weight.toString()},
  partialFee=${info.partialFee.toHuman()}
`);
//paymentInfo()とは、トランザクションの手数料を取得するためのメソッドです。
//classとは、トランザクションのクラスを取得するためのメソッドです。
//weightとは、トランザクションの重みを取得するためのメソッドです。
