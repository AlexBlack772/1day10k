
pragma solidity >=0.7.0 <0.9.0;
/// @title 委任による投票
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


library Balances {
    function move(mapping(address => uint256) storage balances, address from, address to, uint amount) internal {
        require(balances[from] >= amount);
        require(balances[to] + amount >= balances[to]);
        balances[from] -= amount;
        balances[to] += amount;
    }
}

contract Token {
    mapping(address => uint256) balances;
    using Balances for *;
    mapping(address => mapping (address => uint256)) allowed;

    event Transfer(address from, address to, uint amount);
    event Approval(address owner, address spender, uint amount);

    function transfer(address to, uint amount) external returns (bool success) {
        balances.move(msg.sender, to, amount);
        emit Transfer(msg.sender, to, amount);
        return true;

    }

    function transferFrom(address from, address to, uint amount) external returns (bool success) {
        require(allowed[from][msg.sender] >= amount);
        allowed[from][msg.sender] -= amount;
        balances.move(from, to, amount);
        emit Transfer(from, to, amount);
        return true;
    }

    function approve(address spender, uint tokens) external returns (bool success) {
        require(allowed[msg.sender][spender] == 0, "");
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function balanceOf(address tokenOwner) external view returns (uint balance) {
        return balances[tokenOwner];
    }
}

