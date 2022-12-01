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
   //
async function main() {
   // Here we don't pass the (optional) provider, connecting directly to the default
   // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
   // the API has connected to the node and completed the initialisation process
   const api = await ApiPromise.create();

   // We only display a couple, then unsubscribe
   let count = 0;

   // Subscribe to the new headers on-chain. The callback is fired when new headers
   // are found, the call itself returns a promise with a subscription that can be
   // used to unsubscribe from the newHead subscription
   const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
      console.log(`Chain is at block: #${header.number}`);

      if (++count === 256) {
         unsubscribe();
         process.exit(0);
      }
   });
}

main().catch(console.error).finally(() => process.exit());
//api.rpc.chain.subscribeNewHeads((header) => {
//   console.log(`Chain is at block: #${header.number}`);
//});
//accountNonce()とは、アカウントのnonceを取得する関数です。
//nonceは、アカウントがトランザクションを送信するたびにインクリメントされる数値です。
accountNonce = async (account) => {
   const nonce = await api.query.system.accountNonce(account);
   return nonce.toNumber();
}
//aura()とは、Auraの構成要素を取得する関数です。
aura = async () => {
   const aura = await api.query.staking.eraElectionStatus();
   return aura.toHuman();
}
//authorFilter()とは、ブロックの作成者をフィルタリングする関数です。
authorFilter = async (author) => {
   const authorFilter = await api.query.system.account(author);
   return authorFilter.toHuman();
}
//authorityDiscoveryApi
authorityDiscoveryApi = async () => {
   const authorityDiscoveryApi = await api.query.authorityDiscovery.authorities();
   return authorityDiscoveryApi.toHuman();
}
//api.call.beefyApi.validatorSetとは、
//blockBuilder()とは、ブロックを構築する関数です。
blockBuilder = async () => {
   const blockBuilder = await api.query.blockBuilder.blockBuilder();
   return blockBuilder.toHuman();
}
//debugRuntimeApi()とは、デバッグランタイムAPIを取得する関数です。
debugRuntimeApi = async () => {
   const debugRuntimeApi = await api.query.debugRuntimeApi.debugRuntimeApi();
   return debugRuntimeApi.toHuman();
}
//grandpaApi()とは、Grandpa APIを取得する関数です。
//traceBlock()とは、ブロックをトレースする関数です。
traceBlock = async () => {
   const traceBlock = await api.query.trace.traceBlock();
   return traceBlock.toHuman();
}
//traceTransaction()とは、トランザクションをトレースする関数です。
traceTransaction = async () => {
   const traceTransaction = await api.query.trace.traceTransaction();
   return traceTransaction.toHuman();
}
//api.call.debugRuntimeApi.traceTransaction
//トレースとは、プログラムの実行中に発生したイベントを記録することです。
//applyExtrinsic()とは、トランザクションを適用する関数です。
applyExtrinsic = async () => {
   const applyExtrinsic = await api.query.trace.applyExtrinsic();
   return applyExtrinsic.toHuman();
}
//api.call.benchmark.dispatchBenchmarkとは、
//dispatchBenchmark()とは、ディスパッチベンチマークを取得する関数です。
dispatchBenchmark = async () => {
   const dispatchBenchmark = await api.query.benchmark.dispatchBenchmark();
   return dispatchBenchmark.toHuman();
}
//haskey()とは、キーが存在するかどうかを確認する関数です。
haskey = async (key) => {
   const haskey = await api.query.system.hasKey(key);
   return haskey.toHuman();
}
//hasSessionKey()とは、セッションキーが存在するかどうかを確認する関数です。
hasSessionKey = async (key) => {
   const hasSessionKey = await api.query.session.hasSessionKey(key);
   return hasSessionKey.toHuman();
}
//removeExtrinsic()とは、トランザクションを削除する関数です。
removeExtrinsic = async () => {
   const removeExtrinsic = await api.query.trace.removeExtrinsic();
   return removeExtrinsic.toHuman();
}
//rotateKeys()とは、キーを回転する関数です。
rotateKeys = async () => {
   const rotateKeys = await api.query.session.rotateKeys();
   return rotateKeys.toHuman();
}
//submitExtrinsic()とは、トランザクションを送信する関数です。
submitExtrinsic = async () => {
   const submitExtrinsic = await api.query.trace.submitExtrinsic();
   return submitExtrinsic.toHuman();
}
//epochAuthorship()とは、エポックの著作権を取得する関数です。
epochAuthorship = async () => {
   const epochAuthorship = await api.query.authorship.epochAuthorship();
   return epochAuthorship.toHuman();
}
//epochとは、ブロックチェーンの世代を指します。
//getFinalizedHead()とは、最終化されたヘッドを取得する関数です。
getFinalizedHead = async () => {
   const getFinalizedHead = await api.query.system.getFinalizedHead();
   return getFinalizedHead.toHuman();
}
//subscribeJustifications()とは、検証を購読する関数です。
subscribeJustifications = async () => {
   const subscribeJustifications = await api.query.system.subscribeJustifications();
   return subscribeJustifications.toHuman();
}
//getKeys()とは、キーを取得する関数です。
getKeys = async () => {
   const getKeys = await api.query.system.getKeys();
   return getKeys.toHuman();
}
//getKeysPaged()とは、ページングされたキーを取得する関数です。
getKeysPaged = async () => {
   const getKeysPaged = await api.query.system.getKeysPaged();
   return getKeysPaged.toHuman();
}
//getPairs()とは、ペアを取得する関数です。
getPairs = async () => {
   const getPairs = await api.query.system.getPairs();
   return getPairs.toHuman();
}
//ページングとは、データを複数のページに分割することです。
//getStorageEntries()とは、ストレージエントリを取得する関数です。
getStorageEntries = async () => {
   const getStorageEntries = await api.query.system.getStorageEntries();
   return getStorageEntries.toHuman();
}
//instantiate()とは、インスタンスを生成する関数です。
instantiate = async () => {
   const instantiate = await api.query.system.instantiate();
   return instantiate.toHuman();
}  
//rentProjection()とは、レントプロジェクションを取得する関数です。
rentProjection = async () => {
   const rentProjection = await api.query.system.rentProjection();
   return rentProjection.toHuman();
}
//レントプロジェクションとは、何らかの資産をレンタルすることです。



