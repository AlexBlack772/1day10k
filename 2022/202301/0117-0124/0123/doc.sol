// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
/// @title 委任による投票
contract Ballot {
   struct Voter {
         uint weight; // 投票の重み
         bool voted;  // すでに投票したかどうか
         address delegate; // 委任先
         uint vote;   // 投票した提案のインデックス
   }

   struct Proposal {
         bytes32 name;   // 提案の名前
         uint voteCount; // 投票数
   }

   address public chairperson;
   
   mapping(address => Voter) public voters;

   Proposal[] public proposals;

   constructor (bytes32[] memory proposalNames) {
         chairperson = msg.sender;
         voters[chairperson].weight = 1;

         for (uint i = 0; i < proposalNames.length; i++) {
               proposals.push(Proposal({
                     name: proposalNames[i],
                     voteCount: 0
               }));
         }
   }

   function giveRightToVote(address voter) external {
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

   function delegate(address to) external {
      Voter storage sender = voters[msg.sender];
      require(!sender.voted, "You already voted.");

      require(to != msg.sender, "Self-delegation is disallowed.");

      while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            require(to != msg.sender, "Found loop in delegation.");
      }

      sender.voted = true;
      sender.delegate = to;
      Voter storage delegate_ = voters[to];
      if (delegate_.voted) {
            proposals[delegate_.vote].voteCount += sender.weight;
      } else {
            delegate_.weight += sender.weight;
      }

   }

   function vote(uint proposal) external {
      Voter storage sender = voters[msg.sender];
      require(sender.weight != 0, "Has no right to vote");
      require(!sender.voted, "Already voted.");
      sender.voted = true;
      sender.vote = proposal;

      proposals[proposal].voteCount += sender.weight;
   }

   function winningProposal() public view returns (uint winningProposal_){
      uint winningVoteCount = 0;
      for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                  winningVoteCount = proposals[p].voteCount;
                  winningProposal_ = p;
            }
      }

   }

   function winnerName() external view returns (bytes32 winnerName_) {
      winnerName_ = proposals[winningProposal()].name;
   }

}

contract SimpleAuction {
      address payable public beneficiary;
      uint public auctionEndTime;

      address public highestBidder;
      uint public highestBid;

      mapping(address => uint) pendingReturns;

      bool ended;

      event HighestBidIncreased(address bidder, uint amount);
      event AuctionEnded(address winner, uint amount);

      error AuctionAlreadyEnded();

      error BidNotHighEnough(uint highestBid);

      error AuctionNotYetEnded();

      error AuctionEndAlreadyCalled();

      constructor(
            uint biddingTime,
            address payable beneficiaryAddress
      ) {
            beneficiary = beneficiaryAddress;
            auctionEndTime = block.timestamp + biddingTime;
      }

      function bid() external payable {
            if (block.timestamp > auctionEndTime)
                  revert AuctionAlreadyEnded();

            if (msg.value <= highestBid)
                  revert BidNotHighEnough();

            if (highestBid != 0) {
                  pendingReturns[highestBidder] += highestBid;
            }
            highestBidder = msg.sender;
            highestBid = msg.value;
            emit HighestBidIncreased(msg.sender, msg.value);
      }

      function withdraw() external returns (bool) {
            uint amount = pendingReturns[msg.sender];
            if (amount > 0) {
                  pendingReturns[msg.sender] = 0;

                  if (!payable(msg.sender).send(amount)) {
                        pendingReturns[msg.sender] = amount;
                        return false;
                  }
            }
            return true;
      }

      function auctionEnd() external {
            if (block.timestamp < auctionEndTime)
                  revert AuctionNotYetEnded();

            if (ended)
                  revert AuctionEndAlreadyCalled();

            ended = true;
            emit AuctionEnded(highestBidder, highestBid);

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

      mapping(address => uint) pendingReturns;

      event AuctionEnded(address winner, uint highestBid);

      error TooEarly(uint time);
      error TooLate(uint time);
      error AuctionEndAlreadyCalled();

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

      function bid(bytes32 _blindedBid) external payable onlyBefore(biddingEnd) {
            bids[msg.sender].push(Bid({
                  blindedBid: _blindedBid,
                  deposit: msg.value
            }));
      }

      function reveal(
            uint[] calldata value,
            bool[] calldata fake,
            bytes32[] calldata secrets
      )
      external onlyAfter(biddingEnd) onlyBefore(revealEnd)
      {
            uint length = bids[msg.sender].length;
            require(
                  value.length == length &&
                  fake.length == length &&
                  secrets.length == length,
                  "Input array length does not match."
            );

            uint refund;
            for (uint i = 0; i < length; i++) {
                  Bid storage bidToCheck = bids[msg.sender][i];
                  (uint value_, bool fake_, bytes32 secret) =
                        (value[i], fake[i], secrets[i]);
                  if (bidToCheck.blindedBid != keccak256(abi.encodePacked(value_, fake_, secret))) {
                        continue;
                  }
                  refund += bidToCheck.deposit;
                  if (!fake_ && bidToCheck.deposit >= value_) {
                        if (placeBid(msg.sender, value_))
                              refund -= value_;
                  }
                  bidToCheck.blindedBid = bytes32(0);
            }
            payable(msg.sender).transfer(refund);
      }

      function withdraw() external  {
            uint amount = pendingReturns[msg.sender];
            if (amount > 0) {
                  pendingReturns[msg.sender] = 0;
            }
      }

      function auctionEnd() external onlyAfter(revealEnd) {
            if (ended)
                  revert AuctionEndAlreadyCalled();

            emit AuctionEnded(highestBidder, highestBid);

            ended = true;
            beneficiary.transfer(highestBid);
      }

      function placeBid(address bidder, uint value) internal returns (bool success) {
            if (value <= highestBid) {
                  return false;
            }
            if (highestBidder != address(0)) {
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

      enum State { Created, Locked, Inactive }
      State public state;

      modifier condition(bool _condition) {
            require(_condition);
            _;
      }

      error OnlyBuyer();
      error OnlySeller();
      error InvalidState();
      error ValueNotEven();

      modifier onlyBuyer() {
            if (msg.sender != buyer) revert OnlyBuyer();
            _;
      }

      modifier onlySeller() {
            if (msg.sender != seller) 
            revert OnlySeller();
            _;
      }

      modifier inState(State _state) {
            if (state != _state) 
             revert InvalidState();
            _;
      }

      event Aborted();
      event PurchaseConfirmed();
      event ItemReceived();
      event SellerRefunded();

      constructor() payable {
            seller = payable(msg.sender);
            value = msg.value / 2;
            if ((2 * value) != msg.value) revert ValueNotEven();
      }

      function abort()
      external
      onlySeller
      inState(State.Created)
      {
            emit Aborted();
            state = State.Inactive;
            seller.transfer(address(this).balance);
      }

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


      function confirmReceived()
      external
      onlyBuyer
      inState(State.Locked)
      {
            emit ItemReceived();
            state = State.Release;

            buyer.transfer(value);
      }

      function refundSeller()
      external
      onlySeller
      inState(State.Release)
      {
            emit SellerRefunded();
            state = State.Inactive;

            seller.transfer(3 * value);
      }

}

contract ReceiverPays{
      address owner = msg.sender;

      mapping(uint256 => bool) usedNonces;

      constructor() payable {}

      function claimPayment(uint256 amount, uint256 nonce, bytes memory signature) external {
            require(!usedNonces[nonce]);
            usedNonces[nonce] = true;

            bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, amount, nonce, this)));

            require(recoverSigner(message, signature) == owner);

            payable(msg.sender).transfer(amount);
      }

      function shutdown() external {
            require(msg.sender == owner);
            selfdestruct(payable(msg.sender));
      }

      function splitSignature(bytes memory sig)
      internal
      pure
      returns (uint8 v,bytes32 r, bytes32 s)
      {
            require(sig.length == 65);

            assembly {
                  r := mload(add(sig, 32))
                  s := mload(add(sig, 64))
                  v := byte(0, mload(add(sig, 96)))
            }

            return (v,r,s);
      }

      function recoverSigner(bytes32 message, bytes memory sig)
      internal
      pure
      returns (address)
      {
            (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

            return ecrecover(message, v, r, s);
      }

      function prefixed(bytes32 hash) internal pure returns (bytes32) {
            return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
      }

}

contract SimplePaymentChannel {
      address payable public sender;
      address payable public recipient;
      uint256 public expiration;

      constructor(address payable recipientAddress, uint256 duration)
      payable
      {
            sender = payable(msg.sender);
            recipient = recipientAddress;
            expiration = block.timestamp + duration;
      }

      function close(uint256 amount, bytes memory signature) external {
            require(msg.sender == recipient);
            require(isValidSignature(amount, signature));

            recipient.transfer(amount);
            selfdestruct(sender);
      }

      function extend(uint256 newExpiration) external {
            require(msg.sender == sender);
            require(newExpiration > expiration);

            expiration = newExpiration;
      }

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

            return recoverSigner(message, signature) == sender;
      }

      function splitSignature(bytes memory sig)
      internal
      pure
      returns (uint8 v, bytes32 r, bytes32 s)
      {
            require(sig.length == 65);

            assembly {
                  r := mload(add(sig, 32))
                  s := mload(add(sig, 64))
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

      function prefixed(bytes32 hash) internal pure returns (bytes32) {
            return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
      }

}

library Balaces{
      function move(mapping(address => uint) storage balances, address from, address to, uint amount) internal {
            require(balances[from] >= amount);
            require(balances[to] + amount >= balances[to]);
            balances[from] -= amount;
            balances[to] += amount;
      }

}

contract Token {
      mapping(address => uint256) balances;
      using Balaces for *;
      mapping(address => mapping(address => uint256)) allowed;

      event Transfer(address from, address to, uint256 amount);
      event Approval(address owner, address spender, uint256 amount);

      function transfer(address to, uint256 amount) external returns (bool success) {
            balances.move(msg.sender, to, amount);
            emit Transfer(msg.sender, to, amount);
            return true;
      }



      function transferFrom(address from, address to, uint256 amount) external returns (bool success) {
            require(allowed[from][msg.sender] >= amount);
            allowed[from][msg.sender] -= amount;
            balances.move(from, to, amount);
            emit Transfer(from, to, amount);
            return true;
      }

      function approve(address spender, uint256 amount) external returns (bool success) {
            allowed[msg.sender][spender] = amount;
            emit Approval(msg.sender, spender, amount);
            return true;
      }

      function balanceOf(address tokenOwner) external view returns (uint256 balance) {
            return balances[tokenOwner];
      }

}

contract Oracle {
      struct Request {
            bytes data;
            function(uint) external callback;
      }

      Request[] public requests;
      event NewRequest(uint);

      function query(bytes memory data, function(uint) external callback) external {
            requests.push(Request(data, callback));
            emit NewRequest(requests.length - 1);
      }

      function reply(uint requestID, uint response) public  {
            requests[requestID].callback(response);
      }
}

contract OracleUser {
      Oracle constant private ORACLE_CONST = Oracle(address(0x1234567890123456789012345678901234567890));

      uint private exchangeRate;

      function buySomething() public  {
            ORACLE_CONST.query("USD", this.oracleResponse);
      }

      function oracleResponse(uint response) public  {
            require(msg.sender == address(oracle));
            exchangeRate = response;
      }

}

contract ArrayContract {
      uint[2**20] m_aLotOfIntegers;
      bool[2][] m_pairsOfFlags;

      function setAllFlagPairs(bool flag) public {
            for (uint i = 0; i < m_pairsOfFlags.length; ++i)
                  m_pairsOfFlags[i][0] = m_pairsOfFlags[i][1] = flag;
      }

      


      function f(uint[] memory _arr) public {
            arr = _arr;
      }
}



