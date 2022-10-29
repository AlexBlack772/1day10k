pragma solidity ^0.8.13;

interface IERC721 {
   //safeTransferFromとは、トークンを送る関数
   function safeTransferFrom(
      address from,
      address to,
      uint256 tokenId
   ) external;
   //trasferFromとは、トークンを送る関数
   function transferFrom(
      address from,
      address to,
      uint256 tokenId
   ) external;

}

//EnglishAuctionとは、英語オークションを行うコントラクト
contract EnglishAuction {
   //Startとは、オークションを開始するイベント
    event Start();
      //Bidとは、オークションに入札するイベント
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address winner, uint amount);

    IERC721 public nft;
    uint public nftId;

    address payable public seller;
    uint public endAt;
    //startedとは、オークションが開始されたかどうかを格納する変数
    bool public started;
    bool public ended;

    address public highestBidder;
    uint public highestBid;
    //bidsとは、入札額を格納する変数
    mapping(address => uint) public bids;

    //constructorとは、コントラクトをデプロイする際に呼び出される関数
      constructor(
         IERC721 _nft,
         uint _nftId,
         uint _duration
      ) {
         nft = _nft;
         nftId = _nftId;
         seller = payable(msg.sender);
         endAt = block.timestamp + _duration;
      }

      //startとは、オークションを開始する関数
      function start() external {
         require(msg.sender == seller, "EnglishAuction: not seller");
         require(!started, "EnglishAuction: already started");
         started = true;
         emit Start();
      }

      //bidとは、オークションに入札する関数
      function bid() external payable {
         require(started, "EnglishAuction: not started");
         require(!ended, "EnglishAuction: already ended");
         require(block.timestamp < endAt, "EnglishAuction: already ended");
         require(msg.value > highestBid, "EnglishAuction: bid too low");
         bids[msg.sender] += msg.value;
         if (highestBidder != address(0)) {
            bids[highestBidder] -= highestBid;
         }
         highestBidder = msg.sender;
         highestBid = msg.value;
         emit Bid(msg.sender, msg.value);
      }

      //withdrawとは、オークションに入札したトークンを取り消す関数
      function withdraw() external {
         require(started, "EnglishAuction: not started");
         require(!ended, "EnglishAuction: already ended");
         require(block.timestamp < endAt, "EnglishAuction: already ended");
         uint amount = bids[msg.sender];
         require(amount > 0, "EnglishAuction: nothing to withdraw");
         bids[msg.sender] = 0;
         payable(msg.sender).transfer(amount);
         emit Withdraw(msg.sender, amount);
      }

      //endとは、オークションを終了する関数
      function end() external {
         require(started, "EnglishAuction: not started");
         require(!ended, "EnglishAuction: already ended");
         require(block.timestamp >= endAt, "EnglishAuction: not ended yet");
         ended = true;
         nft.safeTransferFrom(address(this), highestBidder, nftId);
         payable(seller).transfer(highestBid);
         emit End(highestBidder, highestBid);
      }
      
}