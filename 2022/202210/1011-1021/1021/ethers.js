//getNetworkとは、ネットワークの情報を取得する関数
getNetwork().then((network) => console.log(network));
//etherscanprovider
new EtherscanProvider("homestead", "YourApiKeyToken");
etherscanProvider.getHistory("0x0000000000000000000000000000000000000000").then((history) => console.log(history));
//singerとは、署名する人のこと
//singer.connect(provider)とは、署名する人をproviderに接続すること
singer.connect(provider);
//contract.connect(singer)とは、contractをsingerに接続すること
contract.connect(singer);
contract.address;
//contract.addressとは、contractのアドレスを取得すること
//web3.eth.getBalanceとは、アドレスの残高を取得すること
//web3.eth.getBalance("0x0000000000000000000000000000000000000000").then((balance) => console.log(balance));
web3.eth.subscribe("newBlockHeaders", (error, result) => {

}
//web3.eth.Contractとは、web3のコントラクトを取得すること
//web3.eth.Contract(abi, address)とは、web3のコントラクトをabiとaddressを使って取得すること
contract.queryFilter(contract.filters.Transfer(null, null, null), 0).then((events) => console.log(events));
//contract.queryFilterとは、contractのイベントを取得すること
//contract.filters.Transfer(null, null, null)とは、contractのTransferイベントを取得すること
//new ethers.Contract(address, abi, provider)とは、ethersのコントラクトをaddressとabiとproviderを使って取得すること
new ethers.ContractFactory(abi, bytecode, signer).then((factory) => {
      factory.deploy().then((contract) => {
         contract.deployed().then((contract) => {
               contract.address;
         });
      });
}
//contract.deployed()とは、contractをデプロイすること
contract.deployed()
//contractFactory.interfaceとは、contractFactoryのインターフェースを取得すること
contractFactory.interface.encodeFunctionData("transfer", ["0x0000000000000000000000000000000000000000", 100]);
//erc20.addressとは、erc20のアドレスを取得すること
erc20.address;
//erc20.interfaceとは、erc20のインターフェースを取得すること
erc20.interface.encodeFunctionData("transfer", ["0x0000000000000000000000000000000000000000", 100]);
//erc20.on()とは、erc20のイベントを取得すること
erc20.on("Transfer", (from, to, value, event) => {
      console.log(from, to, value, event);
}
//erc20.symbolとは、erc20のシンボルを取得すること
erc20.symbol;
//erc20.totalSupplyとは、erc20のトータルサプライを取得すること
erc20.totalSupply;
//erc20.transfer()とは、erc20のトランスファーを実行すること
erc20.transfer("0x0000000000000000000000000000000000000000", 100);
//erc20.transferAndCall()とは、erc20のトランスファーアンドコールを実行すること
erc20.transferAndCall("0x0000000000000000000000000000000000000000", 100, "0x0000000000000000000000000000000000000000");
//erc20.transferFrom()とは、erc20のトランスファーフォームを実行すること
erc20.transferFrom("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", 100);
//erc20.transferFromAndCall()とは、erc20のトランスファーフォームアンドコールを実行すること
erc20.transferFromAndCall("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", 100, "0x0000000000000000000000000000000000000000");
//erc20.transferOwnership()とは、erc20のトランスファーオーナーシップを実行すること
erc20.transferOwnership("0x0000000000000000000000000000000000000000");
//erc20.withdraw()とは、erc20のウィズドローを実行すること
erc20.withdraw("0x0000000000000000000000000000000000000000", 100);
//erc20.withdraw()とは、erc20のウィズドローを実行すること
erc20.withdraw("0x0000000000000000000000000000000000000000", 100);
//erc20.filter.transfer()とは、erc20のトランスファーイベントを取得すること
erc20.filter.transfer().then((events) => console.log(events));
//abicoder.encode()とは、abicoderを使ってエンコードすること
abicoder.encode
//erhers.utils.getAddress()とは、アドレスを取得すること
ethers.utils.getAddress("0x0000000000000000000000000000000000000000");
//ethers.utils.bigNumberify()とは、bigNumberifyを使ってエンコードすること
ethers.utils.bigNumberify(100);
//ethers.utils.formatEther()とは、etherをフォーマットすること
ethers.utils.formatEther(100);
//ethers.utils.formatUnits()とは、unitsをフォーマットすること
ethers.utils.formatUnits(100, 18);
//ethers.utils.parseEther()とは、etherをパースすること
ethers.utils.parseEther(100);
//ethers.utils.parseUnits()とは、unitsをパースすること
ethers.utils.parseUnits(100, 18);
//singer.getAddress()とは、singerのアドレスを取得すること
singer.getAddress();
//singerとは、署名する人のこと
//singer.connect(provider)とは、署名する人をproviderに接続すること
singer.connect(provider);
//singer.sendTransaction()とは、singerのトランザクションを送信すること
singer.sendTransaction({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//singer.signMessage()とは、singerのメッセージを署名すること
singer.signMessage("0x0000000000000000000000000000000000000000");
//singer.signTransaction()とは、singerのトランザクションを署名すること
singer.signTransaction({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//provider.getBalance()とは、providerのバランスを取得すること
provider.getBalance("0x0000000000000000000000000000000000000000");
//providerとは、プロバイダーのこと
//provider.getCode()とは、providerのコードを取得すること
provider.getCode("0x0000000000000000000000000000000000000000");
//provider.getGasPrice()とは、providerのガスプライスを取得すること
provider.getGasPrice();
//プロバイダーとは、プロバイダーのこと
//provider.getBlock()とは、providerのブロックを取得すること
provider.getBlock(100);
//provider.getFeeData()とは、providerのフィードデータを取得すること
provider.getFeeData();
//provider.ready()とは、providerのレディを取得すること
provider.ready;
//provider.estimeteGas()とは、providerのガスを推定すること
provider.estimeteGas({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//provider.getTransaciton()とは、providerのトランザクションを取得すること
provider.getTransaciton("0x0000000000000000000000000000000000000000");
//singer.getChainId()とは、singerのチェーンIDを取得すること
singer.getChainId();
//singer.call()とは、singerのコールを実行すること
singer.call({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//singer.resolveName()とは、singerの名前を解決すること
singer.resolveName("0x0000000000000000000000000000000000000000");
//signer.signMessage()とは、signerのメッセージを署名すること
signer.signMessage("0x0000000000000000000000000000000000000000");
//signer.signTransaction()とは、signerのトランザクションを署名すること
signer.signTransaction({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//signer.checkTransaction()とは、signerのトランザクションをチェックすること
signer.checkTransaction({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//signer.populateTransaction()とは、signerのトランザクションをポピュレートすること
//populetaとは、人口を増やすこと
//new ethers.Contract()とは、新しいコントラクトを作成すること
new ethers.Contract("0x0000000000000000000000000000000000000000", abi, signer);
//new ethers.Wallet()とは、新しいウォレットを作成すること
new ethers.Wallet("0x0000000000000000000000000000000000000000", provider);
//ethers.Wallet.createRandom()とは、ランダムなウォレットを作成すること
ethers.Wallet.createRandom();
//ethers.Wallet.fromEncryptedJson()とは、暗号化されたjsonからウォレットを作成すること
ethers.Wallet.fromEncryptedJson("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000");
//ethers.Wallet.fromMnemonic()とは、ニーモニックからウォレットを作成すること
ethers.Wallet.fromMnemonic("0x0000000000000000000000000000000000000000");
//ethers.Wallet.fromEncryptedJsonSync()とは、暗号化されたjsonからウォレットを同期的に作成すること
ethers.Wallet.fromEncryptedJsonSync("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000");
//wallet.addressとは、ウォレットのアドレスを取得すること
wallet.address;
//wallet.encrypt()とは、ウォレットを暗号化すること
wallet.encrypt("0x0000000000000000000000000000000000000000");
//wallet.encryptSync()とは、ウォレットを同期的に暗号化すること
wallet.encryptSync("0x0000000000000000000000000000000000000000");
//wallet.mnemonicとは、ウォレットのニーモニックを取得すること
wallet.mnemonic;
//wallet.publicKeyとは、ウォレットのパブリックキーを取得すること
wallet.publicKey;
//wallet.signMessage()とは、ウォレットのメッセージを署名すること
wallet.signMessage("0x0000000000000000000000000000000000000000");
//wallet.signTransaction()とは、ウォレットのトランザクションを署名すること
wallet.signTransaction({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//wallet.sign()とは、ウォレットを署名すること
wallet.sign("0x0000000000000000000000000000000000000000");
//new ethers.VoidSigner()とは、新しいヴォイドサイナーを作成すること
new ethers.VoidSigner("0x0000000000000000000000000000000000000000", provider);
//jsonrpcProviderとは、jsonrpcプロバイダーのこと
//signer.providerとは、サイナーのプロバイダーを取得すること
signer.provider;
//signger.connectUnchecked()とは、サイナーをチェックされていない状態で接続すること
signer.connectUnchecked();
//new ethers.provider.etherscanProvider()とは、新しいetherscanプロバイダーを作成すること
new ethers.provider.etherscanProvider("0x0000000000000000000000000000000000000000");
//new ethers.provider.fallbackProvider()とは、新しいフォールバックプロバイダーを作成すること
new ethers.provider.fallbackProvider(["0x0000000000000000000000000000000000000000"]);
//new ethers.provider.InfuraProvider()とは、新しいインフラプロバイダーを作成すること
new ethers.provider.InfuraProvider("0x0000000000000000000000000000000000000000");
//provider.getHistory()とは、プロバイダーの履歴を取得すること
provider.getHistory("0x0000000000000000000000000000000000000000");
//provider.getLogs()とは、プロバイダーのログを取得すること
provider.getLogs({ to: "0x0000000000000000000000000000000000000000", value: 100 });
//network.nameとは、ネットワークの名前を取得すること
network.name;
//network.chainIdとは、ネットワークのチェーンIDを取得すること
network.chainId;
//block.hashとは、ブロックのハッシュを取得すること
block.hash;
//block.parentHashとは、ブロックの親ハッシュを取得すること
block.parentHash;
//block.numberとは、ブロックのナンバーを取得すること
block.number;
//block.timestampとは、ブロックのタイムスタンプを取得すること
block.timestamp;
//block.difficultyとは、ブロックの難易度を取得すること
block.difficulty;
//block.gasLimitとは、ブロックのガスリミットを取得すること
block.gasLimit;
//block.gasUsedとは、ブロックのガス使用量を取得すること
block.gasUsed;
//block.nonceとは、ブロックのノンスを取得すること
block.nonce;
//block.extraDataとは、ブロックのエクストラデータを取得すること
block.extraData;
//block.mixHashとは、ブロックのミックスハッシュを取得すること
block.mixHash;
//block.totalDifficultyとは、ブロックのトータル難易度を取得すること
block.totalDifficulty;
//filter.addressとは、フィルターのアドレスを取得すること
filter.address;
//filter.topicsとは、フィルターのトピックを取得すること
filter.topics;
//filter.fromBlockとは、フィルターのfromブロックを取得すること
filter.fromBlock;
//filter.toBlockとは、フィルターのtoブロックを取得すること
filter.toBlock;
//filter.blockHashとは、フィルターのブロックハッシュを取得すること
filter.blockHash;
//log.blockNumberとは、ログのブロックナンバーを取得すること
log.blockNumber;
//log.transactionIndexとは、ログのトランザクションインデックスを取得すること
log.transactionIndex;
//log.removedとは、ログが削除されたかどうかを取得すること
log.removed;
//log.addressとは、ログのアドレスを取得すること
log.address;
//log.dataとは、ログのデータを取得すること
log.data;
//log.topicsとは、ログのトピックを取得すること
log.topics;
//log.transactionHashとは、ログのトランザクションハッシュを取得すること
log.transactionHash;
//transactionRequest.toとは、トランザクションリクエストのtoを取得すること
transactionRequest.to;
//transactionRequest.fromとは、トランザクションリクエストのfromを取得すること
transactionRequest.from;
//transactionRequest.nonceとは、トランザクションリクエストのノンスを取得すること
transactionRequest.nonce;
//transactionRequest.gasLimitとは、トランザクションリクエストのガスリミットを取得すること
transactionRequest.gasLimit;
//transactionRequestとは、トランザクションリクエストのガスプライスを取得すること 
transactionRequest.gasPrice;
//transactionRequest.dataとは、トランザクションリクエストのデータを取得すること
transactionRequest.data;
//transaction.blockHashとは、トランザクションのブロックハッシュを取得すること
transaction.blockHash;
//transaction.blockNumberとは、トランザクションのブロックナンバーを取得すること
transaction.blockNumber;
//transaction.rawとは、トランザクションの生データを取得すること
transaction.raw;
//receipt.toとは、レシートのtoを取得すること
receipt.to;
//receipt.root
receipt.root;
//ethers.utils.isBytes()とは、バイトかどうかを判定すること
ethers.utils.isBytes("0x0000000000000000000000000000000000000000");
//ethers.utils.isBytesLike()とは、バイトライクかどうかを判定すること
ethers.utils.isBytesLike("0x0000000000000000000000000000000000000000");
//ethers.utils.isHexString()とは、16進数文字列かどうかを判定すること
ethers.utils.isHexString("0x0000000000000000000000000000000000000000");
//ethers.utils.arrayify()とは、16進数文字列をバイト配列に変換すること
ethers.utils.arrayify("0x0000000000000000000000000000000000000000");
//ethers.utils.concat()とは、バイト配列を連結すること
ethers.utils.concat(["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"]);
//ethers.utils.hexConcat()とは、16進数文字列を連結すること
ethers.utils.hexConcat(["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"]);
//ethers.utils.hexDataLength()とは、16進数文字列のデータ長を取得すること
ethers.utils.hexDataLength("0x0000000000000000000000000000000000000000");
//ethers.utils.hexDataSlice()とは、16進数文字列のデータを切り出すこと
ethers.utils.hexDataSlice("0x0000000000000000000000000000000000000000", 0, 32);
//ethers.utils.hexlify()とは、バイト配列を16進数文字列に変換すること
ethers.utils.hexlify([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
//ethers.utils.hexStripZeros()とは、16進数文字列の先頭の0を削除すること
ethers.utils.hexStripZeros("0x0000000000000000000000000000000000000000");
//ethers.constants.ethersymbolとは、ETHのシンボルを取得すること
ethers.constants.ethersymbol;
//ethers.utils.formatunits()とは、指定した単位に変換すること
ethers.utils.formatunits("1000000000000000000", "ether");
//ethers.utils.parseunits()とは、指定した単位に変換すること
ethers.utils.parseunits("1", "ether");
//ethers.utils.id()とは、文字列をハッシュ化すること
ethers.utils.id("0x0000000000000000000000000000000000000000");
//ethers.utils.keccak256()とは、文字列をハッシュ化すること
ethers.utils.keccak256("0x0000000000000000000000000000000000000000");
//ethers.utils.sha256()とは、文字列をハッシュ化すること
ethers.utils.sha256("0x0000000000000000000000000000000000000000");
//ethers.utils.id()とは、文字列をハッシュ化すること
ethers.utils.id("0x0000000000000000000000000000000000000000");
//ethers.hdnode.frommnemonic()とは、メンタルワードからHDノードを生成すること
ethers.hdnode.frommnemonic("0x0000000000000000000000000000000000000000");

