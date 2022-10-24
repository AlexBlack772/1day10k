//abi.decode()
abi.decode(abi.encodePacked(0x12345678), (uint32));
//abi.encode()とは、引数をバイト列に変換する関数
abi.encode(1, 2, 3);
//abi.encodePacked()とは、引数をバイト列に変換する関数
//引数の型が固定長の場合、引数の値をそのままバイト列に変換する
abi.encodePacked(1, 2, 3);
//abi.encodeWithSelector()とは、関数シグネチャを指定して引数をバイト列に変換する関数
//関数シグネチャは、関数名と引数の型から計算される
abi.encodeWithSelector(bytes4(keccak256("foo(uint256)")), 1);
//abi.encodeWithSignature()とは、関数シグネチャを指定して引数をバイト列に変換する関数
//関数シグネチャは、関数名と引数の型から計算される
abi.encodeWithSignature("foo(uint256)", 1);
//abi.encodeWithCall()とは、関数シグネチャを指定して引数をバイト列に変換する関数
//関数シグネチャは、関数名と引数の型から計算される
abi.encodeWithCall(bytes4(keccak256("foo(uint256)")), 1);
//bytes.concat()とは、バイト列を連結する関数
bytes.concat(0x12345678, 0x90abcdef);
//string.concat()とは、文字列を連結する関数
string.concat("abc", "def");
//string.toSlice()とは、文字列をスライスに変換する関数
string.toSlice("abc");
//block.basefee()とは、ブロックのベースフィーを取得する関数
block.basefee();
//block.chainid()とは、ブロックチェーンのIDを取得する関数
block.chainid();
//block.coinbase()とは、ブロックのマイナーのアドレスを取得する関数
block.coinbase();
//block.difficulty()とは、ブロックの難易度を取得する関数
block.difficulty();
//block.gaslimit()とは、ブロックのガスリミットを取得する関数
block.gaslimit();
//block.number()とは、ブロックの番号を取得する関数
block.number();
//block.timestamp()とは、ブロックのタイムスタンプを取得する関数
block.timestamp();
//gasleftとは、残りのガスを取得する
gasleft;
//msg.dataとは、メッセージのデータ
msg.data;
//msg.senderとは、メッセージの送信者のアドレスを取得する変数
msg.sender;
//msg.sigとは、メッセージのシグネチャを取得する変数
msg.sig;
//msg.valueとは、メッセージの値を取得する変数
msg.value;
//tx.gaspriceとは、トランザクションのガス価格を取得する変数
tx.gasprice;
//tx.originとは、トランザクションの送信者のアドレスを取得する変数
tx.origin;
//assert()とは、条件式がfalseの場合
assert(1 == 2);
//require()とは、条件式がfalseの場合、例外を発生させる関数
require(1 == 2);
//revert()とは、例外を発生させる関数
revert();
//blockhash()とは、ブロックのハッシュを取得する関数
blockhash(1);
//keccak256()とは、keccak256ハッシュを計算する関数
keccak256(1);
//sha256()とは、sha256ハッシュを計算する関数
sha256(1);
//ripemd160()とは、ripemd160ハッシュを計算する関数
ripemd160(1);
//ecrecover()とは、署名を復元する関数
ecrecover(1, 2, 3, 4);
//addmod()とは、加算した値をモジュロ演算した値を取得する関数
addmod(1, 2, 3);
//mulmod()とは、乗算した値をモジュロ演算した値を取得する関数
mulmod(1, 2, 3);
//thisとは、コントラクトのアドレスを取得する変数
this;
//selfdestruct()とは、コントラクトを破棄する関数
selfdestruct(0x1234567890123456789012345678901234567890);
//<address>.balanceとは、アドレスの残高を取得する変数
0x1234567890123456789012345678901234567890.balance;
//<address>.codehashとは、アドレスのコードハッシュを取得する変数
0x1234567890123456789012345678901234567890.codehash;
//<address>.code.lengthとは、アドレスのコードの長さを取得する変数
0x1234567890123456789012345678901234567890.code.length;
//<address>.code[0]とは、アドレスのコードのバイト列を取得する変数
0x1234567890123456789012345678901234567890.code[0];
//<address>.code[0:1]とは、アドレスのコードのバイト列を取得する変数
0x1234567890123456789012345678901234567890.code[0:1];
//<address>.code[0:1] = 0x12345678とは、アドレスのコードのバイト列を設定する変数
0x1234567890123456789012345678901234567890.code[0:1] = 0x12345678;
//<address>.codecopy(0x12345678, 0, 1)とは、アドレスのコードのバイト列をコピーする関数
0x1234567890123456789012345678901234567890.codecopy(0x12345678, 0, 1);
//<address>.delegatecall()とは、アドレスのコードを実行する関数
0x1234567890123456789012345678901234567890.delegatecall();
//<address>.staticcall()とは、アドレスのコードを実行する関数
0x1234567890123456789012345678901234567890.staticcall();
//type().nameとは、コントラクトの名前を取得する変数
type().name;
//type().creationCodeとは、コントラクトの作成コードを取得する変数
type().creationCode;
//type().runtimeCodeとは、コントラクトの実行コードを取得する変数
type().runtimeCode;
//type().abiとは、コントラクトのABIを取得する変数
type().abi;
//type().interfaceIdとは、コントラクトのインターフェースIDを取得する変数
type().interfaceId;
//type().minABIとは、コントラクトの最小ABIを取得する変数
type().minABI;
//type().fallback()とは、コントラクトのフォールバック関数を実行する関数
type().fallback();
//publicとは、公開関数
public;
//externalとは、外部関数
external;
//internalとは、内部関数
internal;
//privateとは、非公開関数
private;
//array.literalとは、配列リテラル
[1, 2, 3];
//allowed pathsとは、許可されたパス
allowed paths;
//assignableとは、代入可能
assignable;
//conpile targetとは、コンパイル対象
compile target;
//derivableとは、導出可能
derivable;
//expressionとは、式
expression;
//expression statementとは、式文
expression statement;
//evaluation orderとは、評価順序
evaluation order;
//for loopとは、forループ
for loop;
//fallback functionとは、フォールバック関数
fallback function;
//function getterとは、関数ゲッター
function getter;
//関数ゲッターとは、関数ゲッター
function getter;
//function selectorとは、関数セレクター
function selector;
//function modifierとは、関数修飾子
function modifier;
//evm versionとは、EVMバージョン
evm version;
//gasとは、ガス
gas;
//gas costsとは、ガスコスト
gas costs;
//exceptionとは、例外
exception;
//import relative pathとは、相対パスをインポート
import relative path;
//vfsとは、仮想ファイルシステム
vfs;
//inheritance specifierとは、継承指定子
inheritance specifier;
//iterable mappingsとは、イテラブルマッピング
//イテラブルとは、イテラブル
//linearizationとは、線形化
linearization;
//linkerとは、リンカー
linker;
//fixed point numberとは、固定小数点数
fixed point number;
//function modifier invocationとは、関数修飾子呼び出し
modifier invocation;
//elementary type name expressionとは、要素型名式
elementary type name expression;
//direct importとは、直接インポート
direct import;
//dynamic arrayとは、動的配列
dynamic array;
//dynamic array typeとは、動的配列型
dynamic array type;
//contract verificationsとは、コントラクト検証
contract verifications;
//verificationsとは、検証
verifications;
//compound operatorsとは、複合演算子
compound operators;
//compound assignmentとは、複合代入
compound assignment;
//cleanup
cleanup;
//bytes-concatとは、バイト結合
bytes-concat;
//bytes-concatenationとは、バイト結合
bytes-concatenation;
//bytes-concatenation assignmentとは、バイト結合代入
bytes-concatenation assignment;
//bytes-concatenation assignment operatorとは、バイト結合代入演算子
