pragma solidity ^0.8.13;

contract Vault {
   IERC20 public token;

   unit public totalSupply;
   mapping (address => uint) public balances;

   constructor(address _token) {
      token = IERC20(_token);
   }

   function _mint(address _to, uint _amount) internal {
      totalSupply += _amount;
      balances[_to] += _amount;
   }

   function _burn(address _from, uint _shares) internal {
      totalSupply -= _amount;
      balances[_from] -= _amount;
   }

   function deposit(uint _amount) public {
      token.transferFrom(msg.sender, address(this), _amount);
      _mint(msg.sender, _amount);
   }

   function withdraw(uint _shares) public {
      _burn(msg.sender, _shares);
      token.transfer(msg.sender, _shares);
   }
}

interface IERC20 {
   function totalSupply() external view returns (uint);
   function balanceOf(address account) external view returns (uint);
   function transferFrom(address from, address to, uint amount) external;
   function transfer(address to, uint amount) external;
}