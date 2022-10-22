//ethersjsとは、EthereumのためのJavaScriptライブラリです。
//provider.getBalance()とは、指定したアドレスの残高を取得するメソッドです。
provider.getBalance(0x1234567890123456789012345678901234567890).then((balance) => {

      // "balance" is a BigNumber; convert it to a decimal string
      console.log(balance.toString());
})
//provider.getCode()とは、指定したアドレスのコードを取得するメソッドです。
provider.getCode(0x1234567890123456789012345678901234567890)
//provider.getStorageAt()とは、指定したアドレスのストレージを取得するメソッドです。
provider.getStorageAt(0x1234567890123456789012345678901234567890, 0)
//provider.getTransactionCount()とは、指定したアドレスのトランザクションカウントを取得するメソッドです。
provider.getTransactionCount(0x1234567890123456789012345678901234567890)
//provider.getGasPrice()とは、現在のガス価格を取得するメソッドです。
provider.getGasPrice()
//signer.connect(provider)とは、指定したプロバイダーに接続するメソッドです。
signer.connect(provider)
//signer.getAddress()とは、アドレスを取得するメソッドです。
signer.getAddress()
//signer.getBalance()とは、残高を取得するメソッドです。
signer.getBalance()
//signer.getChainId()とは、チェーンIDを取得するメソッドです。
signer.getChainId()
//signer.getGasPrice()とは、ガス価格を取得するメソッドです。
signer.getGasPrice()
//signer.call(transactionRequest)とは、トランザクションリクエストを呼び出すメソッドです。
signer.call(transactionRequest)
//signer.resolveName(name)とは、名前を解決するメソッドです。
signer.resolveName(name)
//signer.estimateGas(transactionRequest)とは、トランザクションリクエストのガスを推定するメソッドです。
signer.estimateGas(transactionRequest)
//signer.signMessage(message)とは、メッセージを署名するメソッドです。
signer.signMessage(message)
//new ethers.Wallet(privateKey, provider)とは、プライベートキーとプロバイダーを指定してウォレットを作成するメソッドです。
new ethers.Wallet(privateKey, provider)
//ethers.Wallet.createRandom()とは、ランダムなウォレットを作成するメソッドです。
ethers.Wallet.createRandom()
//wallet.connect(provider)とは、指定したプロバイダーに接続するメソッドです。
wallet.connect(provider)
//ethers.Wallet.fromEncryptedJson(json, password)とは、暗号化されたJSONとパスワードを指定してウォレットを作成するメソッドです。
ethers.Wallet.fromEncryptedJson(json, password)
//wallet.encrypt(password)とは、パスワードを指定してウォレットを暗号化するメソッドです。
wallet.encrypt(password)
//wallet.getAddress()とは、アドレスを取得するメソッドです。
wallet.getAddress()
//wallet.getBalance()とは、残高を取得するメソッドです。
wallet.getBalance()
//wallet.getChainId()とは、チェーンIDを取得するメソッドです。
wallet.getChainId()
//wallet.getGasPrice()とは、ガス価格を取得するメソッドです。
wallet.getGasPrice()
//wallet.call(transactionRequest)とは、トランザクションリクエストを呼び出すメソッドです。
wallet.call(transactionRequest)
//wallet.addressとは、アドレスを取得するプロパティです。
wallet.address
//wallet.privateKeyとは、プライベートキーを取得するプロパティです。
wallet.privateKey
//brainWallet.generateとは、ブレインウォレットを生成するメソッドです。
brainWallet.generate
//ブレインウォレットとは、パスワードからウォレットを生成する方法です。
//eip1193bridge.connect(provider)とは、指定したプロバイダーに接続するメソッドです。
eip1193bridge.connect(provider)
//eip1193bridge.send(method, params)とは、メソッドとパラメーターを指定して送信するメソッドです。
eip1193bridge.send(method, params)
//nonceManeger.signerとは、署名者を取得するプロパティです。
nonceManeger.signer
//nonceManeger.getTransactionCount()とは、トランザクションカウントを取得するメソッドです。
nonceManeger.getTransactionCount()
//nonceManeger.getTransactionCount(blockTag)とは、ブロックタグを指定してトランザクションカウントを取得するメソッドです。
nonceManeger.getTransactionCount(blockTag)
//nonceManager.providerとは、プロバイダーを取得するプロパティです。
nonceManager.provider
//nonceManager.setTransactionCount(transactionCount)とは、トランザクションカウントを設定するメソッドです。
nonceManager.setTransactionCount(transactionCount)
//connection.urlとは、URLを取得するプロパティです。
connection.url
//connection.userとは、ユーザーを取得するプロパティです。
connection.user
//connection.passwordとは、パスワードを取得するプロパティです。
connection.password
//connection.headersとは、ヘッダーを取得するプロパティです。
connection.headers
//connection.skipFetchとは、スキップフェッチを取得するプロパティです。
connection.skipFetch
//connection.timeoutとは、タイムアウトを取得するプロパティです。
connection.timeout
//connection.allowGzipとは、Gzipを許可するプロパティです。
connection.allowGzip
//unsignedTransaction.toとは、送金先を取得するプロパティです。
unsignedTransaction.to
//ethers.utils.toUtf8Bytes(string)とは、文字列をUTF8バイトに変換するメソッドです。
ethers.utils.toUtf8Bytes(string)
//ethers.utils.toUtf8String(bytes)とは、バイトをUTF8文字列に変換するメソッドです。
ethers.utils.toUtf8String(bytes)
//ethers.utils.toUtf8CodePoints(string)とは、文字列をUTF8コードポイントに変換するメソッドです。
ethers.utils.toUtf8CodePoints(string)
//ethers.utils.toUtf8String(codePoints)とは、コードポイントをUTF8文字列に変換するメソッドです。
ethers.utils.toUtf8String(codePoints)
//signingKey.address
signingKey.address
//signingKey.privateKeyとは、プライベートキーを取得するプロパティです。
signingKey.privateKey
//signingKey.compressedPublicKeyとは、圧縮された公開鍵を取得するプロパティです。
signingKey.compressedPublicKey
//signingKey.signDigest(digest)とは、ダイジェストを指定して署名するメソッドです。
signingKey.signDigest(digest)
//signingKey.computeSharedSecret(otherKey)とは、他の鍵を指定して共有秘密を計算するメソッドです。
signingKey.computeSharedSecret(otherKey)
//ダイジェストとは、メッセージのハッシュ値です。
//ethers.utils.keccak256(data)とは、データを指定してKeccak256を計算するメソッドです。
ethers.utils.keccak256(data)
//ethers.utils.id(data)とは、データを指定してIDを計算するメソッドです。
ethers.utils.id(data)
//ethers.utils.namehash(name)とは、名前を指定して名前ハッシュを計算するメソッドです。
ethers.utils.namehash(name)
//ethers.utils.solidityKeccak256(types, values)とは、型と値を指定してSolidityKeccak256を計算するメソッドです。
ethers.utils.solidityKeccak256(types, values)
//ethers.utils.deepCopy(object)とは、オブジェクトを指定してディープコピーを作成するメソッドです。
ethers.utils.deepCopy(object)
//ethers.utils.shallowCopy(object)とは、オブジェクトを指定してシャローコピーを作成するメソッドです。
ethers.utils.shallowCopy(object)
//ethers.utils.deepCopy(object)とは、オブジェクトを指定してディープコピーを作成するメソッドです。
ethers.utils.deepCopy(object)
//ethers.utils.computeHmac(algorithm, key, data)とは、アルゴリズム、キー、データを指定してHMACを計算するメソッドです。
ethers.utils.computeHmac(algorithm, key, data)
//ethers.utils.hashMessage(message)とは、メッセージを指定してメッセージハッシュを計算するメソッドです。
//utils.hashMessage(message)とは、メッセージを指定してメッセージハッシュを計算するメソッドです。
utils.hashMessage(message)
//hdwalletとは、HDウォレットを取得するプロパティです。
//base58.decode(string)とは、文字列を指定してBase58デコードを行うメソッドです。
base58.decode(string)
//base58.encode(bytes)とは、バイトを指定してBase58エンコードを行うメソッドです。
base58.encode(bytes)
//ethers.utils.isBytes()とは、バイトかどうかを判定するメソッドです。
ethers.utils.isBytes()
//ethers.utils.isBytesLike()とは、バイトライクかどうかを判定するメソッドです。
ethers.utils.isBytesLike()
//ethers.utils.isBytes32()とは、バイト32かどうかを判定するメソッドです。
ethers.utils.isBytes32()
//ethers.utils.isBytes32Like()とは、バイト32ライクかどうかを判定するメソッドです。
ethers.utils.isBytes32Like()
//ethers.utils.isHexString()とは、16進数文字列かどうかを判定するメソッドです。
ethers.utils.isHexString()
//ethers.utils.isHexStringLike()とは、16進数文字列ライクかどうかを判定するメソッドです。
ethers.utils.hexlify()
//ethers.utils.isHex()とは、16進数かどうかを判定するメソッドです。
ethers.utils.isHex()
//ethers.utils.getIcapAddress(address)とは、アドレスを指定してICAPアドレスを取得するメソッドです。
ethers.utils.getIcapAddress(address)
//ethers.utils.getAddress(address)とは、アドレスを指定してアドレスを取得するメソッドです。
//abiCoder.encode(types, values)とは、型と値を指定してエンコードを行うメソッドです。
abiCoder.encode(types, values)
//abiCoder.decode(types, data)とは、型とデータを指定してデコードを行うメソッドです。
abiCoder.decode(types, data)
//ethers.utils.FormatTypes.full()とは、フォーマットタイプを取得するプロパティです。
ethers.utils.FormatTypes.full()
//フォーマットタイプとは、フォーマットの種類です。
//ethers.utils.FormatTypes.short()とは、フォーマットタイプを取得するプロパティです。
ethers.utils.FormatTypes.short()
//フォーマットタイプとは、フォーマットの種類です。
//ethers.utils.FormatTypes.signhash()とは、フォーマットタイプを取得するプロパティです。
ethers.utils.FormatTypes.signhash()
//fragmentsとは、フラグメントを取得するプロパティです。
//フラグメントとは、フラグメントの配列です。
//fragment.format(types)とは、フォーマットタイプを指定してフォーマットを行うメソッドです。
fragment.format(types)
//fragment.parse(format)とは、フォーマットを指定してパースを行うメソッドです。
fragment.parse(format)
//fragment.toFunction()とは、関数を取得するメソッドです。
fragment.toFunction()
//new ethers.utils.Interface(abi)とは、ABIを指定してインターフェースを作成するコンストラクタです。
new ethers.utils.Interface(abi)
//interface.functionsとは、関数を取得するプロパティです。
//interface.eventsとは、イベントを取得するプロパティです。
//interface.fragmentsとは、フラグメントを取得するプロパティです。
interface.fragments()
//interface.eventsとは、イベントを取得するプロパティです。
interface.events()
//interface.getFunction()とは、関数名を指定して関数を取得するメソッドです。
interface.getFunction()
//interface.getEvent()とは、イベント名を指定してイベントを取得するメソッドです。
interface.getEvent()
//interface.getEventTopic()とは、イベント名を指定してイベントトピックを取得するメソッドです。
interface.getEventTopic()
//interface.getSighash()とは、関数名を指定して署名ハッシュを取得するメソッドです。
interface.getSighash()
//interface.parseLog()とは、ログを指定してパースを行うメソッドです。
interface.parseLog()
//interface.parseTransaction()とは、トランザクションを指定してパースを行うメソッドです。
interface.parseTransaction()
//interface.getEvent()とは、イベント名を指定してイベントを取得するメソッドです。
interface.getEvent()
//interface.getEventTopic()とは、イベント名を指定してイベントトピックを取得するメソッドです。
interface.getEventTopic()
//interface.getSighash()とは、関数名を指定して署名ハッシュを取得するメソッドです。
interface.getSighash()
//interface.encodeDeploy()とは、パラメータを指定してデプロイを行うメソッドです。
interface.encodeDeploy()
//interface.encodeFunctionData()とは、関数名とパラメータを指定して関数データをエンコードするメソッドです。

