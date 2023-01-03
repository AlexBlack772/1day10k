pragma solidity ^0.8.0;


contract EERC20 {

   uint public totalSupply;
   uint public decimals;
   string public name;
   string public symbol;
   mapping(address => uint) public balanceOf;

   constructor(uint _totalSupply, uint _decimals, string memory _name, string memory _symbol) {
       totalSupply = _totalSupply;
       decimals = _decimals;
       name = _name;
       symbol = _symbol;
       balanceOf[msg.sender] = totalSupply;
   }

   function transfer(address _to, uint _value) public returns (bool success) {
       require(balanceOf[msg.sender] >= _value);
       balanceOf[msg.sender] -= _value;
       balanceOf[_to] += _value;
       return true;
   }
   
   function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
       require(balanceOf[_from] >= _value);
       balanceOf[_from] -= _value;
       balanceOf[_to] += _value;
       return true;
   }

   function approve(address _spender, uint _value) public returns (bool success) {
       return true;
   }

   function allowance(address _owner, address _spender) public view returns (uint remaining) {
       return 0;
   }
   
}