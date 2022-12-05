pragma solidity ^0.8.0;

contract kogitteYokin {

   address public owner;
   uint public time;
   uint public balanceOf;
   uint public sikkoubi;
   
   event Tousen(address indexed from, uint value);
   
   function deposit() payable public {
      require(msg.value == 1 ether);
      balanceOf = balanceOf + 1 ether;
      time = block.timestamp + 1 days;
   }

   function withdraw() public onlyOwner {
       require(block.timestamp > sikkoubi);
       payable(msg.sender).transfer(address(this).balance);
   }

   function kiditsusyukkin() public onlyOwner {
       require(block.timestamp > time);
       payable(msg.sender).transfer(address(this).balance);
   }

   function 
       
}
