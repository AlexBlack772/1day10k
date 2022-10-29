pragma solidity ^0.8.13;

library TypedMemView {
   using SafeMath for uint256;

   //nibbleHexとは、nibbleを16進数に変換する関数です。
   //nibbleとは、4ビットの値を表すデータです。
   function nibbleHex(uint8 _nibble) internal pure returns (uint8) {
      if (_nibble > 9) {
         return _nibble + 55;
      } else {
         return _nibble + 48;
      }
   }
   //byteHexとは、バイトを16進数に変換する関数です。
   function byteHex(uint8 _byte) internal pure returns (uint8, uint8) {
      return (nibbleHex(_byte >> 4), nibbleHex(_byte & 0x0f));
   }
   //encodeHexとは、バイト列を16進数に変換する関数です。
   function encodeHex(bytes memory _bytes) internal pure returns (bytes memory) {
      bytes memory hex = new bytes(_bytes.length * 2);
      for (uint256 i = 0; i < _bytes.length; i++) {
         (uint8 hi, uint8 lo) = byteHex(uint8(_bytes[i]));
         hex[i * 2] = bytes1(hi);
         hex[i * 2 + 1] = bytes1(lo);
      }
      return hex;
   }
   //reverseUnit256とは、uint256を逆順にする関数です。
   function reverseUint256(uint256 _value) internal pure returns (uint256) {
      uint256 result = 0;
      for (uint256 i = 0; i < 32; i++) {
         result = result | ((_value & (0xff * (2 ** (8 * i)))) >> (8 * i)) * (2 ** (8 * (31 - i)));
      }
      return result;
   }
   //leftmaskとは、左側のマスクを取得する関数です。
   function leftmask(uint256 _bits) internal pure returns (uint256) {
      return (2 ** _bits) - 1;
   }
   //nullViewとは、nullビューを取得する関数です。
   function nullView() internal pure returns (TypedMemView.MemView memory) {
      return TypedMemView.MemView(0, 0);
   }
   //isNullとは、ビューがnullかどうかを判定する関数です。
   function isNull(TypedMemView.MemView memory _view) internal pure returns (bool) {
      return _view._unsafe_memPtr == 0;
   }
   //notNullとは、ビューがnullでないかどうかを判定する関数です。
   function notNull(TypedMemView.MemView memory _view) internal pure returns (bool) {
      return _view._unsafe_memPtr != 0;
   }
   //isValidとは、ビューが有効かどうかを判定する関数です。
   function isValid(TypedMemView.MemView memory _view) internal pure returns (bool) {
      return _view._unsafe_length != 0;
   }

   //assertValidとは、ビューが有効であることを確認する関数です。
   function assertValid(TypedMemView.MemView memory _view) internal pure {
      require(_view._unsafe_length != 0, "TypedMemView: invalid view");
   }
   //castToとは、ビューを別の型にキャストする関数です。

   function castTo(TypedMemView.MemView memory _view, uint256 _type) internal pure returns (TypedMemView.MemView memory) {
      return TypedMemView.MemView(_view._unsafe_memPtr, _type);
   }
   //buildとは、ビューを構築する関数です。
   function build(TypedMemView.MemView memory _view, uint256 _type) internal pure returns (TypedMemView.MemView memory) {
      return TypedMemView.MemView(_view._unsafe_memPtr, _type);
   }
   //refとは、ビューを参照する関数です。
   function ref(TypedMemView.MemView memory _view, uint256 _offset) internal pure returns (TypedMemView.MemView memory) {
      return TypedMemView.MemView(_view._unsafe_memPtr + _offset, _view._unsafe_length - _offset);
   }
   
   


}