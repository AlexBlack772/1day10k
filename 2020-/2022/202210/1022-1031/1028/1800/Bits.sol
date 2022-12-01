pragma solidity ^0.4.16;
pragma experimental "v0.5.0";
pragma experimental "ABIEncoderV2";

//Bitsとは、ビット演算を行うコントラクトです。
library Bits {
   uint constant internal ONE = uint(1);
    uint constant internal ONES = uint(~0);

    //setBitとは、ビットをセットする関数です。
      function setBit(uint _self, uint _index, bool _value) internal pure returns (uint) {
         if (_value) {
               return _self | (ONE << _index);
         } else {
               return _self & ~(ONE << _index);
         }
      }
      //clearBitとは、ビットをクリアする関数です。
      function clearBit(uint _self, uint _index) internal pure returns (uint) {
         return _self & ~(ONE << _index);
      }
      //toggleBitとは、ビットをトグルする関数です。
      function toggleBit(uint _self, uint _index) internal pure returns (uint) {
         return _self ^ (ONE << _index);
      }
      //bitとは、ビットを取得する関数です。
      function bit(uint _self, uint _index) internal pure returns (bool) {
         return _self & (ONE << _index) != 0;
      }
      //bitSetとは、ビットがセットされているかどうかを取得する関数です。
      function bitSet(uint _self, uint _index) internal pure returns (bool) {
         return bit(_self, _index);
      }
      //bitEqualとは、ビットが等しいかどうかを取得する関数です。
      function bitEqual(uint _self, uint _index, bool _value) internal pure returns (bool) {
         return bit(_self, _index) == _value;
      }
      //bitNotとは、ビットを反転する関数です。
      function bitNot(uint _self, uint _index) internal pure returns (uint) {
         return toggleBit(_self, _index);
      }
      //bitAndとは、ビットを論理積する関数です。
      function bitAnd(uint _self, uint _index, bool _value) internal pure returns (uint) {
         return bitEqual(_self, _index, _value) ? _self : clearBit(_self, _index);
      }
      //bitOrとは、ビットを論理和する関数です。
      function bitOr(uint _self, uint _index, bool _value) internal pure returns (uint) {
         return bitEqual(_self, _index, _value) ? setBit(_self, _index, _value) : _self;
      }
      //bitXorとは、ビットを排他的論理和する関数です。
      function bitXor(uint _self, uint _index, bool _value) internal pure returns (uint) {
         return bitEqual(_self, _index, _value) ? clearBit(_self, _index) : setBit(_self, _index, _value);
      }
      //highestBitSetとは、最上位ビットを取得する関数です。
      function highestBitSet(uint _self) internal pure returns (uint) {
         if (_self == 0) {
               return 0;
         } else {
               uint _bit = 0;
               if (_self >= 0x100000000000000000000000000000000) {
                     _self >>= 128;
                     _bit += 128;
               }
               if (_self >= 0x10000000000000000) {
                     _self >>= 64;
                     _bit += 64;
               }
               if (_self >= 0x100000000) {
                     _self >>= 32;
                     _bit += 32;
               }
               if (_self >= 0x10000) {
                     _self >>= 16;
                     _bit += 16;
               }
               if (_self >= 0x100) {
                     _self >>= 8;
                     _bit += 8;
               }
               if (_self >= 0x10) {
                     _self >>= 4;
                     _bit += 4;
               }
               if (_self >= 0x4) {
                     _self >>= 2;
                     _bit += 2;
               }
               if (_self >= 0x2) {
                     _self >>= 1;
                     _bit += 1;
               }
               return _bit;
         }
      }
      //lowestBitSetとは、最下位ビットを取得する関数です。
      function lowestBitSet(uint _self) internal pure returns (uint) {
         if (_self == 0) {
               return 0;
         } else {
               uint _bit = 1;
               if ((_self & 0xffffffffffffffffffffffffffffffff) == 0) {
                     _self >>= 128;
                     _bit += 128;
               }
               if ((_self & 0xffffffffffffffff) == 0) {
                     _self >>= 64;
                     _bit += 64;
               }
               if ((_self & 0xffffffff) == 0) {
                     _self >>= 32;
                     _bit += 32;
               }
               if ((_self & 0xffff) == 0) {
                     _self >>= 16;
                     _bit += 16;
               }
               if ((_self & 0xff) == 0) {
                     _self >>= 8;
                     _bit += 8;
               }
               if ((_self & 0xf) == 0) {
                     _self >>= 4;
                     _bit += 4;
               }
               if ((_self & 0x3) == 0) {
                     _self >>= 2;
                     _bit += 2;
               }
               if ((_self & 0x1) == 0) {
                     _self >>= 1;
                     _bit += 1;
               }
               return _bit;
         }
      }
      


}