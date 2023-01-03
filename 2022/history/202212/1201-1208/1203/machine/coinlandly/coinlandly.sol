pragma solidity ^0.8.0;

contract coinlandly {

   uint public time;
   uint public total;
   uint public price;
   address public owner;

   function wash() public {
      time = block.timestamp + 1 days;
      emit Wash(msg.sender, total);
   }

   function dry() public {
      require(block.timestamp > time);
      price = total / 100;
      emit Dry(msg.sender, price);
   }

   function 
   
}