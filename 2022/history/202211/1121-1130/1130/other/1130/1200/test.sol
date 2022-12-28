pragma solidity ^0.5.0;

contract Test {
   //from a to b 1000
   address payable public sender;
   address payable public receiver;
   uint public amount;

   constructor(address payable _receiver) public payable {
       sender = msg.sender;
       receiver = _receiver;
       amount = msg.value;
   }

   function getBalance() public view returns (uint) {
       return sender.balance;
   }

   function transfer(address )





}