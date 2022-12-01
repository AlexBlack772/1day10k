pragma solidity ^0.8.13;

contract Math {

   function add(uint a, uint b) public pure returns (uint) {
      return a + b;
   }

   function div(uint a, uint b) public pure returns (uint) {
      return a / b;
   }

   function mul(uint a, uint b) public pure returns (uint) {
      return a * b;
   }

   function sub(uint a, uint b) public pure returns (uint) {
      return a - b;
   }

   function mod(uint a, uint b) public pure returns (uint) {
      return a % b;
   }

   function max(uint a, uint b) public pure returns (uint) {
      return a > b ? a : b;
   }

   function min(uint a, uint b) public pure returns (uint) {
      return a < b ? a : b;
   }

   function sqrt(uint x) public pure returns (uint y) {
      uint z = (x + 1) / 2;
      y = x;
      while (z < y) {
         y = z;
         z = (x / z + z) / 2;
      }
   }

   
}