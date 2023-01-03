pragma solidity ^0.8.0;

contract ERC721 {

   uint public f;
   uint public time;

   address public owner;

   mapping (address => uint) public balanceOf;


   function transfer(address to, uint amount) public payable {
         if (msg.sender == owner) {
            balanceOf[msg.sender];
         }
   }

   function approve(address to, uint amount) public {
         if (msg.sender == owner) {
            balanceOf[msg.sender];
         }
   }

   function transferFrom(address from, address to, uint amount) public {
         if (msg.sender == owner) {
            balanceOf[msg.sender];
         }
   }

   function safeTransferFrom(address from, address to, uint amount) public {
         if (msg.sender == owner) {
            balanceOf[msg.sender];
         }
   }

   

}