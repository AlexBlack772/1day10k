pragma solidity ^0.8.13;

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint tokenId
    ) external;

    function transferFrom(
        address,
        address,
        uint
    ) external;
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

    //constructorとは、コントラクトをデプロイする際に呼び出される関数

      constructor(
         IERC721 _nft,
         uint _nftId,
         address payable _seller,
         uint _duration
      ) {
         nft = _nft;
         nftId = _nftId;
         seller = _seller;
         endAt = block.timestamp + _duration;
      }

      //startとは、オークションを開始する関数
      function start() external {
         require(msg.sender == seller, "EnglishAuction: only seller can start");
         require(!started, "EnglishAuction: auction already started");
         started = true;
         emit Start();
      }

      //bidとは、オークションに参加する関数
      function bid() external payable {
         require(started, "EnglishAuction: auction not started");
         require(!ended, "EnglishAuction: auction already ended");
         require(block.timestamp < endAt, "EnglishAuction: auction already ended");
         require(msg.value > highestBid, "EnglishAuction: bid too low");
         bids[msg.sender] += msg.value;
         if (highestBidder != address(0)) {
            bids[highestBidder] -= highestBid;
         }
         highestBidder = msg.sender;
         highestBid = msg.value;
         emit Bid(msg.sender, msg.value);
      }

      //withdrawとは、オークションに参加した際に支払った金額を取り戻す関数
      function withdraw() external {
         require(started, "EnglishAuction: auction not started");
         require(!ended, "EnglishAuction: auction already ended");
         require(block.timestamp < endAt, "EnglishAuction: auction already ended");
         uint amount = bids[msg.sender];
         bids[msg.sender] = 0;
         payable(msg.sender).transfer(amount);
         emit Withdraw(msg.sender, amount);
      }
      //endとは、オークションを終了する関数
      function end() external {
         require(started, "EnglishAuction: auction not started");
         require(!ended, "EnglishAuction: auction already ended");
         require(block.timestamp >= endAt, "EnglishAuction: auction not ended");
         ended = true;
         nft.safeTransferFrom(address(this), highestBidder, nftId);
         seller.transfer(highestBid);
         emit End(highestBidder, highestBid);
      }

}