pragma solidity ^0.8.13;

contract BitwiseOps {
   function and(uint _a, uint _b) public pure returns (uint) {
      return _a & _b;
   }

   function or(uint _a, uint _b) public pure returns (uint) {
      return _a | _b;
   }

   function xor(uint _a, uint _b) public pure returns (uint) {
      return _a ^ _b;
   }

   function not(uint _a) public pure returns (uint) {
      return ~_a;
   }

   function shiftLeft(uint _a, uint _b) public pure returns (uint) {
      return _a << _b;
   }

   function shiftRight(uint _a, uint _b) public pure returns (uint) {
      return _a >> _b;
   }

   function getLastNBits(uint _a, uint _n) public pure returns (uint) {
      return _a & ((1 << _n) - 1);
   }

   function getFirstNBits(uint _a, uint _n) public pure returns (uint) {
      return _a >> (256 - _n);
   }

   

}