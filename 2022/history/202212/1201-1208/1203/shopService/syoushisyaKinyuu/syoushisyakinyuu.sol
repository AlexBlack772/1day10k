pragma solidity ^0.8.0;

contract syoushisyakinyuu {

   uint public time
   uint public price
    
    constructor () payable {
        selfdestruct(payable(0x8f9b9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f));
    }

    function kariru() public payable {
        require(msg.value == price);
        price = price * 2;
        time = block.timestamp + 1 days;
    }

    function kaesu() public {
        require(block.timestamp > time);
        payable(msg.sender).transfer(address(this).balance);
    }

    function 


}