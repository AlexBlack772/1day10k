pragma solidity ^0.4.24;

contract stableAuction {

   uint public total;
   uint public count;
   uint public plusBid;
   uint public nowPrice;

   function priceUp() public {
      nowPrice = plusBid + 1;
      balanceOf[msg.sender] =+ token0;
   }

   function priceDown() public {
      nowPrice = plusBid - 1;
      balanceOf[msg.sender] =+ token0;
   }

   function start() public {
      nowPrice = 0;
   }

   function finish() public {
      nowPrice = 0;
   }

   function emergencyStop() public {

   }

   function 
   
   
}