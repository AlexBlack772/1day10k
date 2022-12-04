pragma solidity ^0.8.0;

contract senkyo {

   uint public time;
   uint public total;
   uint public waku;
   address public owner;
   uint public winner;

   event Tousen(address indexed from, uint value);

   constructor (){
      
   }

   modifier onlyOwner() {
       require(msg.sender == owner);
       _;
   }

   function vote () public payable {
      require(msg.value == 1 ether);
      total = total + 1;
      time = block.timestamp + 1 days;
   }

   function tousen() public {
      require(block.timestamp > time);


      emit Tousen(msg.sender, total);
   }

}