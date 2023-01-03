pragma solidity ^0.8.0;

contract ERC20 {

   uint public totalSupply;
   uint public decimals;
   string public name;
   string public symbol;

   event Transfer(address indexed _from, address indexed _to, uint _value);
   event Approval(address indexed _owner, address indexed _spender, uint _value);


   function transfer(address _to, uint _value) public returns (bool success){
      if (balances[msg.sender] >= _value && _value > 0) {
         balances[msg.sender] -= _value;
         balances[_to] += _value;
         Transfer(msg.sender, _to, _value);
         return true;
      } else { return false; }
   }

   function balanceOf(address _owner) public constance returns (uint balance) {
      return balances[_owner];
   }

   function taransferFrom(address _from, address _to, uint _value) public returns (bool success) {
      if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
         balances[_to] += _value;
         balances[_from] -= _value;
         allowed[_from][msg.sender] -= _value;
         Transfer(_from, _to, _value);
         return true;
      } else { return false; }
   }

   function approve(address _spender, uint _value) public returns (bool success) {
      allowed[msg.sender][_spender] = _value;
      Approval(msg.sender, _spender, _value);
      return true;
   }

}