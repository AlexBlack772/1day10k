const { NodeClient, Network } = require('bcoin');
const network = Network.get('regtest');

// network type derived from bcoin object, client object stores API key
const clientOptions = {
   network: network.type,
   port: network.rpcPort,
   apiKey: 'api-key'
}

const client = new NodeClient(clientOptions);

(async () => {
   const clientinfo = await client.getInfo();
   console.log(clientinfo);
})();
//Networkとは、bcoinのネットワークの設定を保持するオブジェクト
//NodeClientとは、bcoinのノードに接続するためのクライアントオブジェクト

const { NodeClient, WalletClient } = require('bclient');
const { Network } = require('bcoin');
const network = Network.get('regtest');

const clientOptions = {
   network: network.type,
   port: network.rpcPort,
   apiKey: 'api-key'
}

const walletOptions = {
   network: network.type,
   port: network.walletPort,
   apiKey: 'api-key'
}

const client = new NodeClient(clientOptions);
const wallet = new WalletClient(walletOptions);
//walletClientはwalletの操作を行うためのクライアントオブジェクト
//netoworkとは、bcoinのネットワークの設定を保持するオブジェクト

const { NodeClient, Network } = require('bcoin');
const network = Network.get('regtest');

const clientOptions = {
   network: network.type,
   port: network.rpcPort,
   apiKey: 'api-key'
}

const client = new NodeClient(clientOptions);

(async () => {
   const clientinfo = await client.getInfo();
   console.log(clientinfo);
})();
//bcoinのノードに接続するためのクライアントオブジェクト
const { NodeClient, Network } = require('bcoin');
const network = Network.get('regtest');

const clientOptions = {
   network: network.type,
   port: network.rpcPort,
   apiKey: 'api-key'
}

const client = new NodeClient(clientOptions);

(async () => {
   const mempool = await client.getMempool();
   console.log(mempool);
})().catch((err) => {
   console.error(err.stack);
});
//regtestとは、bcoinのネットワークの設定を保持するオブジェクト
