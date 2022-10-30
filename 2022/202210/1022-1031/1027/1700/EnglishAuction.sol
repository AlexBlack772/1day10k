pragma solidity ^0.6.0;

interface IERC721 {
   //safeTransferFromとは、安全に転送する
   function safeTransferFrom(address from, address to, uint256 tokenId) external;
   //transferFromとは、転送する
   function transferFrom(address from, address to, uint256 tokenId) external;

}

contract EnglishAuction {
   event Start();
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address winner, uint amount);

    IERC721 public nft;
    uint public nftId;

    address payable public seller;
    uint public endAt;
    bool public started;
    bool public ended;

    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;

    constructor(address _nft, uint _nftId, uint _duration) public {
        nft = IERC721(_nft);
        nftId = _nftId;
        seller = msg.sender;
        endAt = now + _duration;
    }

    //
    funciton start() external {
         require(msg.sender == seller, "only seller can start");
         require(!started, "already started");
         started = true;
         emit Start();  
    }
    //bidとは、入札する
      function bid() external payable {
         require(started, "not started");
         require(!ended, "already ended");
         require(now < endAt, "already ended");
         require(msg.value > highestBid, "too low bid");
   
         if (highestBidder != address(0)) {
               bids[highestBidder] += highestBid;
         }
   
         highestBidder = msg.sender;
         highestBid = msg.value;
         emit Bid(msg.sender, msg.value);
      }  

   //withdrawとは、引き出す
   function withdraw() external {
      require(started, "not started");
      require(!ended, "already ended");
      require(now < endAt, "already ended");
      require(msg.sender != highestBidder, "highest bidder cannot withdraw");

      uint amount = bids[msg.sender];
      bids[msg.sender] = 0;
      msg.sender.transfer(amount);
      emit Withdraw(msg.sender, amount);
   }

   //endとは、終了する
   function end() external {
      require(started, "not started");
      require(!ended, "already ended");
      require(now >= endAt, "not ended yet");

      ended = true;
      nft.transferFrom(address(this), highestBidder, nftId);
      seller.transfer(highestBid);
      emit End(highestBidder, highestBid);
   }
   

}