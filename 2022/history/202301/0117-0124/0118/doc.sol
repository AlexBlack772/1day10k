// 
contract Ballot {
    // 新しい複合型を宣言し、後で変数に使用します。
    // 一人の投票者を表します。
    struct Voter {
        uint weight; // ウェイトは委任により蓄積される
        bool voted;  // trueならすでにその人は投票済み
        address delegate; // 委任先
        uint vote;   // 投票したプロポーザルのインデックス
    }

    // 1つのプロポーザルの型です。
    struct Proposal {
        bytes32 name;   // 短い名前（上限32バイト）
        uint voteCount; // 投票数
    }

    address public chairperson;

    // アドレスごとに `Voter` 構造体を格納する状態変数を宣言しています。
    mapping(address => Voter) public voters;

    // `Proposal` 構造体の動的サイズの配列
    Proposal[] public proposals;

    /// `proposalNames` のいずれかを選択するための新しい投票を作成します。
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // 指定されたプロポーザル名ごとに新しいプロポーザルオブジェクトを作成し、配列の末尾に追加します。
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` は一時的なプロポーザルオブジェクトを作成し、 `proposals.push(...)` はそれを `proposals` の末尾に追加します。
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // `voter` にこの投票用紙に投票する権利を与えます。
    // `chairperson` だけが呼び出すことができます。
    function giveRightToVote(address voter) external {
        // `require` の第一引数の評価が `false` の場合、実行は終了し、状態やEther残高のすべての変更が元に戻されます。
        // これは、古いEVMのバージョンでは全てのガスを消費していましたが、今はそうではありません。
        // 関数が正しく呼び出されているかどうかを確認するために、 `require` を使用するのは良いアイデアです。
        // 第二引数として、何が悪かったのかについての説明を記述することもできます。
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /// 投票者 `to` に投票を委任します。
    function delegate(address to) external {
        // 参照を代入
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed.");

        // `to` もデリゲートされている限り、デリゲートを転送します。
        // 一般的に、このようなループは非常に危険です。なぜなら、ループが長くなりすぎると、ブロック内で利用できる量よりも多くのガスが必要になる可能性があるからです。
        // この場合、デリゲーションは実行されません。しかし、他の状況では、このようなループによってコントラクトが完全に「スタック」してしまう可能性があります。
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // 委任でループを発見した場合、委任は許可されません。
            require(to != msg.sender, "Found loop in delegation.");
        }

        // `sender` は参照なので、`voters[msg.sender].voted` を修正します。
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // 代表者が既に投票している場合は、直接投票数に加算する
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // 代表者がまだ投票していない場合は、その人の重みに加える
            delegate_.weight += sender.weight;
        }
    }

    /// あなたの投票権（あなたに委任された投票権を含む）をプロポーザル `proposals[proposal].name` に与えてください。
    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // もし `proposal` が配列の範囲外であれば、自動的にスローされ、すべての変更が取り消されます。
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev 以前の投票をすべて考慮した上で、当選案を計算します。
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // winningProposal()関数を呼び出して、プロポーザルの配列に含まれる当選案のインデックスを取得し、当選案の名前を返します。
    function winnerName() external view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}

// 
contract SimpleAuction {
    // オークションのパラメータ。時刻は絶対的なunixタイムスタンプ（1970-01-01からの秒数）または秒単位の時間です。
    address payable public beneficiary;
    uint public auctionEndTime;

    // オークションの現状
    address public highestBidder;
    uint public highestBid;

    // 以前の入札のうち取り下げを許可したもの
    mapping(address => uint) pendingReturns;

    // 最後にtrueを設定すると、一切の変更が禁止されます。
    // デフォルトでは `false` に初期化されています。
    bool ended;

    // 変更時に発信されるイベント
    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    // 失敗を表すエラー

    // トリプルスラッシュのコメントは、いわゆるnatspecコメントです。
    // これらは、ユーザーがトランザクションの確認を求められたときや、エラーが表示されたときに表示されます。

    /// オークションはすでに終了しています。
    error AuctionAlreadyEnded();
    /// すでに上位または同等の入札があります。
    error BidNotHighEnough(uint highestBid);
    /// オークションはまだ終了していません。
    error AuctionNotYetEnded();
    /// 関数 auctionEnd はすでに呼び出されています。
    error AuctionEndAlreadyCalled();

    /// 受益者アドレス `beneficiaryAddress` に代わって `biddingTime` 秒の入札時間を持つシンプルなオークションを作成します。
    constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

    /// この取引と一緒に送られたvalueでオークションに入札します。
    /// 落札されなかった場合のみ、valueは返金されます。
    function bid() external payable {
        // 引数は必要なく、すべての情報はすでにトランザクションの一部となっています。
        // キーワード payable は、この関数が Ether を受け取ることができるようにするために必要です。

        // 入札期間が終了した場合、コールをリバートする。
        if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

        // 入札額が高くなければ、お金を送り返す（リバートステートメントは、それがお金を受け取ったことを含め、この関数の実行のすべての変更を元に戻します）。
        if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

        if (highestBid != 0) {
            // highestBidder.send(highestBid) を使って単純に送り返すと、信頼できないコントラクトを実行する可能性があり、セキュリティ上のリスクがあります。
            // 受取人が自分でお金を引き出せるようにするのが安全です。
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    /// Withdraw a bid that was overbid.
    /// 過大な入札を撤回する。
    function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // 受信者は `send` が戻る前に、受信コールの一部としてこの関数を再び呼び出すことができるので、これをゼロに設定することが重要です。
            pendingReturns[msg.sender] = 0;

            if (!payable(msg.sender).send(amount)) {
                // ここでコールを投げる必要はなく、ただリセットすれば良いです。
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    /// オークションを終了し、最高入札額を受益者に送付します。
    function auctionEnd() external {
        // 他のコントラクトと相互作用する関数（関数を呼び出したり、Etherを送ったりする）は、3つのフェーズに分けるのが良いガイドラインです。
        // 1. 条件をチェックする
        // 2. アクションを実行する（条件を変更する可能性がある）。
        // 3. 他のコントラクトと対話する
        // これらのフェーズが混在すると、他のコントラクトが現在のコントラクトにコールバックして状態を変更したり、エフェクト（エーテル払い出し）を複数回実行させたりする可能性があります。
        // 内部で呼び出される関数に外部コントラクトとの相互作用が含まれる場合は、外部コントラクトとの相互作用も考慮しなければなりません。

        // 1. 条件
        if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        // 2. エフェクト
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // 3. インタラクション
        beneficiary.transfer(highestBid);
    }
}

// 
contract BlindAuction {
    struct Bid {
        bytes32 blindedBid;
        uint deposit;
    }

    address payable public beneficiary;
    uint public biddingEnd;
    uint public revealEnd;
    bool public ended;

    mapping(address => Bid[]) public bids;

    address public highestBidder;
    uint public highestBid;

    // 以前の入札のうち取り下げを許可したもの
    mapping(address => uint) pendingReturns;

    event AuctionEnded(address winner, uint highestBid);

    // 失敗を表すエラー

    /// この関数は早く呼び出されすぎました。
    /// `time` 秒後にもう一度試してください。
    error TooEarly(uint time);
    /// この関数を呼び出すのが遅すぎました。
    /// `time` 秒後に呼び出すことはできません。
    error TooLate(uint time);
    /// 関数 auctionEnd はすでに呼び出されています。
    error AuctionEndAlreadyCalled();

    // 修飾子は、関数への入力を検証するための便利な方法です。
    // 以下の `onlyBefore` は `bid` に適用されます。
    // 新しい関数の本体は修飾子の本体で、 `_` が古い関数の本体に置き換わります。
    modifier onlyBefore(uint time) {
        if (block.timestamp >= time) revert TooLate(time);
        _;
    }
    modifier onlyAfter(uint time) {
        if (block.timestamp <= time) revert TooEarly(time);
        _;
    }

    constructor(
        uint biddingTime,
        uint revealTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        biddingEnd = block.timestamp + biddingTime;
        revealEnd = biddingEnd + revealTime;
    }

    /// `blindedBid` = keccak256(abi.encodePacked(value, fake, secret)) でブラインド入札を行います。
    /// 送信されたEtherは、リビールフェーズで入札が正しくリビールされた場合にのみ払い戻されます。
    /// 入札と一緒に送られたEtherが少なくとも「value」であり、「fake」がtrueでない場合、入札は有効です。
    /// 「fake」をtrueに設定し、正確な金額を送らないことで、本当の入札を隠しつつ、必要なデポジットを行うことができます。
    /// 同じアドレスで複数の入札を行うことができます。
    function bid(bytes32 blindedBid)
        external
        payable
        onlyBefore(biddingEnd)
    {
        bids[msg.sender].push(Bid({
            blindedBid: blindedBid,
            deposit: msg.value
        }));
    }

    /// ブラインドした入札を公開します。
    /// 正しくブラインドされた無効な入札と、完全に高い入札を除くすべての入札の払い戻しを受けることができます。
    function reveal(
        uint[] calldata values,
        bool[] calldata fakes,
        bytes32[] calldata secrets
    )
        external
        onlyAfter(biddingEnd)
        onlyBefore(revealEnd)
    {
        uint length = bids[msg.sender].length;
        require(values.length == length);
        require(fakes.length == length);
        require(secrets.length == length);

        uint refund;
        for (uint i = 0; i < length; i++) {
            Bid storage bidToCheck = bids[msg.sender][i];
            (uint value, bool fake, bytes32 secret) =
                    (values[i], fakes[i], secrets[i]);
            if (bidToCheck.blindedBid != keccak256(abi.encodePacked(value, fake, secret))) {
                // 入札は実際にリビールされていません。
                // デポジットを返金しません。
                continue;
            }
            refund += bidToCheck.deposit;
            if (!fake && bidToCheck.deposit >= value) {
                if (placeBid(msg.sender, value))
                    refund -= value;
            }
            // 送信者が同じデポジットを再クレームできないようにします。
            bidToCheck.blindedBid = bytes32(0);
        }
        payable(msg.sender).transfer(refund);
    }

    /// オーバーな入札を引き出す。
    function withdraw() external {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // これをゼロに設定することが重要です。
            // なぜなら、受信者は `transfer` が戻る前にリシーブしているコールの一部としてこの関数を再び呼び出すことができるからです（前で述べた 条件 -> エフェクト -> インタラクション に関する記述を参照してください）。
            pendingReturns[msg.sender] = 0;

            payable(msg.sender).transfer(amount);
        }
    }

    /// オークションを終了し、最高入札額を受益者に送ります。
    function auctionEnd()
        external
        onlyAfter(revealEnd)
    {
        if (ended) revert AuctionEndAlreadyCalled();
        emit AuctionEnded(highestBidder, highestBid);
        ended = true;
        beneficiary.transfer(highestBid);
    }

    // これは「内部」関数であり、コントラクト自身（または派生コントラクト）からしか呼び出すことができないことを意味します。
    function placeBid(address bidder, uint value) internal
            returns (bool success)
    {
        if (value <= highestBid) {
            return false;
        }
        if (highestBidder != address(0)) {
            // 前回の最高額入札者に払い戻しを行います。
            pendingReturns[highestBidder] += highestBid;
        }
        highestBid = value;
        highestBidder = bidder;
        return true;
    }
}

// 
contract Purchase {
    uint public value;
    address payable public seller;
    address payable public buyer;

    enum State { Created, Locked, Release, Inactive }
    // state変数のデフォルト値は、最初のメンバーである`State.created`です。
    State public state;

    modifier condition(bool condition_) {
        require(condition_);
        _;
    }

    /// 買い手だけがこの機能を呼び出すことができます。
    error OnlyBuyer();
    /// 売り手だけがこの機能を呼び出すことができます。
    error OnlySeller();
    /// 現在の状態では、この関数を呼び出すことはできません。
    error InvalidState();
    /// 提供される値は偶数でなければなりません。
    error ValueNotEven();

    modifier onlyBuyer() {
        if (msg.sender != buyer)
            revert OnlyBuyer();
        _;
    }

    modifier onlySeller() {
        if (msg.sender != seller)
            revert OnlySeller();
        _;
    }

    modifier inState(State state_) {
        if (state != state_)
            revert InvalidState();
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();
    event SellerRefunded();

    // `msg.value` が偶数であることを確認します。
    // 割り算は奇数だと切り捨てられます。
    // 奇数でなかったことを乗算で確認します。
    constructor() payable {
        seller = payable(msg.sender);
        value = msg.value / 2;
        if ((2 * value) != msg.value)
            revert ValueNotEven();
    }

    /// 購入を中止し、Etherを再クレームします。
    /// コントラクトがロックされる前に売り手によってのみ呼び出すことができます。
    function abort()
        external
        onlySeller
        inState(State.Created)
    {
        emit Aborted();
        state = State.Inactive;
        // ここではtransferを直接使っています。
        // この関数の最後の呼び出しであり、すでに状態を変更しているため、reentrancy-safeになっています。
        seller.transfer(address(this).balance);
    }

    /// 買い手として購入を確認します。
    /// 取引には `2 * value` のEtherが含まれていなければなりません。
    /// Etherは confirmReceived が呼ばれるまでロックされます。
    function confirmPurchase()
        external
        inState(State.Created)
        condition(msg.value == (2 * value))
        payable
    {
        emit PurchaseConfirmed();
        buyer = payable(msg.sender);
        state = State.Locked;
    }

    /// あなた（買い手）が商品を受け取ったことを確認します。
    /// これにより、ロックされていたEtherが解除されます。
    function confirmReceived()
        external
        onlyBuyer
        inState(State.Locked)
    {
        emit ItemReceived();
        // 最初に状態を変更することが重要です。
        // そうしないと、以下の `send` を使用して呼び出されたコントラクトが、ここで再び呼び出される可能性があるからです。
        state = State.Release;

        buyer.transfer(value);
    }

    /// この機能は、売り手に返金する、つまり売り手のロックされた資金を払い戻すものです。
    function refundSeller()
        external
        onlySeller
        inState(State.Release)
    {
        emit SellerRefunded();
        // otherwise, the contracts called using `send` below
        // can call in again here.
        // 最初に状態を変更することが重要です。
        // そうしないと、以下の `send` を使用して呼び出されたコントラクトが、ここで再び呼び出される可能性があるからです。
        state = State.Inactive;

        seller.transfer(3 * value);
    }
}

// 
contract ReceiverPays {
    address owner = msg.sender;

    mapping(uint256 => bool) usedNonces;

    constructor() payable {}

    function claimPayment(uint256 amount, uint256 nonce, bytes memory signature) external {
        require(!usedNonces[nonce]);
        usedNonces[nonce] = true;

        // this recreates the message that was signed on the client
        bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, amount, nonce, this)));

        require(recoverSigner(message, signature) == owner);

        payable(msg.sender).transfer(amount);
    }

    /// destroy the contract and reclaim the leftover funds.
    function shutdown() external {
        require(msg.sender == owner);
        selfdestruct(payable(msg.sender));
    }

    /// signature methods.
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}

// 
contract SimplePaymentChannel {
    address payable public sender;      // 支払いを送信するアカウント
    address payable public recipient;   // 支払いを受けるアカウント
    uint256 public expiration;  // 受信者が閉じない場合のタイムアウト

    constructor (address payable recipientAddress, uint256 duration)
        payable
    {
        sender = payable(msg.sender);
        recipient = recipientAddress;
        expiration = block.timestamp + duration;
    }

    /// 受信者は送信者から署名された金額を提示することで、いつでもチャンネルを閉じることができる。
    /// 受信者はその金額を送信し、残りは送信者に戻る。
    function close(uint256 amount, bytes memory signature) external {
        require(msg.sender == recipient);
        require(isValidSignature(amount, signature));

        recipient.transfer(amount);
        selfdestruct(sender);
    }

    /// 送信者はいつでも有効期限を延長することができます。
    function extend(uint256 newExpiration) external {
        require(msg.sender == sender);
        require(newExpiration > expiration);

        expiration = newExpiration;
    }

    /// 受信者がチャネルを閉じることなくタイムアウトに達した場合、Etherは送信者に戻されます。
    function claimTimeout() external {
        require(block.timestamp >= expiration);
        selfdestruct(sender);
    }

    function isValidSignature(uint256 amount, bytes memory signature)
        internal
        view
        returns (bool)
    {
        bytes32 message = prefixed(keccak256(abi.encodePacked(this, amount)));

        // 署名が支払い送信者のものであることを確認する。
        return recoverSigner(message, signature) == sender;
    }

    /// これ以下の関数はすべて「署名の作成と検証」の章から引用しているだけです。

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    /// eth_sign の動作を模倣して、接頭辞付きハッシュを構築します。
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}

// 
contract Purchase2 {
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

// 
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

//
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

// 
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

// 
contract ArrayContract {
    uint[2**20] m_aLotOfIntegers;
    // 以下は動的配列のペアではなく、ペアの動的配列（つまり長さ2の固定サイズ配列のペア）であることに注意してください。
    // T[]はT自体が配列であっても、常にTの動的配列となります。
    // すべての状態変数のデータロケーションはストレージです。
    bool[2][] m_pairsOfFlags;

    // newPairsはメモリに格納されます - パブリックコントラクト関数の引数として唯一の選択肢です。
    function setAllFlagPairs(bool[2][] memory newPairs) public {
        // ストレージ配列への代入は、 ``newPairs`` のコピーを実行し、完全な配列 ``m_pairsOfFlags`` を置き換えます。
        m_pairsOfFlags = newPairs;
    }

    struct StructType {
        uint[] contents;
        uint moreInfo;
    }
    StructType s;

    function f(uint[] memory c) public {
        // ``s`` への参照を ``g`` に格納します。
        StructType storage g = s;
        // ``s.moreInfo`` も変更します。
        g.moreInfo = 2;
        // コピーを代入します。
        // なぜなら ``g.contents`` はローカル変数ではなく、ローカル変数のメンバだからです。
        g.contents = c;
    }

    function setFlagPair(uint index, bool flagA, bool flagB) public {
        // 存在しないインデックスにアクセスすると、例外が発生します。
        m_pairsOfFlags[index][0] = flagA;
        m_pairsOfFlags[index][1] = flagB;
    }

    function changeFlagArraySize(uint newSize) public {
        // 配列の長さを変更するには、push と pop を使用するのが唯一の方法です。
        if (newSize < m_pairsOfFlags.length) {
            while (m_pairsOfFlags.length > newSize)
                m_pairsOfFlags.pop();
        } else if (newSize > m_pairsOfFlags.length) {
            while (m_pairsOfFlags.length < newSize)
                m_pairsOfFlags.push();
        }
    }

    function clear() public {
        // これらは、配列を完全にクリアします。
        delete m_pairsOfFlags;
        delete m_aLotOfIntegers;
        // これも同じ効果です。
        m_pairsOfFlags = new bool[2][](0);
    }

    bytes m_byteData;

    function byteArrays(bytes memory data) public {
        // バイト配列（"bytes"）はパディングなしで格納されるため異なりますが、"uint8[]"と同じように扱うことができます。
        m_byteData = data;
        for (uint i = 0; i < 7; i++)
            m_byteData.push();
        m_byteData[3] = 0x08;
        delete m_byteData[2];
    }

    function addFlag(bool[2] memory flag) public returns (uint) {
        m_pairsOfFlags.push(flag);
        return m_pairsOfFlags.length;
    }

    function createMemoryArray(uint size) public pure returns (bytes memory) {
        // 動的メモリ配列は `new` を用いて作成する。
        uint[2][] memory arrayOfPairs = new uint[2][](size);

        // インライン配列は常に静的サイズであり、リテラルのみを使用する場合は、少なくとも1つの型を提供する必要があります。
        arrayOfPairs[0] = [uint(1), 2];

        // ダイナミックバイト列を作成する。
        bytes memory b = new bytes(200);
        for (uint i = 0; i < b.length; i++)
            b[i] = bytes1(uint8(i));
        return b;
    }
}

// 
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

// 
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

// 
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

// 
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

// 
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

// 
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

// 
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

// 

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

// 
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
contract Complex {
    struct Data {
        uint a;
        bytes3 b;
        mapping (uint => uint) map;
        uint[3] c;
        uint[] d;
        bytes e;
    }
    mapping (uint => mapping(bool => Data[])) public data;
}

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

// 

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

// 
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

// 
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

// 
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

// 
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

// 
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

// 
struct Data1 { mapping(uint => bool) flags; }

library Set1 {
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

// 
library GetCode {
    function at(address _addr) public view returns (bytes memory o_code) {
        assembly {
            // コードのサイズを取得します。これはアセンブリが必要です。
            let size := extcodesize(_addr)
            // 出力バイト配列を確保します。
            // これは、o_code = new bytes(size) を用いて，アセンブリなしで行うこともできます。
            o_code := mload(0x40)
            // パディングを含む新しい"memory end"です。
            mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
            // メモリにコードサイズを格納します。
            mstore(o_code, size)
            // 実際のコードを取得します。これはアセンブリが必要です。
            extcodecopy(_addr, add(o_code, 0x20), 0, size)
        }
    }
}

// 
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

// 
