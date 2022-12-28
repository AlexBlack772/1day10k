const lastHdr = await api.rpc.chain.getHeader();

// Get a decorated api instance at a specific block
const apiAt = await api.at(lastHdr.hash);

// query the balance at this point of the chain
const { data: { free } } = await apiAt.query.system.account(ADDR);
console.log(api.consts.babe.epochDuration.toNumber());

// The amount required to create a new account
console.log(api.consts.balances.existentialDeposit.toNumber());

// The amount required per byte on an extrinsic
console.log(api.consts.transactionPayment.transactionByteFee.toNumber());
//depositOf(AccountId32) -> Balance
//api.query.alliance.depositOf(ADDR)
//api.query.alliance.depositOf(ADDR).then((balance) => {
//  console.log(balance.toNumber());
//});
//members() -> Vec<AccountId32>
//allianceMotion
//api.query.allianceMotion.members().then((members) => {
//  console.log(members);
//});
//api.query.allianceMotion.members
//signAndSendとは、署名と送信を同時に行うメソッドです。
//signAndSend(ADDR, { nonce: -1 }, ({ status }) => {
//  if (status.isInBlock) {
//    console.log(`Completed at block hash #${status.asInBlock.toString()}`);
//  } else {
//    console.log(`Current status: ${status.type}`);
//  }
//}).catch((error) => {
//  console.error(error);
//  process.exit(-1);
//});
//api.tx.allianceMotion
//generateProof()とは、メンバーの証明書を生成するメソッドです。
import { Keyring } from '@polkadot/keyring';


// create a keyring with some non-default values specified
const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
//Keyringとは、アカウントの生成や署名を行うためのクラスです。
//Keyringは、sr25519とed25519の2種類の暗号方式をサポートしています。
import { mnemonicGenerate } from '@polkadot/util-crypto';


// generate a mnemonic with default params (we can pass the number
// of words required 12, 15, 18, 21 or 24, less than 12 words, while
// valid, is not supported since it is more-easily crackable)
const mnemonic = mnemonicGenerate();

// create & add the pair to the keyring with the type and some additional
// metadata specified
const pair = keyring.addFromUri(mnemonic, { name: 'first pair' }, 'ed25519');

// the pair has been added to our keyring
console.log(keyring.pairs.length, 'pairs available');

// log the name & address (the latter encoded with the ss58Format)
console.log(pair.meta.name, 'has address', pair.address);
import { cryptoWaitReady, mnemonicGenerate1 } from '@polkadot/util-crypto';


// we only need to do this once per app, somewhere in our init code
// (when using the API and waiting on `isReady` this is done automatically)
await cryptoWaitReady();

// create an ed25519 pair from the mnemonic
const ep = keyring.createFromUri(mnemonic, { name: 'ed25519' }, 'ed25519');

// create an sr25519 pair from the mnemonic (keyring defaults)
const sp = keyring.createFromUri(mnemonic, { name: 'sr25519' });

// log the addresses, different cryptos, different results
console.log(ep.meta.name, ep.address);
console.log(sp.meta.name, sp.address);
//createFromUri()とは、mnemonicからアカウントを生成するメソッドです。
const {
   mnemonicGenerate2,
   mnemonicToMiniSecret,
   mnemonicValidate,
   ed25519PairFromSecret
} = require('@polkadot/util-crypto');

async function main() {
   // Create mnemonic string for Alice using BIP39
   const mnemonicAlice = mnemonicGenerate();

   console.log(`Generated mnemonic: ${mnemonicAlice}`);

   // Validate the mnemonic string that was generated
   const isValidMnemonic = mnemonicValidate(mnemonicAlice);

   console.log(`isValidMnemonic: ${isValidMnemonic}`);

   // Create valid Substrate-compatible seed from mnemonic
   const seedAlice = mnemonicToMiniSecret(mnemonicAlice);

   // Generate new public/secret keypair for Alice from the supplied seed
   const { publicKey, secretKey } = ed25519PairFromSecret(seedAlice);
}

main().catch(console.error).finally(() => process.exit());

//mnemonicGenerate()とは、BIP39に準拠したランダムなmnemonicを生成するメソッドです。
//mnemonicToMiniSecret()とは、mnemonicからSubstrateに対応したseedを生成するメソッドです。
const {
   naclDecrypt,
   naclEncrypt,
   randomAsU8a
} = require('@polkadot/util-crypto');
const {
   stringToU8a,
   u8aToString
} = require('@polkadot/util');

async function main() {
   const secret = randomAsU8a();
   const messagePreEncryption = stringToU8a('super secret message');

   // Encrypt the message
   const { encrypted, nonce } = naclEncrypt(messagePreEncryption, secret);

   // Show contents of the encrypted message
   console.log(`Encrypted message: ${JSON.stringify(encrypted, null, 2)}`);

   // Decrypt the message
   const messageDecrypted = naclDecrypt(encrypted, nonce, secret);

   // Convert each Uint8Array to a string for comparison
   const isMatch = u8aToString(messagePreEncryption) === u8aToString(messageDecrypted);

   // Verify that the decrypted message matches the original message
   console.log(`Does the decrypted message match the original message? ${isMatch}`);
}

main().catch(console.error).finally(() => process.exit());
//announcements()とは、アナウンスを取得するメソッドです。
api.query.alliance.announcements
//authorVrfRandomness()とは、VRFランダムネスを取得するメソッドです。
api.query.babe.authorVrfRandomness
//authorities()とは、Babeの権限者を取得するメソッドです。
api.query.babe.authorities
//segmentIndex()とは、セグメントインデックスを取得するメソッドです。
api.query.babe.segmentIndex
import Identicon from '@polkadot/react-identicon';

function 
render() {
   // address is an ss58-encoded address or publicKey (hex string or Uint8Array)
   const { address } = this.props;
   // size (optional) is a number, indicating the size (in pixels, 64 as default)
   const size = 32;
   // theme (optional), depicts the type of icon, one of
   // 'polkadot', 'substrate' (default), 'beachball' or 'jdenticon'
   const theme = 'polkadot';

   // standard className & style props are also available
   return (
      <Identicon
         value={address}
         size={size}
         theme={theme}
      />
   );
}
//Identiconとは、アドレスをアイコン化するコンポーネントです。
import keyring1 from '@polkadot/ui-keyring';
import { cryptoWaitReady2 } from '@polkadot/util-crypto';

cryptoWaitReady().then(() => {
   // load all available addresses and accounts
   keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

   // additional initialization here, including rendering
});
//keyringとは、アカウントを管理するクラスです。
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
//chain.getBlockHash()とは、ブロックハッシュを取得するメソッドです。
api.rpc.state.call
//state.call()とは、ステート呼び出しを行うメソッドです。
api.rpc.state.getKeys
//state.getKeys()とは、キーを取得するメソッドです。
api.rpc.state.getKeysPaged
//state.getKeysPaged()とは、ページングされたキーを取得するメソッドです。
//getChildReadProof()とは、子の読み取り証明書を取得するメソッドです。
api.rpc.state.getChildReadProof
//「Returns proof of storage for child key entries at a specific block state.」とは、特定のブロックステートで子キーエントリのストレージ証明書を返します。
getRuntimeVersion
//getRuntimeVersion()とは、ランタイムバージョンを取得するメソッドです。
api.rpc.system.accountNextIndex
//system.accountNextIndex()とは、アカウントの次のインデックスを取得するメソッドです。
//getStorageSize()とは、ストレージサイズを取得するメソッドです。
api.rpc.system.getStorageSize
//genSyncSpec()とは、同期仕様を生成するメソッドです。
api.rpc.system.genSyncSpec
//addLogFilter()とは、ログフィルターを追加するメソッドです。
api.rpc.system.addLogFilter
//removeLogFilter()とは、ログフィルターを削除するメソッドです。
api.rpc.system.removeLogFilter
//chainType()とは、チェーンタイプを取得するメソッドです。
api.rpc.system.chainType
//localPeerId()とは、ローカルピアIDを取得するメソッドです。
api.rpc.system.localPeerId
//nodeRoles()とは、ノードロールを取得するメソッドです。
api.rpc.system.nodeRoles
//removeReservedPeer()とは、予約済みピアを削除するメソッドです。
api.rpc.system.removeReservedPeer
//reservedPeers()とは、予約済みピアを取得するメソッドです。
api.rpc.system.reservedPeers
//deletionWeightLimit()とは、削除重量制限を取得するメソッドです。
api.rpc.system.deletionWeightLimit
//depositPerItem()とは、アイテムごとの預金を取得するメソッドです。
api.rpc.system.depositPerItem
//schedule()とは、スケジュールを取得するメソッドです。
api.rpc.system.schedule
//version()とは、バージョンを取得するメソッドです。
api.rpc.system.version
//convictionVoting()とは、ConvictionVotingを取得するメソッドです。
api.rpc.system.convictionVoting
//didSetUncles()とは、Unclesを設定したかどうかを取得するメソッドです。
api.rpc.system.didSetUncles
//executionFee()とは、実行料金を取得するメソッドです。
api.rpc.system.executionFee
//genesisSlot()とは、ジェネシススロットを取得するメソッドです。
api.rpc.system.genesisSlot
//bountyApprovals()とは、バウンティ承認を取得するメソッドです。
api.rpc.system.bountyApprovals
//bountyCount()とは、バウンティカウントを取得するメソッドです。
api.rpc.system.bountyCount
//bountyCuratorDeposit()とは、バウンティカレータ預金を取得するメソッドです。
api.rpc.system.bountyCuratorDeposit
//desiredTargets()とは、目標を取得するメソッドです。
api.rpc.system.desiredTargets
//maxApprovals()とは、最大承認を取得するメソッドです。
api.rpc.system.maxApprovals
//maxBountyValue()とは、最大バウンティ値を取得するメソッドです。
api.rpc.system.maxBountyValue
//maxCurators()とは、最大カレータを取得するメソッドです。
api.rpc.system.maxCurators
//queues()とは、キューを取得するメソッドです。
api.rpc.system.queues
//queueTotals()とは、キュー合計を取得するメソッドです。
api.rpc.system.queueTotals
//nextForced()とは、次の強制を取得するメソッドです。
api.rpc.system.nextForced
//lottery()とは、ロトリーを取得するメソッドです。
api.rpc.system.lottery
//nominationPools()とは、ノミネーションプールを取得するメソッドです。
api.rpc.system.nominationPools
//lastPoolId()とは、最後のプールIDを取得するメソッドです。
api.rpc.system.lastPoolId
//subPoolsStorageとは、サブプールストレージを取得するメソッドです。
api.rpc.system.subPoolsStorage
//subPoolsStorageSizeとは、サブプールストレージサイズを取得するメソッドです。
api.rpc.system.subPoolsStorageSize
//subPoolsStorageHashとは、サブプールストレージハッシュを取得するメソッドです。
api.rpc.system.subPoolsStorageHash
//subPoolsStorageSizeとは、サブプールストレージサイズを取得するメソッドです。
api.rpc.system.subPoolsStorageSize
//subPoolsStorageHashとは、サブプールストレージハッシュを取得するメソッドです。
api.rpc.system.subPoolsStorageHash
//preimageとは、プレイメージを取得するメソッドです。
api.rpc.system.preimage
//statusForとは、ステータスを取得するメソッドです。
api.rpc.system.statusFor
//idToIndexとは、IDからインデックスを取得するメソッドです。
api.rpc.system.idToIndex
//indexToIdとは、インデックスからIDを取得するメソッドです。
api.rpc.system.indexToId
//nextSessionRotationとは、次のセッション回転を取得するメソッドです。
api.rpc.system.nextSessionRotation
//decidingCountとは、決定カウントを取得するメソッドです。
api.rpc.system.decidingCount
//decidingAtとは、決定時刻を取得するメソッドです。
api.rpc.system.decidingAt
//trackQueueとは、トラックキューを取得するメソッドです。
api.rpc.system.trackQueue
//activeRecoveries()とは、アクティブリカバリを取得するメソッドです。
api.rpc.system.activeRecoveries
//referenda()とは、参政権を取得するメソッドです。
api.rpc.system.referenda
//referendumCount()とは、参政権カウントを取得するメソッドです。
//decidingCountとは、決定カウントを取得するメソッドです。
api.rpc.system.decidingCount
//decidingAtとは、決定時刻を取得するメソッドです。
api.rpc.system.decidingAt
//incompleteSince()とは、不完全な時刻を取得するメソッドです。
api.rpc.system.incompleteSince
//lookup()とは、ルックアップを取得するメソッドです。
api.rpc.system.lookup
//disabledValidators()とは、無効化されたバリデータを取得するメソッドです。
api.rpc.system.disabledValidators
//nextKeys()とは、次のキーを取得するメソッドです。
api.rpc.system.nextKeys
//bids()とは、入札を取得するメソッドです。
api.rpc.system.bids
//api.query.society.suspendedCandidates
//bondedEras()とは、バインドされたエラを取得するメソッドです。
api.rpc.system.bondedEras
//strikes()とは、ストライクを取得するメソッドです。
api.rpc.system.strikes
//invulnerables()とは、無敵を取得するメソッドです。
api.rpc.system.invulnerables
//suspendedMembers()とは、停止されたメンバーを取得するメソッドです。
api.rpc.system.suspendedMembers
//vouching()とは、バウチングを取得するメソッドです。
api.rpc.system.vouching
//suspendedCandidates()とは、停止された候補者を取得するメソッドです。
api.rpc.system.suspendedCandidates
//activeEra()とは、アクティブエラを取得するメソッドです。
api.rpc.system.activeEra
//Eraとは、エラを取得するメソッドです。
api.rpc.system.Era
//activeEraStart()とは、アクティブエラ開始時刻を取得するメソッドです。
api.rpc.system.activeEraStart
//canceledSlashPayouts()とは、キャンセルされたスラッシュペイアウトを取得するメソッドです。
api.rpc.system.canceledSlashPayouts
//erasStakersClipped()とは、エラステーカークリップを取得するメソッドです。
api.rpc.system.erasStakersClipped
//erasValidatorRewards()とは、エラバリデータリワードを取得するメソッドです。
api.rpc.system.erasValidatorRewards
//invulnerables()とは、無敵を取得するメソッドです。
api.rpc.system.invulnerables
//nominatorsFor()とは、ノミネーターを取得するメソッドです。
api.rpc.system.nominatorsFor
//erasRewardPoints()とは、エラリワードポイントを取得するメソッドです。
api.rpc.system.erasRewardPoints
//minValidatorBond()とは、バリデータ最小バインドを取得するメソッドです。
api.rpc.system.minValidatorBond
// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
   // Initialise the provider to connect to the local node
   const provider = new WsProvider('ws://127.0.0.1:9944');

   // Create the API and wait until ready
   const api = await ApiPromise.create({ provider });

   // Retrieve the chain & node information information via rpc calls
   const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
   ]);

   console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

main().catch(console.error).finally(() => process.exit());

// apipromise.create()とは、APIを作成するメソッドです。

const { ApiPromise1 } = require('@polkadot/api');

async function main() {
   // Create a new instance of the api
   const api = await ApiPromise.create();

   // Subscribe to chain updates and log the current block number on update.
   const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
      console.log(`Chain is at block: #${header.number}`);
   });

   // In this example we're calling the unsubscribe() function that is being
   // returned by the api call function after 20s.
   setTimeout(() => {
      unsubscribe();
      console.log('Unsubscribed');
   }, 20000);
}

main().catch(console.error);
//api.rpc.chain.subscribeNewHeads()とは、新しいヘッドを購読するメソッドです。
const { ApiPromise2 } = require('@polkadot/api');

// Our address for Alice on the dev chain
const ALICE1 = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

async function main() {
   // Create our API with a default connection to the local node
   const api = await ApiPromise.create();

   // Make our basic chain state/storage queries, all in one go
   const [{ nonce: accountNonce }, now, validators] = await Promise.all([
      api.query.system.account(ALICE),
      api.query.timestamp.now(),
      api.query.session.validators()
   ]);

   console.log(`accountNonce(${ALICE}) ${accountNonce}`);
   console.log(`last block timestamp ${now.toNumber()}`);

   if (validators && validators.length > 0) {
      // Retrieve the balances for all validators
      const validatorBalances = await Promise.all(
         validators.map((authorityId) =>
            api.query.system.account(authorityId)
         )
      );

      // Print out the authorityIds and balances of all validators
      console.log('validators', validators.map((authorityId, index) => ({
         address: authorityId.toString(),
         balance: validatorBalances[index].data.free.toHuman(),
         nonce: validatorBalances[index].nonce.toHuman()
      })));
   }
}

main().catch(console.error).finally(() => process.exit());

//toHuman()とは、ヒューマンリーダブルな形式に変換するメソッドです。

// Import the API
const { ApiPromise3 } = require('@polkadot/api');

// Our address for Alice on the dev chain
const ALICE2 = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB2 = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

async function main() {
   // Create our API with a default connection to the local node
   const api = await ApiPromise.create();

   // Retrieve the last block header, extracting the hash and parentHash
   const { hash, parentHash } = await api.rpc.chain.getHeader();

   console.log(`last header hash ${hash.toHex()}`);

   // Retrieve the balance at the preceding block for Alice using an at api
   const apiAt = await api.at(parentHash);
   const balance = await apiAt.query.system.account(ALICE);

   console.log(`Alice's balance at ${parentHash.toHex()} was ${balance.data.free}`);

   // Now perform a multi query, returning multiple balances at once
   const balances = await api.query.system.account.multi([ALICE, BOB]);

   console.log(`Current balances for Alice and Bob are ${balances[0].data.free} and ${balances[1].data.free}`);
}

main().catch(console.error).finally(() => process.exit());
//api.at()とは、指定したブロックハッシュを使用してAPIを作成するメソッドです。
//api.query.system.account.multi()とは、複数のアカウントの情報を取得するメソッドです。
// Import the API, Keyring and some utility functions
const { ApiPromise4 } = require('@polkadot/api');
const { Keyring4 } = require('@polkadot/keyring');

const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

async function main() {
   // Instantiate the API
   const api = await ApiPromise.create();

   // Construct the keyring after the API (crypto has an async init)
   const keyring = new Keyring({ type: 'sr25519' });

   // Add Alice to our keyring with a hard-derivation path (empty phrase, so uses dev)
   const alice = keyring.addFromUri('//Alice');

   // Create a extrinsic, transferring 12345 units to Bob
   const transfer = api.tx.balances.transfer(BOB, 12345);

   // Sign and send the transaction using our account
   const hash = await transfer.signAndSend(alice);

   console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());

//api.tx.balances.transfer()とは、トランザクションを作成するメソッドです。

// Import the API
const { ApiPromise5 } = require('@polkadot/api');

async function main() {
   // Create our API with a default connection to the local node
   const api = await ApiPromise.create();

   // Subscribe to system events via storage
   api.query.system.events((events) => {
      console.log(`\nReceived ${events.length} events:`);

      // Loop through the Vec<EventRecord>
      events.forEach((record) => {
         // Extract the phase, event and the event types
         const { event, phase } = record;
         const types = event.typeDef;

         // Show what we are busy with
         console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
         console.log(`\t\t${event.meta.documentation.toString()}`);

         // Loop through each of the parameters, displaying the type and data
         event.data.forEach((data, index) => {
            console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
         });
      });
   });
}

main().catch((error) => {
   console.error(error);
   process.exit(-1);
});

//api.query.system.events()とは、イベントを購読するメソッドです。

// Import the API & Provider and some utility functions
const { ApiPromise6 } = require('@polkadot/api');

// Import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const testKeyring = require('@polkadot/keyring/testing');

// Utility function for random values
const { randomAsU8a1 } = require('@polkadot/util-crypto');

// Some constants we are using in this sample
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const AMOUNT = 10000;

async function main() {
   // Create the API and wait until ready
   const api = await ApiPromise.create();

   // Create an instance of our testing keyring
   // If you're using ES6 module imports instead of require, just change this line to:
   // const keyring = testKeyring();
   const keyring = testKeyring.default();

   // Get the nonce for the admin key
   const { nonce } = await api.query.system.account(ALICE);

   // Find the actual keypair in the keyring
   const alicePair = keyring.getPair(ALICE);

   // Create a new random recipient
   const recipient = keyring.addFromSeed(randomAsU8a(32)).address;

   console.log('Sending', AMOUNT, 'from', alicePair.address, 'to', recipient, 'with nonce', nonce.toString());

   // Do the transfer and track the actual status
   api.tx.balances
      .transfer(recipient, AMOUNT)
      .signAndSend(alicePair, { nonce }, ({ events = [], status }) => {
         console.log('Transaction status:', status.type);

         if (status.isInBlock) {
            console.log('Included at block hash', status.asInBlock.toHex());
            console.log('Events:');

            events.forEach(({ event: { data, method, section }, phase }) => {
               console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
         } else if (status.isFinalized) {
            console.log('Finalized block hash', status.asFinalized.toHex());

            process.exit(0);
         }
      });
}

main().catch(console.error);

// Import the API & Provider and some utility functions
const { ApiPromise, WsProvider } = require('@polkadot/api');

// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const testKeyring = require('@polkadot/keyring/testing');

const fs = require('fs');

async function main() {
   // Initialise the provider to connect to the local node
   const provider = new WsProvider('ws://127.0.0.1:9944');

   // Create the API and wait until ready (optional provider passed through)
   const api = await ApiPromise.create({ provider });

   // Retrieve the upgrade key from the chain state
   const adminId = await api.query.sudo.key();

   // Find the actual keypair in the keyring (if this is a changed value, the key
   // needs to be added to the keyring before - this assumes we have defaults, i.e.
   // Alice as the key - and this already exists on the test keyring)
   const keyring = testKeyring.default();
   const adminPair = keyring.getPair(adminId.toString());

   // Retrieve the runtime to upgrade
   const code = fs.readFileSync('./test.wasm').toString('hex');
   const proposal = api.tx.system && api.tx.system.setCode
      ? api.tx.system.setCode(`0x${code}`) // For newer versions of Substrate
      : api.tx.consensus.setCode(`0x${code}`); // For previous versions

   console.log(`Upgrading from ${adminId}, ${code.length / 2} bytes`);

   // Perform the actual chain upgrade via the sudo module
   api.tx.sudo
      .sudo(proposal)
      .signAn
Send(adminPair, ({ events = [], status }) => {
         console.log('Proposal status:', status.type);

         if (status.isInBlock) {
            console.error('You have just upgraded your chain');

            console.log('Included at block hash', status.asInBlock.toHex());
            console.log('Events:');

            console.log(JSON.stringify(events.toHuman(), null, 2));
         } else if (status.isFinalized) {
            console.log('Finalized block hash', status.asFinalized.toHex());

            process.exit(0);
         }
      });
}

main().catch((error) => {
   console.error(error);
   process.exit(-1);
});
//api.tx.alliance.addUnscrupulousItems
api.tx.alliance.addUnscrupulousItems()
//api.tx.alliance.addUnscrupulousItemsAndSend
//closeとは、チャネルを閉じるメソッドです。
api.tx.alliance.close()
//closeOldWeight()とは、古い重みを閉じるメソッドです。
api.tx.alliance.closeOldWeight()
//api.tx.alliance.disband()とは、組織を解散するメソッドです。
api.tx.alliance.disband()
//elevateAlly()とは、盟友を昇格させるメソッドです。
api.tx.alliance.elevateAlly()
veto()
//api.tx.alliance.veto()とは、投票を否決するメソッドです。
api.tx.alliance.veto()
//approveTransfer()とは、転送を承認するメソッドです。
api.tx.alliance.approveTransfer()
//api.tx.alliance.approveTransferAndSend()とは、転送を承認し、送信するメソッドです。
api.tx.alliance.approveTransferAndSend()
//transferOwnership()とは、所有権を移転するメソッドです。
api.tx.alliance.transferOwnership()
//forceUnreserve()とは、強制的に予約を解除するメソッドです。
api.tx.alliance.forceUnreserve()
//setBalance()とは、残高を設定するメソッドです。
api.tx.alliance.setBalance()
//acceptCurator()とは、カテゴリーのカテゴリーを受け入れるメソッドです。
api.tx.alliance.acceptCurator()
//awardBounty()とは、賞金を与えるメソッドです。
api.tx.alliance.awardBounty()
//claimBounty()とは、賞金を請求するメソッドです。
api.tx.alliance.claimBounty()
//closeBounty()とは、賞金を閉じるメソッドです。
api.tx.alliance.closeBounty()
//extendBountyExpiry()とは、賞金の有効期限を延長するメソッドです。
api.tx.alliance.extendBountyExpiry()
//proposeBounty()とは、賞金を提案するメソッドです。
api.tx.alliance.proposeBounty()
//proposeCurator()とは、カテゴリーのカテゴリーを提案するメソッドです。
api.tx.alliance.proposeCurator()
//unassignCurator()とは、カテゴリーのカテゴリーを割り当て解除するメソッドです。
api.tx.alliance.unassignCurator()
//updateBounty()とは、賞金を更新するメソッドです。
api.tx.alliance.updateBounty()
//updateBountyValue()とは、賞金の価値を更新するメソッドです。
api.tx.alliance.updateBountyValue()
//claimChildBounty()とは、子賞金を請求するメソッドです。
api.tx.alliance.claimChildBounty()
//callOldWeight()とは、古い重みを呼び出すメソッドです。
api.tx.contracts.callOldWeight()
//instantiate()とは、インスタンスを生成するメソッドです。
api.tx.contracts.instantiate()
//instantiateWithCode()とは、コードを使用してインスタンスを生成するメソッドです。
//undelegate()とは、委任を解除するメソッドです。
api.tx.staking.undelegate()
//unbond()とは、バインドを解除するメソッドです。
api.tx.staking.unbond()
//withdrawUnbonded()とは、バインドされていない残高を引き出すメソッドです。
api.tx.staking.withdrawUnbonded()
//withdrawUnbondedUpdate()とは、バインドされていない残高を引き出し、更新するメソッドです。
api.tx.staking.withdrawUnbondedUpdate()
//api.tx.staking.withdrawUnbondedAndSend()とは、バインドされていない残高を引き出し、送信するメソッドです。
api.tx.staking.withdrawUnbondedAndSend()
//api.tx.staking.withdrawUnbondedUpdateAndSend()とは、バインドされていない残高を引き出し、更新し、送信するメソッドです。
api.tx.staking.withdrawUnbondedUpdateAndSend()
//api.tx.staking.withdrawUnbondedAndSend()とは、バインドされていない残高を引き出し、送信するメソッドです。
api.tx.staking.withdrawUnbondedAndSend()
//api.tx.staking.withdrawUnbondedUpdateAndSend()とは、バインドされていない残高を引き出し、更新し、送信するメソッドです。
api.tx.staking.withdrawUnbondedUpdateAndSend()
//account()とは、アカウントを取得するメソッドです。
api.query.system.account()
//api.query.system.accountAndIndex()とは、アカウントとインデックスを取得するメソッドです。
api.query.system.accountAndIndex()
//api.query.system.accountNonce()とは、アカウントのノンスを取得するメソッドです。
api.query.system.accountNonce()
//api.query.system.accountNonceAt()とは、アカウントのノンスを取得するメソッドです。
api.query.system.accountNonceAt()
//api.query.system.accountNonceAtAndIndex()とは、アカウントのノンスとインデックスを取得するメソッドです。
api.query.system.accountNonceAtAndIndex()
//authrityDiscovery()とは、権限の発見を取得するメソッドです。
api.query.session.authrityDiscovery()
//currentEpoch()とは、現在のエポックを取得するメソッドです。
api.query.session.currentEpoch()
//currentIndex()とは、現在のインデックスを取得するメソッドです。
api.query.session.currentIndex()
//generateSessionKeys()とは、セッションキーを生成するメソッドです。
api.tx.session.generateSessionKeys()
//setKeys()とは、キーを設定するメソッドです。
api.tx.session.setKeys()
//collectCollationInfo()とは、コレクション情報を取得するメソッドです。
api.query.sharding.collectCollationInfo()
//
