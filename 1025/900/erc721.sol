pragma solidity ^0.7.24;

contract ERC721 {
      string public name;
      string public symbol;
      uint8 public decimals;
      uint256 public totalSupply;
   
      mapping (address => uint256) public balanceOf;
      mapping (address => mapping (address => uint256)) public allowance;
   
      event Transfer(address indexed from, address indexed to, uint256 value);
      event Approval(address indexed owner, address indexed spender, uint256 value);
   
      
}