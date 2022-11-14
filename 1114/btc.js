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
