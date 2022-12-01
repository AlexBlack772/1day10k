pragma solidity ^0.8.13;

//BytesLibとは、bytes型のデータを操作するためのライブラリです。
library BytesLib{
   //concatとは、bytes型のデータを連結する関数です。
   function concat(bytes memory self, bytes memory other) internal pure returns (bytes memory) {
      bytes memory result = new bytes(self.length + other.length);
      uint k = 0;
      for (uint i = 0; i < self.length; i++) result[k++] = self[i];
      for (uint i = 0; i < other.length; i++) result[k++] = other[i];
      return result;
   }

   //concatStorageとは、bytes型のデータを連結する関数です。
   function concatStorage(bytes storage self, bytes memory other) internal {
      bytes memory result = new bytes(self.length + other.length);
      uint k = 0;
      for (uint i = 0; i < self.length; i++) result[k++] = self[i];
      for (uint i = 0; i < other.length; i++) result[k++] = other[i];
      self = result;
   }

   //sliceとは、bytes型のデータを切り取る関数です。
   function slice(bytes memory self, uint start, uint end) internal pure returns (bytes memory) {
      require(end >= start, "end must be greater than or equal to start");
      require(end <= self.length, "end must be less than or equal to self.length");

      bytes memory result = new bytes(end - start);
      for (uint i = start; i < end; i++) {
         result[i - start] = self[i];
      }
      return result;
   }

   //toAddressとは、bytes型のデータをaddress型に変換する関数です。
   function toAddress(bytes memory self) internal pure returns (address) {
      require(self.length == 20, "bytes length must be 20");
      address result;
      assembly {
         result := mload(add(self, 0x20))
      }
      return result;
   }

   //toUintとは、bytes型のデータをuint型に変換する関数です。
   function toUint(bytes memory self) internal pure returns (uint) {
      require(self.length == 32, "bytes length must be 32");
      uint result;
      assembly {
         result := mload(add(self, 0x20))
      }
      return result;
   }

   //equalとは、bytes型のデータが等しいかどうかを判定する関数です。
   function equal(bytes memory self, bytes memory other) internal pure returns (bool) {
      if (self.length != other.length) {
         return false;
      }
      for (uint i = 0; i < self.length; i++) {
         if (self[i] != other[i]) {
            return false;
         }
      }
      return true;
   }
   

}