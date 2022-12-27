pragma solidity ^0.8.13;

interface IERC721 {
   function transferFrom(address _from, address _to, uint256 _nftId) external;
}

contract DutchAuction {

   uint private constant DURATION = 7 days; // 5%

   IERC721 public immutable nft;
   uint256 public nftId;

   address payable public immutable seller;
   uint256 public immutable startPrice;
   uint256 public immutable startAt;
   uint256 public immutable expiresAt;
   uint public immutable discountRate;

   constructor(
       uint256 _startingPrice,
       uint256 _discountRate,
       uint256 _nft,
       uint256 _nftId
   ) {
       seller = payable(msg.sender);
       startingPrice = _startingPrice;
       startAt = block.timestamp;
       expiresAt = block.timestamp + DURATION;
       discountRate = _discountRate;

       require(_startingPrice >= _discountRate, "Discount rate must be less than 100");
      
         nft = IERC721(_nft);
         nftId = _nftId;
   }

   function getPrice() public view returns (uint256) {
       uint256 timeElapsed = block.timestamp - startAt;
       uint256 discount = discountRate * timeElapsed;
       return startingPrice - discount;
   }

   function buy() public payable {
       require(block.timestamp < expiresAt, "Auction has expired");
       uint price = getPrice();
       require(msg.value >= getPrice(), "Insufficient funds");

       nft.transferFrom(address(this), msg.sender, nftId);
       uint refund = msg.value - price;
         if (refund > 0) {
            payable(msg.sender).transfer(refund);
         }
         selfdestruct(price);
   }

}