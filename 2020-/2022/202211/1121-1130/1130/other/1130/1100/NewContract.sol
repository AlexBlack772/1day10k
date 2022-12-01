pragma solidity ^0.8.13;

contract Car{
      string public brand;
      string public model;
      uint public year;
      uint public price;
      address public owner;
      
      constructor(string memory _brand, string memory _model, uint _year, uint _price){
         brand = _brand;
         model = _model;
         year = _year;
         price = _price;
         owner = msg.sender;
      }
      
      function transfer(address newOwner) public {
         require(msg.sender == owner, "You are not the owner");
         owner = newOwner;
      } 
}; 