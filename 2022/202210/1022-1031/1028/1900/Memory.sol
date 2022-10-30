pragma solidity ^0.4.16;
pragma experimental "v0.5.0";
pragma experimental "ABIEncoderV2";

//Memoryとは、メモリを管理するコントラクトです。
library Memory {
   uint internal constant WORD_SIZE = 32;
    
    uint internal constant BYTES_HEADER_SIZE = 32;
   
    uint internal constant FREE_MEM_PTR = 0x40;

    //equalsとは、aとbが等しいかどうかを判定する関数です。
      function equals(bytes memory a, bytes memory b) internal pure returns (bool) {
         if (a.length != b.length) {
               return false;
         }
   
         uint length = a.length;
         for (uint i = 0; i < length; i++) {
               if (a[i] != b[i]) {
                  return false;
               }
         }
   
         return true;
      }

      //allocateとは、メモリを確保する関数です。
      function allocate(uint size) internal pure returns (bytes memory) {
         uint dataPtr;
         assembly {
            dataPtr := mload(FREE_MEM_PTR)
            mstore(FREE_MEM_PTR, add(dataPtr, and(add(add(size, 0x20), 0x1f), not(0x1f))))
         }
         return toBytes(dataPtr, size);
      }

      //copyとは、メモリをコピーする関数です。
      function copy(bytes memory a, uint aOffset, bytes memory b, uint bOffset, uint length) internal pure {
         uint aPtr;
         uint bPtr;
         assembly {
            aPtr := add(a, add(0x20, aOffset))
            bPtr := add(b, add(0x20, bOffset))
         }
         copy(aPtr, bPtr, length);
      }

      //ptrとは、メモリのポインタを取得する関数です。
      function ptr(bytes memory a) internal pure returns (uint) {
         return ptr(a, 0);
      }

      //dataPtrとは、メモリのデータポインタを取得する関数です。
      function dataPtr(bytes memory a) internal pure returns (uint) {
         return dataPtr(a, 0);
      }
      //fromBytesとは、bytesを取得する関数です。
      function fromBytes(bytes a) internal pure returns (bytes memory) {
         return a;
      }
      //toBytesとは、bytesを取得する関数です。
      function toBytes(uint a, uint length) internal pure returns (bytes memory) {
         bytes memory b;
         assembly {
            b := a
            mstore(b, length)
         }
         return b;
      }
      //toUnit256とは、uint256を取得する関数です。
      function toUint256(bytes memory a) internal pure returns (uint256) {
         return toUint256(a, 0);
      }
      




}