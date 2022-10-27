pragma solidity ^0.6.0;

interface IERC {
   //transferとは、転送する
   function transferFrom(address recipient, uint256 amount) external returns (bool);
}

//DutchAuctionとは、ダッチオークション
contract DutchAuction {
   //IERCとは、ERCトークン
   IERC public token;
   //startとは、開始
   uint256 public start;
   //endとは、終了
   uint256 public end;
   //startPriceとは、開始価格
   uint256 public startPrice;
   //endPriceとは、終了価格
   uint256 public endPrice;
   //ownerとは、所有者
   address public owner;

   //DutchAuctionとは、ダッチオークション
   constructor(
      IERC _token,
      uint256 _start,
      uint256 _end,
      uint256 _startPrice,
      uint256 _endPrice
   ) public {
      //tokenとは、トークン
      token = _token;
      //startとは、開始
      start = _start;
      //endとは、終了
      end = _end;
      //startPriceとは、開始価格
      startPrice = _startPrice;
      //endPriceとは、終了価格
      endPrice = _endPrice;
      //ownerとは、所有者
      owner = msg.sender;
   }

   //bidとは、入札する
   function bid() external payable {
      //requireとは、要求する
      require(block.timestamp >= start, "Auction not started");
      //requireとは、要求する
      require(block.timestamp <= end, "Auction ended");
      //requireとは、要求する
      require(msg.value >= currentPrice(), "Insufficient bid");
      //requireとは、要求する
      require(token.transferFrom(msg.sender, address(this), 1), "Transfer failed");
      //requireとは、要求する
      require(msg.sender.send(msg.value - currentPrice()), "Refund failed");
   }

   //currentPriceとは、現在の価格を取得する
   function currentPrice() public view returns (uint256) {
      //requireとは、要求する
      require(block.timestamp >= start, "Auction not started");
      //requireとは、要求する
      require(block.timestamp <= end, "Auction ended");
      //requireとは、要求する
      require(startPrice

   }

   //getPriceとは、価格を取得する
   function getPrice() external view returns (uint256) {
      //requireとは、要求する
      require(block.timestamp >= start, "Auction not started");
      //requireとは、要求する
      require(block.timestamp <= end, "Auction ended");
      //requireとは、要求する
      require(startPrice

   }

   //buyとは、購入する
   function buy() external {
      //requireとは、要求する
      require(block.timestamp >= end, "Auction not ended");
      //requireとは、要求する
      require(token.transferFrom(address(this), msg.sender, 1), "Transfer failed");
   }
   
}