pragma solidity ^0.8.13;

contract FunctionModifier {
   uint public x = 10;
   
   modifier onlyOwner() {
      require(msg.sender == owner, "You are not the owner");
      _;
   }
   
   address public owner;
   
   constructor() {
      owner = msg.sender;
   }
   
   function changeOwner(address _newOwner) public onlyOwner {
      owner = _newOwner;
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