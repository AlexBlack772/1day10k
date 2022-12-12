pragma solidity ^0.8.0;

contract teikiYokin {

   uint public time;
   uint public riritsu;
   uint public price;
   uint private lockValue;
   uint private rishi;
   uint private startAt;

   address public owner;

   function teikiLock ()  public payable returns (uint) {
       require(msg.value == price);
       startAt = block.timestamp;
       lockValue = msg.value;
   }

   function teikiUnLock () public payable returns(uint){
      require(msg.sender == owner);
      balanceOf[msg.sender] = lockValue;
   }

   function rishiMorau () public payable returns (uint) {
      require(msg.sender == owner);
      rishi = lockValue  * riritsu * (now - startAt);
      balanceOf[msg.sender] = rishi;
   }

}