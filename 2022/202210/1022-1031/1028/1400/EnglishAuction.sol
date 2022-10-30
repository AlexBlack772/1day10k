pragma solidity ^0.8.13;

//IERC721とは、ERC721トークンのインターフェースです。
interface IERC721 {
   //transferFromとは、所有権を移転する関数です。
   function transferFrom(address _from, address _to, uint _tokenId) external;
   //safeTransferFromとは、所有権を移転する関数です。
   function safeTransferFrom(address _from, address _to, uint _tokenId) external;

}

//EnglishAuctionとは、EnglishAuctionコントラクトです。
contract EnglishAuction {
   //Start()
   event Start(uint _tokenId, uint _startingPrice, uint _duration);
   //Bid()
   event Bid(uint _tokenId, address _bidder, uint _amount);
   //End()
   event End(uint _tokenId, address _winner, uint _amount);

   IERC721 public nft;
    uint public nftId;

    address payable public seller;
    uint public endAt;
    bool public started;
    bool public ended;

    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;

    //constructorとは、コントラクトがデプロイされたときに実行される関数です。
      constructor(address _nft, uint _nftId) {
         nft = IERC721(_nft);
         nftId = _nftId;
         seller = payable(msg.sender);
      }
      //startとは、オークションを開始する関数です。
      function start(uint _startingPrice, uint _duration) external {
         require(msg.sender == seller, "Only seller can start the auction");
         require(!started, "Auction already started");
         require(!ended, "Auction already ended");
         started = true;
         endAt = block.timestamp + _duration;
         highestBid = _startingPrice;
         emit Start(nftId, _startingPrice, _duration);
      }

      //bidとは、オークションに入札する関数です。
      function bid() external payable {
         require(started, "Auction not started");
         require(!ended, "Auction already ended");
         require(block.timestamp < endAt, "Auction already ended");
         require(msg.value > highestBid, "Must bid higher than highest bid");
         bids[msg.sender] += msg.value;
         highestBidder = msg.sender;
         highestBid = msg.value;
         emit Bid(nftId, msg.sender, msg.value);
      }

      //withdrawとは、オークションに入札した金額を引き出す関数です。
      function withdraw() external {
         require(ended, "Auction not ended");
         require(msg.sender != highestBidder, "Highest bidder cannot withdraw");
         uint amount = bids[msg.sender];
         bids[msg.sender] = 0;
         payable(msg.sender).transfer(amount);
      }

      //endとは、オークションを終了する関数です。
      function end() external {
         require(started, "Auction not started");
         require(!ended, "Auction already ended");
         require(block.timestamp >= endAt, "Auction not ended");
         ended = true;
         nft.safeTransferFrom(address(this), highestBidder, nftId);
         payable(seller).transfer(highestBid);
         emit End(nftId, highestBidder, highestBid);
      }

      


}