pragma solidity ^0.8.13;

contract Error {

   function testRequire() public {
       require(false, "Error message");
   }

   function testRevert() public {
       revert("Error message");
   }

   function testAssert() public {
       assert(false);
   }

   
}