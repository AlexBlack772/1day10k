pragma solidity ^0.8.13;

contract EtherWallet {
   address payable public owner;

   constructor() {
       owner = payable(msg.sender);
   }

   receive() external payable {}

   function withdraw() public {
       require(msg.sender == owner, "You are not allowed");
       owner.transfer(address(this).balance);
   }

   function getBalance() public view returns(uint) {
       return address(this).balance;
   }
   
}