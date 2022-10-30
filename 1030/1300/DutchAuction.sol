pragma solidity ^0.8.13;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint _nftId
    ) external;
}

//DutchAuctionとは、ダッチオークション
contract DutchAuction {
    uint private constant DURATION = 7 days;

    IERC721 public immutable nft;
    uint public immutable nftId;

    address payable public immutable seller;
    uint public immutable startingPrice;
    uint public immutable startAt;
    uint public immutable expiresAt;
    uint public immutable discountRate;

    //constructorとは、コントラクトをデプロイする際に呼び出される関数

      constructor(
         IERC721 _nft,
         uint _nftId,
         address payable _seller,
         uint _startingPrice,
         uint _discountRate
      ) {
         require(_discountRate < 100, "DutchAuction: discount rate is too high");
         nft = _nft;
         nftId = _nftId;
         seller = _seller;
         startingPrice = _startingPrice;
         startAt = block.timestamp;
         expiresAt = block.timestamp + DURATION;
         discountRate = _discountRate;
      }

      //getPriceとは、現在の価格を取得する関数
      function getPrice() public view returns (uint) {
         if (block.timestamp >= expiresAt) {
            return 0;
         }
         uint elapsed = block.timestamp - startAt;
         uint discount = (startingPrice * discountRate * elapsed) / (DURATION * 100);
         return startingPrice - discount;
      }

      //buyとは、オークションに参加する関数
      function buy() external payable {
         require(block.timestamp < expiresAt, "DutchAuction: auction has ended");
         uint price = getPrice();
         require(msg.value >= price, "DutchAuction: insufficient funds");
         nft.transferFrom(address(this), msg.sender, nftId);
         if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
         }
         payable(seller).transfer(price);
      }

      
}