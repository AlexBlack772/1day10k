pragma solidity ^0.8.13;

contract Roulette {
   uint public postBlockTime;

   constructor() {
      postBlockTime = block.timestamp;
   }

   function spin() external payable {
      require(msg.value >= 1 ether, "Not enough ether");
      uint random = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender))) % 100;
      if (random < 50) {
         payable(msg.sender).transfer(msg.value * 2);
      }

   }

   
}