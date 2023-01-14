// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Purchase {
    address public seller;

    modifier onlySeller() { // 修飾子
        require(
            msg.sender == seller,
            "Only seller can call this."
        );
        _;
    }

    function abort() public view onlySeller { // 修飾子の使用
        // ...
    }
}

contract SimpleAuction {
    event HighestBidIncreased(address bidder, uint amount); // イベント

    function bid() public payable {
        // ...
        emit HighestBidIncreased(msg.sender, msg.value); // イベントのトリガー
    }
}

error NotEnoughFunds(uint requested, uint available);

contract Token {
    mapping(address => uint) balances;
    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];
        if (balance < amount)
            revert NotEnoughFunds(amount, balance);
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

contract test {
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;

    function setGoStraight() public {
        choice = ActionChoices.GoStraight;
    }

    // 列挙型はABIの一部ではないため、Solidityの外部に対して、「getChoice」の署名は自動的に「getChoice() returns (uint8)」に変更されることになります。
    function getChoice() public view returns (ActionChoices) {
        return choice;
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }

    function getLargestValue() public pure returns (ActionChoices) {
        return type(ActionChoices).max;
    }

    function getSmallestValue() public pure returns (ActionChoices) {
        return type(ActionChoices).min;
    }
}

// 18進数、256ビット幅の固定小数点型をユーザー定義の値型を使用して表現する。
type UFixed256x18 is uint256;

/// UFixed256x18に対して固定小数点演算を行うための最小限のライブラリ
library FixedMath {
    uint constant multiplier = 10**18;

    /// 2つのUFixed256x18の値を足す。uint256のチェックされた算術に依存して、オーバーフローでリバートします。
    function add(UFixed256x18 a, UFixed256x18 b) internal pure returns (UFixed256x18) {
        return UFixed256x18.wrap(UFixed256x18.unwrap(a) + UFixed256x18.unwrap(b));
    }
    /// UFixed256x18の値とuint256の値を掛ける。uint256のチェックされた算術に依存して、オーバーフローでリバートします。
    function mul(UFixed256x18 a, uint256 b) internal pure returns (UFixed256x18) {
        return UFixed256x18.wrap(UFixed256x18.unwrap(a) * b);
    }
    /// UFixed256x18の数のフロアを取る。
    /// @return the largest integer that does not exceed `a`.
    function floor(UFixed256x18 a) internal pure returns (uint256) {
        return UFixed256x18.unwrap(a) / multiplier;
    }
    /// uint256 を同じ値の UFixed256x18 に変換します。
    /// 整数が大きすぎる場合はリバートする。
    function toUFixed256x18(uint256 a) internal pure returns (UFixed256x18) {
        return UFixed256x18.wrap(a * multiplier);
    }
}

contract Example {
    function f() public payable returns (bytes4) {
        assert(this.f.address == address(this));
        return this.f.selector;
    }

    function g() public {
        this.f{gas: 10, value: 800}();
    }
}

//libraryとは、コードを再利用するためのコードの集まりです。
library ArrayUtils {
    // 内部関数は、同じコードコンテキストの一部となるため、内部ライブラリ関数で使用することができる
    function map(uint[] memory self, function (uint) pure returns (uint) f)
        internal
        pure
        returns (uint[] memory r)
    {
        r = new uint[](self.length);
        for (uint i = 0; i < self.length; i++) {
            r[i] = f(self[i]);
        }
    }

    function reduce(
        uint[] memory self,
        function (uint, uint) pure returns (uint) f
    )
        internal
        pure
        returns (uint r)
    {
        r = self[0];
        for (uint i = 1; i < self.length; i++) {
            r = f(r, self[i]);
        }
    }

    function range(uint length) internal pure returns (uint[] memory r) {
        r = new uint[](length);
        for (uint i = 0; i < r.length; i++) {
            r[i] = i;
        }
    }
}

contract Pyramid {
    using ArrayUtils for *;

    function pyramid(uint l) public pure returns (uint) {
        return ArrayUtils.range(l).map(square).reduce(sum);
    }

    function square(uint x) internal pure returns (uint) {
        return x * x;
    }

    function sum(uint x, uint y) internal pure returns (uint) {
        return x + y;
    }
}

contract Oracle {
    struct Request {
        bytes data;
        function(uint) external callback;
    }

    Request[] private requests;
    event NewRequest(uint);

    function query(bytes memory data, function(uint) external callback) public {
        requests.push(Request(data, callback));
        emit NewRequest(requests.length - 1);
    }

    function reply(uint requestID, uint response) public {
        // Here goes the check that the reply comes from a trusted source
        requests[requestID].callback(response);
    }
}

contract OracleUser {
    Oracle constant private ORACLE_CONST = Oracle(address(0x00000000219ab540356cBB839Cbe05303d7705Fa)); // known contract
    uint private exchangeRate;

    function buySomething() public {
        ORACLE_CONST.query("USD", this.oracleResponse);
    }

    function oracleResponse(uint response) public {
        require(
            msg.sender == address(ORACLE_CONST),
            "Only oracle can call this."
        );
        exchangeRate = response;
    }
}

contract Proxy {
    /// @dev プロキシ（すなわちこのコントラクト）で管理するクライアントコントラクトのアドレス
    address client;

    constructor(address _client) {
        client = _client;
    }

    /// 引数のアドレスの基本的な検証を行った後、クライアントが実装する"setOwner(address)"のフォワードコール
    function forward(bytes calldata _payload) external {
        bytes4 sig = bytes4(_payload[:4]);
        // 切り捨て処理のため、bytes4(_payload)も同じ処理
        // bytes4 sig = bytes4(_payload);
        if (sig == bytes4(keccak256("setOwner(address)"))) {
            address owner = abi.decode(_payload[4:], (address));
            require(owner != address(0), "Address of owner cannot be zero.");
        }
        (bool status,) = client.delegatecall(_payload);
        require(status, "Forwarded call failed.");
    }
}

struct Funder {
    address addr;
    uint amount;
}

contract CrowdFunding {
    // 構造体はコントラクトの内部で定義することもでき、その場合、その内部および派生コントラクトでのみ認識できるようになります。
    struct Campaign {
        address payable beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
        mapping (uint => Funder) funders;
    }

    uint numCampaigns;
    mapping (uint => Campaign) campaigns;

    function newCampaign(address payable beneficiary, uint goal) public returns (uint campaignID) {
        campaignID = numCampaigns++; // campaignIDは返り値です。
        // "campaigns[campaignID] = Campaign(beneficiary, goal, 0, 0)"は、
        // 右側がマッピングを含むメモリ構造体"Campaign"を作成するため、使用することはできません。
        Campaign storage c = campaigns[campaignID];
        c.beneficiary = beneficiary;
        c.fundingGoal = goal;
    }

    function contribute(uint campaignID) public payable {
        Campaign storage c = campaigns[campaignID];
        // 指定された値で初期化された新しい一時的なメモリ構造体を作成し、ストレージにコピーします。
        // Funder(msg.sender, msg.value) を使用して初期化することもできます。
        c.funders[c.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
        c.amount += msg.value;
    }

    function checkGoalReached(uint campaignID) public returns (bool reached) {
        Campaign storage c = campaigns[campaignID];
        if (c.amount < c.fundingGoal)
            return false;
        uint amount = c.amount;
        c.amount = 0;
        c.beneficiary.transfer(amount);
        return true;
    }
}

contract MappingExample {
    mapping(address => uint) public balances;

    function update(uint newBalance) public {
        balances[msg.sender] = newBalance;
    }
}

contract MappingUser {
    function f() public returns (uint) {
        MappingExample m = new MappingExample();
        m.update(100);
        return m.balances(address(this));
    }
}

contract MappingExample2 {

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        approve(sender, msg.sender, amount);
        return true;
    }

    function approve(address owner, address spender, uint256 amount) public returns (bool) {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
}

struct IndexValue { uint keyIndex; uint value; }
struct KeyFlag { uint key; bool deleted; }

struct itmap {
    mapping(uint => IndexValue) data;
    KeyFlag[] keys;
    uint size;
}

library IterableMapping {
    function insert(itmap storage self, uint key, uint value) internal returns (bool replaced) {
        uint keyIndex = self.data[key].keyIndex;
        self.data[key].value = value;
        if (keyIndex > 0)
            return true;
        else {
            keyIndex = self.keys.length;
            self.keys.push();
            self.data[key].keyIndex = keyIndex + 1;
            self.keys[keyIndex].key = key;
            self.size++;
            return false;
        }
    }

    function remove(itmap storage self, uint key) internal returns (bool success) {
        uint keyIndex = self.data[key].keyIndex;
        if (keyIndex == 0)
            return false;
        delete self.data[key];
        self.keys[keyIndex - 1].deleted = true;
        self.size --;
    }

    function contains(itmap storage self, uint key) internal view returns (bool) {
        return self.data[key].keyIndex > 0;
    }

    function iterate_start(itmap storage self) internal view returns (uint keyIndex) {
        return iterate_next(self, type(uint).max);
    }

    function iterate_valid(itmap storage self, uint keyIndex) internal view returns (bool) {
        return keyIndex < self.keys.length;
    }

    function iterate_next(itmap storage self, uint keyIndex) internal view returns (uint r_keyIndex) {
        keyIndex++;
        while (keyIndex < self.keys.length && self.keys[keyIndex].deleted)
            keyIndex++;
        return keyIndex;
    }

    function iterate_get(itmap storage self, uint keyIndex) internal view returns (uint key, uint value) {
        key = self.keys[keyIndex].key;
        value = self.data[key].value;
    }
}

// 使用方法
contract User {
    // データを保持する構造体
    itmap data;
    // データ型にライブラリ関数を適用する。
    using IterableMapping for itmap;

    // 何かを挿入する
    function insert(uint k, uint v) public returns (uint size) {
        // これは IterableMapping.insert(data, k, v) を呼び出します。
        data.insert(k, v);
        // 構造体のメンバーにアクセスすることは可能ですが、構造体をいじらないように注意する必要があります。
        return data.size;
    }

    // 保存されているすべてのデータの合計を計算する。
    function sum() public view returns (uint s) {
        for (
            uint i = data.iterate_start();
            data.iterate_valid(i);
            i = data.iterate_next(i)
        ) {
            (, uint value) = data.iterate_get(i);
            s += value;
        }
    }
}

contract DeleteExample {
    uint data;
    uint[] dataArray;

    function f() public {
        uint x = data;
        delete x; // xを0にセットし、dataには影響を与えない
        delete data; // dataを0にセットし、xには影響を与えない
        uint[] storage y = dataArray;
        delete dataArray; // これは dataArray.length を 0 にするものですが、
        // uint[] は複合オブジェクトであるため、ストレージオブジェクトのエイリアスである y にも影響が及びます。
        // ストレージオブジェクトを参照するローカル変数への代入は、既存のストレージオブジェクトからしか行えないため、"delete y"は有効ではありません。
        assert(y.length == 0);
    }
}

//

contract InfoFeed {
    function info() public payable returns (uint ret) { return 42; }
}

contract Consumer {
    InfoFeed feed;
    function setFeed(InfoFeed addr) public { feed = addr; }
    function callFeed() public { feed.info{value: 10, gas: 800}(); }
}

contract Sharer {
    function sendHalf(address payable addr) public payable returns (uint balance) {
        require(msg.value % 2 == 0, "Even value required.");
        uint balanceBeforeTransfer = address(this).balance;
        addr.transfer(msg.value / 2);
        // transferに失敗すると例外がスローされ、ここにコールバックすることはできないので、半分のお金を送金せず保持する方法はないはずです。
        assert(address(this).balance == balanceBeforeTransfer - msg.value / 2);
        return address(this).balance;
    }
}

//
contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // 別の方法:
        require(
            amount <= msg.value / 2 ether,
            "Not enough Ether provided."
        );
        // 購入を実行する
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}


interface DataFeed { function getData(address token) external returns (uint value); }

contract FeedConsumer {
    DataFeed feed;
    uint errorCount;
    function rate(address token) public returns (uint value, bool success) {
        // 10個以上のエラーが発生した場合、この機構を永久に無効にします。
        require(errorCount < 10);
        try feed.getData(token) returns (uint v) {
            return (v, true);
        } catch Error(string memory /*reason*/) {
            // これは、getDataの内部でrevertが呼び出され、文字列reasonが提供された場合に実行されます。
            errorCount++;
            return (0, false);
        } catch Panic(uint /*errorCode*/) {
            // これはパニック、すなわちゼロによる除算やオーバーフローのような重大なエラーが発生した場合に実行されます。
            // エラーコードからエラーの種類を判断できます。
            errorCount++;
            return (0, false);
        } catch (bytes memory /*lowLevelData*/) {
            // revert()が使用された場合に実行されます。
            errorCount++;
            return (0, false);
        }
    }
}

contract OwnedToken {
    // `TokenCreator` は、以下で定義されるコントラクトの型です。
    // 新しいコントラクトを作成するために使用しない限り、これを参照することは問題ありません。
    TokenCreator creator;
    address owner;
    bytes32 name;

    // 作成者と割り当てられた名前を登録するコンストラクタです。
    constructor(bytes32 _name) {
        // 状態変数には、その名前を通してアクセスします（`this.owner` などではない）。
        // 関数には、直接アクセスすることも、 `this.f` を介してアクセスすることもできますが、後者は関数への外部からのアクセスを提供します。
        // 特にコンストラクタでは、まだ関数が存在しないので、外部から関数にアクセスするべきではありません。
        // 詳しくは次のセクションを参照してください。
        owner = msg.sender;

        // `address` から `TokenCreator` への明示的な型変換を行い、
        // 呼び出したコントラクトの型が `TokenCreator` であることを仮定していますが、
        // 実際にそれを確認する方法はありません。
        // これは新しいコントラクトを作成するわけではありません。
        creator = TokenCreator(msg.sender);
        name = _name;
    }

    function changeName(bytes32 newName) public {
        // 作成者のみが名称を変更できる。
        // コントラクトの比較は、アドレスに明示的に変換することで取得できるアドレスをもとに行う。
        if (msg.sender == address(creator))
            name = newName;
    }

    function transfer(address newOwner) public {
        // トークンを送信できるのは、現在の所有者のみです。
        if (msg.sender != owner) return;

        // 以下に定義する `TokenCreator` コントラクトの関数を用いて、送金を進めるべきかどうかを作成者コントラクトに問い合わせる。
        // 呼び出しに失敗した場合（ガス欠など）、ここでの実行も失敗する。
        if (creator.isTokenTransferOK(owner, newOwner))
            owner = newOwner;
    }
}

contract TokenCreator {
    function createToken(bytes32 name)
        public
        returns (OwnedToken tokenAddress)
    {
        // 新しい `Token` コントラクトを作成し、そのアドレスを返す。
        // JavaScript 側から見ると、この関数の戻り値の型は `address` です。これは ABI で利用可能な最も近い型だからです。
        return new OwnedToken(name);
    }

    function changeName(OwnedToken tokenAddress, bytes32 name) public {
        // ここでも、`tokenAddress` の外部型は単純に `address` です。
        tokenAddress.changeName(name);
    }

    // `OwnedToken`コントラクトにトークンを送信するかどうかのチェックを行う。
    function isTokenTransferOK(address currentOwner, address newOwner)
        public
        pure
        returns (bool ok)
    {
        // 送金を進めるかどうか、任意の条件をチェックする。
        return keccak256(abi.encodePacked(currentOwner, newOwner))[0] == 0x7f;
    }
}

//
contract arrayExample {
    // パブリック状態変数
    uint[] public myArray;

    // コンパイラが生成するゲッター関数
    /*
    function myArray(uint i) public view returns (uint) {
        return myArray[i];
    }
    */

    // 配列全体を返す関数
    function getArray() public view returns (uint[] memory) {
        return myArray;
    }
}

//
contract owned {
    constructor() { owner = payable(msg.sender); }
    address payable owner;

    // このコントラクトは修飾子を定義するだけで、それを使用することはありません。派生コントラクトで使用されます。
    // 関数本体は、修飾子の定義にある特別な記号 `_;` が現れる場所に挿入されます。
    // これは、オーナーがこの関数を呼び出した場合は関数が実行され、そうでない場合は例外がスローされることを意味します。
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}

contract destructible is owned {
    // このコントラクトは `onlyOwner` 修飾子を `owned` から継承し、 `destroy` 関数に適用します。
    // これにより、 `destroy` への呼び出しは、保存されているオーナーによって実行された場合にのみ有効となります。
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}

contract priced {
    // 修飾子は引数を受け取ることができます:
    modifier costs(uint price) {
        if (msg.value >= price) {
            _;
        }
    }
}

contract Register is priced, destructible {
    mapping (address => bool) registeredAddresses;
    uint price;

    constructor(uint initialPrice) { price = initialPrice; }

    // ここで `payable` キーワードを指定することも重要です。
    // さもなければ、この関数は送られてきたすべての Ether を自動的に拒否します。
    function register() public payable costs(price) {
        registeredAddresses[msg.sender] = true;
    }

    function changePrice(uint _price) public onlyOwner {
        price = _price;
    }
}

contract Mutex {
    bool locked;
    modifier noReentrancy() {
        require(
            !locked,
            "Reentrant call."
        );
        locked = true;
        _;
        locked = false;
    }

    /// この関数はミューテックスで保護されているので、 `msg.sender.call` 内からのリエントラントなコールは `f` を再び呼び出すことができません。
    /// `return 7` 文は戻り値に 7 を代入しますが、その後に修飾子の `locked = false` という文は実行されます。
    function f() public noReentrancy returns (uint) {
        (bool success,) = msg.sender.call("");
        require(success);
        return 7;
    }
}

function sum(uint[] memory _arr) pure returns (uint s) {
    for (uint i = 0; i < _arr.length; i++)
        s += _arr[i];
}

contract ArrayExample {
    bool found;
    function f(uint[] memory _arr) public {
        // This calls the free function internally.
        // The compiler will add its code to the contract.
        uint s = sum(_arr);
        require(s >= 10);
        found = true;
    }
}

contract Simple {
    uint sum;
    function taker(uint _a, uint _b) public {
        sum = _a + _b;
    }
}

contract Simple2 {
    function arithmetic(uint _a, uint _b)
        public
        pure
        returns (uint o_sum, uint o_product)
    {
        o_sum = _a + _b;
        o_product = _a * _b;
    }
}

contract Test {
    uint x;
    // この関数はこのコントラクトに送られるすべてのメッセージに対して呼び出されます（他の関数は存在しません）。
    // このコントラクトにEtherを送信すると例外が発生します。なぜなら、fallback関数が `payable` 修飾子を持たないからです。
    fallback() external { x = 1; }
}

contract TestPayable {
    uint x;
    uint y;
    // この関数は、プレーンなEther送金を除く、このコントラクトに送信されるすべてのメッセージに対して呼び出されます（受信関数以外の関数は存在しません）。
    // このコントラクトへの空でないcalldataを持つ呼び出しは、フォールバック関数を実行します（呼び出しと一緒にEtherが送信された場合でも同様です）。
    fallback() external payable { x = 1; y = msg.value; }

    // この関数は、プレーンなEther送金、すなわち空のcalldataを持つすべてのコールに対して呼び出されます。
    receive() external payable { x = 2; y = msg.value; }
}

contract Caller {
    function callTest(Test test) public returns (bool) {
        (bool success,) = address(test).call(abi.encodeWithSignature("nonExistingFunction()"));
        require(success);
        // test.xが1になる

        // address(test) は ``send`` を直接呼び出すことはできません。
        // なぜなら、 ``test`` には支払い可能なフォールバック関数がないからです。
        // その上で ``send`` を呼び出すには ``address payable`` 型に変換する必要があります。
        address payable testPayable = payable(address(test));

        // 誰かがそのコントラクトにEtherを送ると、送金は失敗します。
        // つまり、ここではfalseが返されます。
        return testPayable.send(2 ether);
    }

    function callTestPayable(TestPayable test) public returns (bool) {
        (bool success,) = address(test).call(abi.encodeWithSignature("nonExistingFunction()"));
        require(success);
        // test.xが1、test.yが0になります
        (success,) = address(test).call{value: 1}(abi.encodeWithSignature("nonExistingFunction()"));
        require(success);
        // test.xが1、test.yが1になります

        // 誰かがそのコントラクトにEtherを送ると、TestPayableのreceive関数が呼び出されます。
        // この関数はストレージに書き込むので、単純な ``send`` や ``transfer`` よりも多くのガスを消費します。
        // そのため、低レベルの呼び出しを使用する必要があります。
        (success,) = address(test).call{value: 2 ether}("");
        require(success);
        // test.xが2、test.yが2 etherになります。

        return true;
    }
}

contract ClientReceipt {
    event Deposit(
        address indexed _from,
        bytes32 indexed _id,
        uint _value
    );

    function deposit(bytes32 _id) public payable {
        // イベントは `emit` を使って発行され、その後にイベント名と引数 (もしあれば) が括弧で囲まれます。
        // このような呼び出しは (深くネストされていても) JavaScript API から `Deposit` をフィルタリングすることで検出することができます。
        emit Deposit(msg.sender, _id, msg.value);
    }
}


contract Owned {
    constructor() { owner = payable(msg.sender); }
    address payable owner;
}

// 他のコントラクトから派生させるには、`is`を使用します。
// 派生したコントラクトは、内部関数や状態変数を含む、プライベートでないすべてのメンバにアクセスできます。
// しかし、これらは `this` を介して外部からアクセスすることはできません。
contract Destructible is Owned {
    // キーワード `virtual` は、その関数が派生クラスでその振る舞いを変更できる (「オーバーライド」) ことを意味します。
    function destroy() virtual public {
        if (msg.sender == owner) selfdestruct(owner);
    }
}

// これらの抽象コントラクトは、コンパイラにインターフェースを知らせるためにのみ提供されています。
// ボディを持たない関数に注意してください。
// コントラクトがすべての関数を実装していない場合、インターフェースとしてのみ使用できます。
abstract contract Config {
    function lookup(uint id) public virtual returns (address adr);
}

abstract contract NameReg {
    function register(bytes32 name) public virtual;
    function unregister() public virtual;
}

// 多重継承が可能です。
// `owned` は `Destructible` のベースクラスでもあるが、 `owned` のインスタンスは一つしかないことに注意（C++ の仮想継承と同じ）。
contract Named is Owned, Destructible {
    constructor(bytes32 name) {
        Config config = Config(0xD5f9D8D94886E70b06E474c3fB14Fd43E2f23970);
        NameReg(config.lookup(1)).register(name);
    }

    // 関数は、同じ名前、同じ入力の数/型の別の関数によってオーバーライドできます。
    // オーバーライドされた関数が異なる型の出力パラメータを持っている場合、それはエラーの原因となります。
    // ローカル関数とメッセージベースの関数呼び出しの両方が、これらのオーバーライドを考慮に入れています。
    // 関数をオーバーライドしたい場合は、`override` キーワードを使用する必要があります。
    // また、この関数を再びオーバーライドしたい場合は、`virtual`キーワードを指定する必要があります。
    function destroy() public virtual override {
        if (msg.sender == owner) {
            Config config = Config(0xD5f9D8D94886E70b06E474c3fB14Fd43E2f23970);
            NameReg(config.lookup(1)).unregister();
            // 特定のオーバーライドされた関数を呼び出すことは可能です。
            Destructible.destroy();
        }
    }
}

// コンストラクタが引数を取る場合、派生コントラクトのコンストラクタでヘッダまたは修飾子を呼び出すスタイルで提供する必要があります(下記参照)。
contract PriceFeed is Owned, Destructible, Named("GoldFeed") {
    function updateInfo(uint newInfo) public {
        if (msg.sender == owner) info = newInfo;
    }

    // ここでは、 `override` のみを指定し、 `virtual` は指定しない。
    // これは、 `PriceFeed` から派生したコントラクトは、もう `destroy` の挙動を変更できないことを意味します。
    function destroy() public override(Destructible, Named) { Named.destroy(); }
    function get() public view returns(uint r) { return info; }

    uint info;
}

contract owned1 {
    constructor() { owner = payable(msg.sender); }
    address payable owner;
}

contract Destructible2 is owned1 {
    function destroy() public virtual {
        if (msg.sender == owner) selfdestruct(owner);
    }
}

contract Base1 is Destructible {
    function destroy() public virtual override { /* cleanup 1 */ Destructible.destroy(); }
}

contract Base2 is Destructible {
    function destroy() public virtual override { /* cleanup 2 */ Destructible.destroy(); }
}

contract Final is Base1, Base2 {
    function destroy() public override(Base1, Base2) { Base2.destroy(); }
}

// 呼び出し側のコントラクトでそのデータを保持するために使用される新しい構造体のデータ型を定義します。
struct Data {
    mapping(uint => bool) flags;
}

library Set {
    // 最初のパラメータは「ストレージ参照」型であるため、呼び出しの一部として、そのストレージアドレスのみが渡され、その内容は渡されないことに注意してください。
    // これはライブラリ関数の特別な機能です。
    // もし関数がそのオブジェクトのメソッドとみなすことができるならば、最初のパラメータを `self` と呼ぶのが慣例となっています。
    function insert(Data storage self, uint value)
        public
        returns (bool)
    {
        if (self.flags[value])
            return false; // 既に存在する
        self.flags[value] = true;
        return true;
    }

    function remove(Data storage self, uint value)
        public
        returns (bool)
    {
        if (!self.flags[value])
            return false; // 存在しない
        self.flags[value] = false;
        return true;
    }

    function contains(Data storage self, uint value)
        public
        view
        returns (bool)
    {
        return self.flags[value];
    }
}

struct bigint {
    uint[] limbs;
}

library BigInt {
    function fromUint(uint x) internal pure returns (bigint memory r) {
        r.limbs = new uint[](1);
        r.limbs[0] = x;
    }

    function add(bigint memory _a, bigint memory _b) internal pure returns (bigint memory r) {
        r.limbs = new uint[](max(_a.limbs.length, _b.limbs.length));
        uint carry = 0;
        for (uint i = 0; i < r.limbs.length; ++i) {
            uint a = limb(_a, i);
            uint b = limb(_b, i);
            unchecked {
                r.limbs[i] = a + b + carry;

                if (a + b < a || (a + b == type(uint).max && carry > 0))
                    carry = 1;
                else
                    carry = 0;
            }
        }
        if (carry > 0) {
            // 残念、limbを追加しなくてはいけません
            uint[] memory newLimbs = new uint[](r.limbs.length + 1);
            uint i;
            for (i = 0; i < r.limbs.length; ++i)
                newLimbs[i] = r.limbs[i];
            newLimbs[i] = carry;
            r.limbs = newLimbs;
        }
    }

    function limb(bigint memory _a, uint _limb) internal pure returns (uint) {
        return _limb < _a.limbs.length ? _a.limbs[_limb] : 0;
    }

    function max(uint a, uint b) private pure returns (uint) {
        return a > b ? a : b;
    }
}

// これは前と同じコードで、コメントがないだけです。
struct Data { mapping(uint => bool) flags; }

library Set2 {
    function insert(Data storage self, uint value)
        public
        returns (bool)
    {
        if (self.flags[value])
            return false; // すでに存在する
        self.flags[value] = true;
        return true;
    }

    function remove(Data storage self, uint value)
        public
        returns (bool)
    {
        if (!self.flags[value])
            return false; // 存在しない
        self.flags[value] = false;
        return true;
    }

    function contains(Data storage self, uint value)
        public
        view
        returns (bool)
    {
        return self.flags[value];
    }
}

library VectorSum {
    // この関数は、現在、オプティマイザが配列アクセスにおける境界チェックを除去しないため、効率が悪くなっています。
    function sumSolidity(uint[] memory _data) public pure returns (uint sum) {
        for (uint i = 0; i < _data.length; ++i)
            sum += _data[i];
    }

    // 列へのアクセスは境界内だけであることが分かっているので、チェックを回避できます。
    // 最初のスロットに配列の長さが入っているので、0x20を配列に追加する必要があります。
    function sumAsm(uint[] memory _data) public pure returns (uint sum) {
        for (uint i = 0; i < _data.length; ++i) {
            assembly {
                sum := add(sum, mload(add(add(_data, 0x20), mul(i, 0x20))))
            }
        }
    }

    // 上記と同じですが、コード全体をインラインアセンブリで実現します。
    function sumPureAsm(uint[] memory _data) public pure returns (uint sum) {
        assembly {
            // 長さ（最初の32バイト）を読み込む
            let len := mload(_data)

            // 長さのフィールドをスキップする。
            //
            // in-placeでインクリメントできるように一時的な変数を保持する。
            //
            // 注: _data をインクリメントすると、このアセンブリブロックの後では _data 変数は使用できなくなります。
            let data := add(_data, 0x20)

            // 上限に達するまで反復する。
            for
                { let end := add(data, mul(len, 0x20)) }
                lt(data, end)
                { data := add(data, 0x20) }
            {
                sum := add(sum, mload(data))
            }
        }
    }
}

