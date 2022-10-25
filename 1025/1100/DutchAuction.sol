pragma solidity ^0.8.13;

interface IERC721 {
   function transferFrom(address from, address to, uint256 tokenId) external;
   
}

contract Ductch Auction {
   uint private constant _duration = 1 days;

   IERC721 public nft;
   uint public nftId;

   address payable public seller;
   uint public startPrice;
   uint public endPrice;
   uint public startTime;
   uint public endTime;
   uint public discount;

   constructor(
         address _nft,
         uint _nftId,
         uint _startPrice,
         uint _endPrice,
         uint _discount
      ) {
         nft = IERC721(_nft);
         nftId = _nftId;
         seller = payable(msg.sender);
         startPrice = _startPrice;
         endPrice = _endPrice;
         discount = _discount;
         startTime = block.timestamp;
         endTime = startTime + _duration;
      }
   
   function getPrice() public view returns (uint) {
      if (block.timestamp >= endTime) {
         return endPrice;
      } else {
         uint timePassed = block.timestamp - startTime;
         return startPrice - (timePassed * discount);
      }
   }

   function bid() public payable {
      require(block.timestamp < endTime, "Auction has ended");
      require(msg.value >= getPrice(), "Bid price is too low");
      nft.transferFrom(seller, msg.sender, nftId);
      seller.transfer(msg.value);
      endTime = block.timestamp;
   }

}