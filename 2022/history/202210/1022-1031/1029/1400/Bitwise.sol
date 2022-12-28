pragma solidity ^0.8.13;

//BitwiseOpsとは、ビット演算を行う関数を定義したコントラクト
contract BitwiseOps {
   //andとは、ビット演算のANDを行う関数
    function and(uint256 a, uint256 b) public pure returns (uint256) {
        return a & b;
    }
    //orとは、ビット演算のORを行う関数
    function or(uint256 a, uint256 b) public pure returns (uint256) {
        return a | b;
    }
    //xorとは、ビット演算のXORを行う関数
    function xor(uint256 a, uint256 b) public pure returns (uint256) {
        return a ^ b;
    }
    //notとは、ビット演算のNOTを行う関数
    function not(uint256 a) public pure returns (uint256) {
        return ~a;
    }
   //shiftLeftとは、ビット演算の左シフトを行う関数
    function shiftLeft(uint256 a, uint256 b) public pure returns (uint256) {
        return a << b;
    }
    //shiftRightとは、ビット演算の右シフトを行う関数
      function shiftRight(uint256 a, uint256 b) public pure returns (uint256) {
         return a >> b;
      }
      //getLastBitとは、ビット演算の最下位ビットを取得する関数
      function getLastBit(uint256 a) public pure returns (uint256) {
         return a & 1;
      }
      //getLastNBitsとは、ビット演算の最下位Nビットを取得する関数
      function getLastNBits(uint256 a, uint256 n) public pure returns (uint256) {
         return a & ((1 << n) - 1);
      }
      // getLastNBitsUsingModとは、ビット演算の最下位Nビットを取得する関数
      function getLastNBitsUsingMod(uint256 a, uint256 n) public pure returns (uint256) {
         return a % (1 << n);
      }
}