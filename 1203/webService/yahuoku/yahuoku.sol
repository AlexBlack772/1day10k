pragma solidity ^0.8.13;

contract yahuoku {

   uint public startAt;
   uint public endAt;
   uint public nowPrice;

   event Bid(address indexed _from, uint _value);
   event Finish(address _winner, uint _price);

    constructor() {
         startAt = block.timestamp;
         endAt = startAt + 1 days;
         nowPrice = 1 ether;
    }

    function bid(uint bidprice) public payable  returns (uint) {
      require(msg.value == nowPrice, "invalid price");
      nowPrice = bidprice;
      emit Bid(msg.sender, msg.value);
    }

    function cancell() public {
       require(block.timestamp < endAt, "too late");
       selfdestruct(payable(msg.sender));
    }

    function finish() public {
       require(block.timestamp > endAt, "too early");
       selfdestruct(payable(msg.sender));
       balanceOf[] = address(this).balance;
       emit Finish(highestbidder, price);
    }
    
}