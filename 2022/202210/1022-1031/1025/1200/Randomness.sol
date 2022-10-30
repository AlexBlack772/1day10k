pragma solidity ^0.8.13;

contract GuessTheRandomNumber {
   constructor() payable {
      require(msg.value == 1 ether);
   }

   function guess(uint _guess) public  {
      require(msg.value == 1 ether);
      uint answer = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 10;
      if (_guess == answer) {
         payable(msg.sender).transfer(2 ether);
      }
   }
}

contract Attack {
   receive() external payable {}

   function attack(
      GuessTheRandomNumber guessTheRandomNumber
   ) publi {
      uint answer = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 10;
   }

   function getBalance() public view returns (uint) {
      return address(this).balance;
   }
   
}