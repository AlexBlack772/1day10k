pragma solidity ^0.8.13;

//IERC721とは、ERC721トークンのインターフェース
interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint _nftId
    ) external;
}

//DutchAuctionとは、ダッチオークションを行うコントラクト
contract DutchAuction {
   uint private constant DURATION = 7 days;

    IERC721 public immutable nft;
    uint public immutable nftId;

    address payable public immutable seller;
    uint public immutable startingPrice;
    uint public immutable startAt;
    uint public immutable expiresAt;
    //discountRateとは、オークションの割引率を格納する変数
    uint public immutable discountRate;

    //constructorとは、コントラクトをデプロイする際に呼び出される関数
      constructor(
         IERC721 _nft,
         uint _nftId,
         uint _startingPrice,
         uint _discountRate
      ) {
         nft = _nft;
         nftId = _nftId;
         seller = payable(msg.sender);
         startingPrice = _startingPrice;
         startAt = block.timestamp;
         expiresAt = block.timestamp + DURATION;
         discountRate = _discountRate;
      }

      //getPriceとは、現在のオークションの価格を取得する関数
      function getPrice() public view returns (uint) {
         if (block.timestamp >= expiresAt) {
            return 0;
         }
         uint price = startingPrice;
         uint timePassed = block.timestamp - startAt;
         for (uint i = 0; i < timePassed; i++) {
            price -= price * discountRate / 100;
         }
         return price;
      }

      //buyとは、オークションに入札する関数
      function buy() external payable {
         require(block.timestamp < expiresAt, "DutchAuction: expired");
         uint price = getPrice();
         require(msg.value >= price, "DutchAuction: insufficient amount");
         nft.transferFrom(address(this), msg.sender, nftId);
         payable(msg.sender).transfer(msg.value - price);
         payable(seller).transfer(price);
      }
      
}