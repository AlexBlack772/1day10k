pragma solidity ^0.8.13;

library Bits {
   uint constant internal ONE = uint(1);
    uint constant internal ONES = uint(~0);

    //setBitsとは、ビットをセットする
      function setBits(uint self, uint mask) internal pure returns (uint) {
         return self | mask;
      }
      //clearBitsとは、ビットをクリアする
      function clearBits(uint self, uint mask) internal pure returns (uint) {
         return self & ~mask;
      }
      //toggleBitsとは、ビットをトグルする
      function toggleBits(uint self, uint mask) internal pure returns (uint) {
         return self ^ mask;
      }
      //bitとは、ビットを表す
      function bit(uint self, uint index) internal pure returns (uint) {
         return ONE << index;
      }
      //bitsSetとは、ビットがセットされているかどうかを表す
      function bitsSet(uint self, uint mask) internal pure returns (bool) {
         return (self & mask) == mask;
      }
      

}