pragma solidity ^0.8.0;

contract ERC21 {
      string public name;
      string public symbol;
      uint public totalSupply;

      mapping(address => uint) public balances;

      event Transfer(address indexed from, address indexed to, uint value);
      event Approval(address indexed owner, address indexed spender, uint value);

      mapping(address => mapping(address => uint)) public allowance;

      function transfer (address to, uint value) public returns (bool) {
            require(balanceOf(msg.sender) >= value, 'balance too low');
            balances[to] += value;
            balances[msg.sender] -= value;
            emit Transfer(msg.sender, to, value);
            return true;
      }

      function balanceOf(address account) public view returns (uint) {
            return balances[account];
      }

      function approve(address spender, uint value) public returns (bool) {
            allowance[msg.sender][spender] = value;
            emit Approval(msg.sender, spender, value);
            return true;
      }

      function transferFrom(address from, address to, uint value) public returns (bool) {
            require(balanceOf(from) >= value, 'balance too low');
            require(allowance[from][msg.sender] >= value, 'allowance too low');
            balances[to] += value;
            balances[from] -= value;
            emit Transfer(from, to, value);
            return true;
      }
      
            
}