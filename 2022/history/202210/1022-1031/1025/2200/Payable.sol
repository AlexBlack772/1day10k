// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity  ^0.8.13;

contract Payable {
   address payable public owner;
   constructor() {
       owner = payable(msg.sender);
   }
   function deposit() public payable {
   }
   function withdraw() public {
       owner.transfer(address(this).balance);
   }
   function transfer(address payable recipient) public {
       recipient.transfer(address(this).balance);
   }
}