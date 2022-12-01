pragma solidity ^0.8.13;

contract BitwiseOps {
   //andとは、ビット演算子のAND
   function and(uint256 a, uint256 b) public pure returns (uint256) {
      return a & b;
   }

   //orとは、ビット演算子のOR
   function or(uint256 a, uint256 b) public pure returns (uint256) {
      return a | b;
   }

   //xorとは、ビット演算子のXOR
   function xor(uint256 a, uint256 b) public pure returns (uint256) {
      return a ^ b;
   }

   //notとは、ビット演算子のNOT
   function not(uint256 a) public pure returns (uint256) {
      return ~a;
   }

   //shiftLeftとは、ビット演算子の左シフト
   function shiftLeft(uint256 a, uint256 b) public pure returns (uint256) {
      return a << b;
   }

   //shiftRightとは、ビット演算子の右シフト
   function shiftRight(uint256 a, uint256 b) public pure returns (uint256) {
      return a >> b;
   }

   //getLastBitとは、最下位ビットを取得する関数
   function getLastBit(uint256 a) public pure returns (uint256) {
      return a & 1;
   }

   //getLastNBitsUsingModとは、最下位Nビットを取得する関数
   function getLastNBitsUsingMod(uint256 a, uint256 n) public pure returns (uint256) {
      return a % (2**n);
   }

   //mostSignificantBitとは、最上位ビットを取得する関数
   function mostSignificantBit(uint256 a) public pure returns (uint256) {
      return a & (2**255);
   }

   //getFirstNBitsとは、最上位Nビットを取得する関数
   function getFirstNBits(uint256 a, uint256 n) public pure returns (uint256) {
      return a & (2**n - 1);
   }

   //mostSignificantBitWithBinarySearchとは、最上位ビットを取得する関数
   function mostSignificantBitWithBinarySearch(uint256 a) public pure returns (uint256) {
      uint256 b = a;
      uint256 r = 0;
      if (b >= 0x100000000000000000000000000000000) {
         b >>= 128;
         r |= 128;
      }
      if (b >= 0x10000000000000000) {
         b >>= 64;
         r |= 64;
      }
      if (b >= 0x100000000) {
         b >>= 32;
         r |= 32;
      }
      if (b >= 0x10000) {
         b >>= 16;
         r |= 16;
      }
      if (b >= 0x100) {
         b >>= 8;
         r |= 8;
      }
      if (b >= 0x10) {
         b >>= 4;
         r |= 4;
      }
      if (b >= 0x4) {
         b >>= 2;
         r |= 2;
      }
      if (b >= 0x2) {
         r |= 1;
      }
      return r;
   }
   

}