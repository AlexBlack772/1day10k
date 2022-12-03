pragma solidity ^0.5.0;

import "./ERC20.sol";

contract Stablecoin is ERC20 {
    string public name = "Stablecoin";
    string public symbol = "STB";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 12000;

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

      function mint(address account, uint256 amount) public {
         _mint(account, amount);
      }

      function burn(address account, uint256 amount) public {
         _burn(account, amount);
      }

      

}
