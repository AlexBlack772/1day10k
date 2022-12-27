pragma solidity ^0.8.13;

contract FunctionModifier {
   address public owner;
   uint public x = 10;
   bool public locked;

   constructor() {
      owner = msg.sender;
   }
   
   modifier onlyOwner() {
      require(msg.sender == owner, "You are not the owner");
      _;
   }
   
   modifier validAddress(address _addr) {
      require(_addr != address(0), "Invalid address");
      _;
   }
   
   function changeOwner(address _newOwner) public onlyOwner {
      owner = _newOwner;
   }

   modifier noReentrancy() {
      require(!locked, "Reentrancy is not allowed");
      locked = true;
      _;
      locked = false;
   }
   
   function increment(uint _n) public onlyOwner {
      x += _n;
   }
   
   function decrement(uint _n) public onlyOwner {
      x -= _n;
   }
   
   function getX() public view returns (uint) {
      return x;
   }
   
}