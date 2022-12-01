pragma solidity ^0.8.13;

contract payment {

   function transfer(address payable _to, uint _amount) public payable {
      _to.transfer(_amount);
   }

   function transferFrom(address payable _from, address payable _to, uint _amount) public payable {
      _from.transfer(_amount);
      _to.transfer(_amount);
   }

   function approve(address payable _spender, uint _amount) public payable {
      _spender.transfer(_amount);
   }

   function allowance(address payable _owner, address payable _spender) public payable {
      _owner.transfer(_amount);
      _spender.transfer(_amount);
   }

   function balanceOf(address payable _owner) public payable {
      _owner.transfer(_amount);
   }

   
}