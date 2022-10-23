//provider.getBalance(address)とは、指定したアドレスの残高を取得する関数です。
provider.getBalance(address).then((balance) => {
   console.log(balance.toString());
}
//new ethers.Contract()とは、指定したアドレスのコントラクトを取得する関数です。
const contract = new ethers.Contract(address, abi, provider);
//contract.connect()とは、指定したアドレスのコントラクトに接続する関数です。
const contractWithSigner = contract.connect(signer);
//contract.addressとは、指定したアドレスのコントラクトのアドレスを取得する関数です。
console.log(contract.address);
//contract.resolvedAddressとは、指定したアドレスのコントラクトのアドレスを取得する関数です。
contract.resolvedAddress.then((address) => {
   console.log(address);
})
//contract.deployTransactionとは、指定したアドレスのコントラクトのデプロイトランザクションを取得する関数です。
contract.deployTransaction.then((tx) => {
   console.log(tx);
})
//contract.queryFilter()とは、指定したアドレスのコントラクトのイベントを取得する関数です。
contract.queryFilter(event, fromBlock, toBlock).then((events) => {
   console.log(events);
})
//contract.estimateGas()とは、指定したアドレスのコントラクトのガスを推定する関数です。
contract.estimateGas.transfer(to, amount).then((gasEstimate) => {
   console.log(gasEstimate);
})
//contract.isIndexed()とは、指定したアドレスのコントラクトのイベントがインデックスされているかを取得する関数です。
contract.isIndexed(event).then((indexed) => {
   console.log(indexed);
})
//インデックスとは、データベースの検索を高速化するために、データベースのテーブルに付与する情報のことです。
//contract.listeners()とは、指定したアドレスのコントラクトのリスナーを取得する関数です。
contract.listeners(event).then((listeners) => {
   console.log(listeners);
})
//contract.once()とは、指定したアドレスのコントラクトのイベントを一度だけ取得する関数です。
contract.once(event, filter, listener)
//contract.removeAllListeners()とは、指定したアドレスのコントラクトのリスナーを全て削除する関数です。
contract.removeAllListeners(event)
//contract.Method_name()とは、指定したアドレスのコントラクトのメソッドを実行する関数です。
contract.Method_name()
//contract.functions.method_name()とは、指定したアドレスのコントラクトのメソッドを実行する関数です。
contract.functions.method_name()
//overrides.fromoとは、指定したアドレスのコントラクトの送金元を指定する関数です。
overrides.from = signer.address;
//error.addressとは、指定したアドレスのコントラクトのエラーのアドレスを取得する関数です。
console.log(error.address);
//error.argsとは、指定したアドレスのコントラクトのエラーの引数を取得する関数です。
console.log(error.args);
//error.blockHashとは、指定したアドレスのコントラクトのエラーのブロックハッシュを取得する関数です。
console.log(error.blockHash);
//error.blockNumberとは、指定したアドレスのコントラクトのエラーのブロックナンバーを取得する関数です。
console.log(error.blockNumber);
//error.dataとは、指定したアドレスのコントラクトのエラーのデータを取得する関数です。
console.log(error.data);
//receipt.eventsとは、指定したアドレスのコントラクトのイベントを取得する関数です。
console.log(receipt.events);
//receipt.gasUsedとは、指定したアドレスのコントラクトのガスを取得する関数です。
console.log(receipt.gasUsed);
//receipt.statusとは、指定したアドレスのコントラクトのステータスを取得する関数です。
console.log(receipt.status);
//overrides.valueとは、指定したアドレスのコントラクトの送金額を指定する関数です。
overrides.value = ethers.utils.parseEther("1.0");
//contractWithSigner.transfer(to, amount, overrides)とは、指定したアドレスのコントラクトの送金を実行する関数です。
contractWithSigner.transfer(to, amount, overrides)
//receipt.events[n].decodeとは、指定したアドレスのコントラクトのイベントをデコードする関数です。
console.log(receipt.events[n].decode());
//receipt.events[n].decode(data, topics)とは、指定したアドレスのコントラクトのイベントをデコードする関数です。
console.log(receipt.events[n].decode(data, topics));
//receipt.events[n].argsとは、指定したアドレスのコントラクトのイベントの引数を取得する関数です。
console.log(receipt.events[n].args);
//error.argsとは、指定したアドレスのコントラクトのエラーの引数を取得する関数です。
console.log(error.args);
//error.transactionとは、指定したアドレスのコントラクトのエラーのトランザクションを取得する関数です。
console.log(error.transaction);
//overrides.blockTagとは、指定したアドレスのコントラクトのブロックタグを指定する関数です。
overrides.blockTag = 1234;
//contractWithSigner.estimateGas.Method_name()とは、指定したアドレスのコントラクトのメソッドのガスを推定する関数です。
contractWithSigner.estimateGas.Method_name()
//overrides.gasLimitとは、指定したアドレスのコントラクトのガスリミットを指定する関数です。
overrides.gasLimit = 1000000;
//receipt.getBlock()とは、指定したアドレスのコントラクトのブロックを取得する関数です。
receipt.getBlock()
//receipt.getTransaction()とは、指定したアドレスのコントラクトのトランザクションを取得する関数です。
receipt.getTransaction()
//receipt.getTransactionReceipt()とは、指定したアドレスのコントラクトのトランザクションレシートを取得する関数です。
receipt.getTransactionReceipt()
//receipt.wait()とは、指定したアドレスのコントラクトの待機を実行する関数です。
receipt.wait()
//ContractFactoryとは、指定したアドレスのコントラクトのファクトリーを取得する関数です。
const factory = new ethers.ContractFactory(abi, bytecode, signer);
//factory.deploy()とは、指定したアドレスのコントラクトのデプロイを実行する関数です。
factory.deploy()
//Contract.Factory.connect(address)とは、指定したアドレスのコントラクトのコネクトを実行する関数です。
const contract1 = Contract.Factory.connect(address);
//contract.populateTransaction.Method_name()とは、指定したアドレスのコントラクトのメソッドのトランザクションを実行する関数です。
contract.populateTransaction.Method_name()
//contractFactory.signerとは、指定したアドレスのコントラクトの署名者を取得する関数です。
console.log(contractFactory.signer);
//contractFactory.bytecodeとは、指定したアドレスのコントラクトのバイトコードを取得する関数です。
console.log(contractFactory.bytecode);
//contractFactory.signerとは、指定したアドレスのコントラクトの署名者を取得する関数です。
console.log(contractFactory.signer);
//contractFactory.interfaceとは、指定したアドレスのコントラクトのインターフェースを取得する関数です。
console.log(contractFactory.interface);
//contractFactory.deployTransactionとは、指定したアドレスのコントラクトのデプロイトランザクションを取得する関数です。
console.log(contractFactory.deployTransaction);
//contractFactory.deployed()とは、指定したアドレスのコントラクトのデプロイ済みを取得する関数です。
contractFactory.deployed()
//contractFactory.attach(address)とは、指定したアドレスのコントラクトのアタッチを実行する関数です。
contractFactory.attach(address)
//contractFactory.connect(signer)とは、指定したアドレスのコントラクトのコネクトを実行する関数です。
contractFactory.connect(signer)
//contractFactory.deploy()とは、指定したアドレスのコントラクトのデプロイを実行する関数です。
contractFactory.deploy()
//contractFactory.getDeployTransaction()とは、指定したアドレスのコントラクトのデプロイトランザクションを取得する関数です。
//abiとは、指定したアドレスのコントラクトのインターフェースを取得する関数です。
console.log(abi);
//ethers.utils.defaultAbiCoderとは、指定したアドレスのコントラクトのデフォルトABIコーダーを取得する関数です。
console.log(ethers.utils.defaultAbiCoder);
//abiCoder.encode(types, values)とは、指定したアドレスのコントラクトのエンコードを実行する関数です。
abiCoder.encode(types, values)
//abiCoder.decode(types, data)とは、指定したアドレスのコントラクトのデコードを実行する関数です。
abiCoder.decode(types, data)
//jsonabiとは、指定したアドレスのコントラクトのJSONABIを取得する関数です。
console.log(jsonabi);
//ethers.utils.Interfaceとは、指定したアドレスのコントラクトのインターフェースを取得する関数です。
const iface = new ethers.utils.Interface(jsonabi);
//iface.encodeFunctionData(functionFragment, params)とは、指定したアドレスのコントラクトのエンコードを実行する関数です。
iface.encodeFunctionData(functionFragment, params)
//iface.decodeFunctionResult(functionFragment, data)とは、指定したアドレスのコントラクトのデコードを実行する関数です。
iface.decodeFunctionResult(functionFragment, data)
//ethers.utils.FormatTypes.fullとは、指定したアドレスのコントラクトのフォーマットタイプを取得する関数です。
console.log(ethers.utils.FormatTypes.full);
//ethers.utils.FormatTypes.shortとは、指定したアドレスのコントラクトのフォーマットタイプを取得する関数です。
console.log(ethers.utils.FormatTypes.short);
//ethers.utils.FormatTypes.jsonとは、指定したアドレスのコントラクトのフォーマットタイプを取得する関数です。
