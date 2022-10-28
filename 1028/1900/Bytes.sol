pragma solidity ^0.4.16;
pragma experimental "v0.5.0";
pragma experimental "ABIEncoderV2";

//Bytesとは、バイトを管理するコントラクトです。
library Bytes {
   uint internal constant BYTES_HEADER_SIZE = 32;

   //equalsとは、aとbが等しいかどうかを判定する関数です。
     function equals(bytes a, bytes b) internal pure returns (bool) {
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

     //equalsRefとは、aとbが等しいかどうかを判定する関数です。
       function equalsRef(bytes a, bytes b) internal pure returns (bool) {
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
       //copyとは、メモリをコピーする関数です。
         function copy(bytes a, uint aOffset, bytes b, uint bOffset, uint length) internal pure {
            uint aPtr;
            uint bPtr;
            assembly {
               aPtr := add(a, add(0x20, aOffset))
               bPtr := add(b, add(0x20, bOffset))
            }
            Memory.copy(aPtr, bPtr, length);
         }
         //substrとは、メモリをコピーする関数です。
         function substr(bytes a, uint offset, uint length) internal pure returns (bytes) {
            bytes memory b = new bytes(length);
            copy(a, offset, b, 0, length);
            return b;
         }
         //concatとは、メモリをコピーする関数です。
         function concat(bytes a, bytes b) internal pure returns (bytes) {
            bytes memory c = new bytes(a.length + b.length);
            copy(a, 0, c, 0, a.length);
            copy(b, 0, c, a.length, b.length);
            return c;
         }
         //toBytesとは、メモリをコピーする関数です。
         function toBytes(bytes a) internal pure returns (bytes) {
            return a;
         }
         
}