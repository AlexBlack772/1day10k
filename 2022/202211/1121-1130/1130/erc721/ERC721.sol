pragma solidity ^0.8.13;

contract ERC721 {
      uint public totalSupply;
      address public owner;
      mapping(address => uint) public balances;
      uint public decimals;
      string public name;
      string public symbol;

      event Transfer(address indexed from, address indexed to, uint value);
      event Approval(address indexed owner, address indexed spender, uint value);
    

      function transfer(address to, uint amount) public returns (bool) {
            require(balances[msg.sender] >= amount, "Insufficient balance");
            balances[msg.sender] -= amount;
            balances[to] += amount;
            emit Transfer(msg.sender, to, amount);
            return true;
      }

      function transferFrom(address from, address to, uint amount) public returns (bool) {
            require(balances[from] >= amount, "Insufficient balance");
            require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
            balances[from] -= amount;
            balances[to] += amount;
            emit Transfer(from, to, amount);
            return true;
      }

      function approve(address spender, uint amount) public returns (bool) {
            allowance[msg.sender][spender] = amount;
            emit Approval(msg.sender, spender, amount);
            return true;
      }

      function balanceOf(address account) public view returns (uint) {
            return balances[account];
      }

      function allowance(address owner, address spender) public view returns (uint) {
            return allowance[owner][spender];
      }
      
}