pragma solidity ^0.8.13;

//IERC721とは、ERC721トークンのインターフェースです。
interface IERC721 {
   //transferFromとは、所有権を移転する関数です。
   function transferFrom(address _from, address _to, uint _tokenId) external;

}

//DutchAuctionとは、DutchAuctionコントラクトです。
contract DutchAuction {
   uint private constant DURATION = 7 days;

    IERC721 public immutable nft;
    uint public immutable nftId;

    address payable public immutable seller;
    uint public immutable startingPrice;
    uint public immutable startAt;
    uint public immutable expiresAt;
    uint public immutable discountRate;

    //constructorとは、コンストラクタです。
      constructor(IERC721 _nft, uint _nftId, address payable _seller, uint _startingPrice, uint _discountRate) {
         nft = _nft;
         nftId = _nftId;
         seller = _seller;
         startingPrice = _startingPrice;
         startAt = block.timestamp;
         expiresAt = block.timestamp + DURATION;
         discountRate = _discountRate;
      }

      //getPriceとは、価格を取得する関数です。
      function getPrice() external view returns (uint) {
         if (block.timestamp <= startAt) {
            return startingPrice;
         } else if (block.timestamp >= expiresAt) {
            return 0;
         } else {
            uint elapsed = block.timestamp - startAt;
            return startingPrice - (startingPrice * elapsed * discountRate / DURATION / 100);
         }
      }
      //buyとは、購入する関数です。
      function buy() external payable {
         uint price = getPrice();
         require(msg.value >= price, "Insufficient funds");
         nft.transferFrom(address(this), msg.sender, nftId);
         seller.transfer(msg.value);
      }

      

}