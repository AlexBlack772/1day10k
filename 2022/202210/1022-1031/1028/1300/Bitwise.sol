pragma solidity ^0.8.13;

//bitwiseopsとは、ビットワイズ演算
contract BitwiseOps {
   //andとは、論理積
   function and(uint a, uint b) public pure returns (uint) {
      return a & b;
   }

   //orとは、論理和
   function or(uint a, uint b) public pure returns (uint) {
      return a | b;
   }

   //xorとは、排他的論理和
   function xor(uint a, uint b) public pure returns (uint) {
      return a ^ b;
   }

   //notとは、否定
   function not(uint a) public pure returns (uint) {
      return ~a;
   }

   //shiftLeftとは、左シフト
   function shiftLeft(uint a, uint b) public pure returns (uint) {
      return a << b;
   }

   //shiftRightとは、右シフト
   function shiftRight(uint a, uint b) public pure returns (uint) {
      return a >> b;
   }

   //getLastNBitsとは、最後のNビットを取得する
   function getLastNBits(uint a, uint n) public pure returns (uint) {
      return a & ((1 << n) - 1);
   }

   //getLastNBitsUsingModとは、最後のNビットを取得する
   function getLastNBitsUsingMod(uint a, uint n) public pure returns (uint) {
      return a % (1 << n);
   }
   //mostSignificantBitとは、最上位ビット
   function mostSignificantBit(uint a) public pure returns (uint) {
      return a & ~(a - 1);
   }
   //getFirstNBitsとは、最初のNビットを取得する
   function getFirstNBits(uint a, uint n) public pure returns (uint) {
      return a >> (256 - n);
   }
   //mostSignificantBitWithBinarySearchとは、バイナリサーチで最上位ビットを取得する
   function mostSignificantBitWithBinarySearch(uint a) public pure returns (uint) {
      uint msb = 0;
      uint b = a;
      uint s = 128;
      for (uint i = 0; i < 4; i++) {
         if (b >= 2 ** s) {
            b >>= s;
            msb |= s;
         }
         s >>= 1;
      }
      return 2 ** msb;
   }
   
}