pragma solidity ^0.8.13;


contract Wallet {
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    function transfer(address payable to, uint amount) public {
        require(msg.sender == owner, "You are not the owner");
        to.transfer(amount);
    }
}

contract Attack {
      address payable wallet;
   
      constructor(address payable _wallet) {
         wallet = _wallet;
      }
   
      fallback() external payable {
         if (address(wallet).balance >= 1 ether) {
               wallet.transfer(1 ether);
         }
      }
   
      function attack() public payable {
         require(msg.value >= 1 ether);
         wallet.transfer(1 ether);
      }
}