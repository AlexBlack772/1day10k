const { NodeClient, Network } = require('bcoin');
const network = Network.get('regtest');

const clientOptions = {
   network: network.type,
   port: network.rpcPort,
   apiKey: 'api-key'
}

const client = new NodeClient(clientOptions);

(async () => {
   const result = await client.getCoin(hash, index);
   console.log(result);
})();

//bcoinとは、bitcoinのnode.jsライブラリで、bitcoinのノードを操作することができる。
//NodeClientは、bitcoinのノードを操作するためのクラスで、コンストラクタにオプションを渡すことで、ノードの設定を行うことができる。
//getCoinメソッドは、指定したトランザクションのアウトプットを取得するメソッドで、引数には、トランザクションのハッシュとインデックスを渡す。
//ハッシュは、トランザクションのハッシュを、インデックスは、トランザクションのアウトプットのインデックスを渡す。
//
//実行結果
//{ version: 1,
//  height: 0,
//  value: 5000000000,
//  coinbase: true,
//  hash: '0000000000000000000000000000000000000000000000000000000000000000',
//  index: 0,
//  script: <Script: 04ffff001d01044c4f524d415049502f>,
//  address: null,
//  witness: <Witness: >,
//  covenants: [],
//  flags: 0,
//  depth: 0,
//  spent: false,
//  coinbase: true, 
//  hash: '0000000000000000000000000000000000000000000000000000000000000000',
//  index: 0,
