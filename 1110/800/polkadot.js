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

...
// create a keyring with some non-default values specified
const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
//Keyringとは、アカウントの生成や署名を行うためのクラスです。
//Keyringは、sr25519とed25519の2種類の暗号方式をサポートしています。
import { mnemonicGenerate } from '@polkadot/util-crypto';

...
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
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

...
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
   mnemonicGenerate,
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

...
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
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

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
