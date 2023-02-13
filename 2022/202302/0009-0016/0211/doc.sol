// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.0;

contract Test {
    function test() public pure returns (uint256) {
        return 1;
    }

   function test2() public pure returns (uint256) {
         return 2;
   }
}

contract Test2 {
    function test() public pure returns (uint256) {
        return 3;
    }

   function test2() public pure returns (uint256) {
         return 4;
   }

   address public owner;
   uint public x;
   bytes32 public y;
   bytes public z;
   string public w;

   constructor() {
       owner = msg.sender;
   }

   function setX(uint _x) public {
       require(msg.sender == owner);
       x = _x;
   }

   
}
