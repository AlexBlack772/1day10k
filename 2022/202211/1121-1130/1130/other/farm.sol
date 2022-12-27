pragma solidity ^0.8.13;

contract farm {
    uint public startAt;
      uint public endAt;
      uint public totalAmount;
   
   modifier onlyOwner() {
      _;
   }
   
   constructor(uint _startAt, uint _endAt, uint _totalAmount) {
      startAt = _startAt;
      endAt = _endAt;
      totalAmount = _totalAmount;
   }

   function deposit() public payable {
      require(block.timestamp >= startAt && block.timestamp <= endAt, "not in the farm period");
      require(msg.value <= totalAmount, "exceed the total amount");
   }
   
}