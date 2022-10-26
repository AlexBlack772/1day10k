// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

contract Storage {

   struct MyStruct {
       uint256 a;
       uint256 b;
   }

   MyStruct public myStruct = MyStruct(0, 0);

   function _get() internal view returns (uint256, uint256) {
       return (myStruct.a, myStruct.b);
   }

   function get() public view returns (uint256, uint256) {
       return _get();
   }

   function set(uint256 a, uint256 b) public {
       myStruct.a = a;
       myStruct.b = b;
   }
   
}