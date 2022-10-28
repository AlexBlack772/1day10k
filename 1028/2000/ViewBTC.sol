pragma solidity ^0.8.13;

//ViewBTCとは、BTCを表示するコントラクトです。
library ViewBTC {
   using TypedMemView for bytes29;
    using SafeMath for uint256;

    uint256 public constant DIFF1_TARGET =
        0xffff0000000000000000000000000000000000000000000000000000;

    uint256 public constant RETARGET_PERIOD = 2 * 7 * 24 * 60 * 60; 
    uint256 public constant RETARGET_PERIOD_BLOCKS = 2016;

    //BTCTypesとは、BTCの型を定義するライブラリです。
      struct BTCTypes {
         bytes29 txView;
         bytes29 txInView;
         bytes29 txOutView;
         bytes29 scriptSigView;
         bytes29 scriptPubKeyView;
         bytes29 witnessView;
      }
      //revertNonMinimalとは、最小限の値でない場合に、エラーを返す関数です。
      function revertNonMinimal(bytes29 _view) internal pure {
         if (_view.len() == 0) {
            revert("non-minimal 0");
         }
         if (_view.len() > 1 && _view.byteAt(0) == 0x00) {
            revert("non-minimal 1");
         }
         if (_view.byteAt(0) & 0x80 != 0) {
            revert("non-minimal 2");
         }
      }
      //indexCompactIntとは、コンパクト整数のインデックスを取得する関数です。
      function indexCompactInt(bytes29 _view) internal pure returns (uint256) {
         if (_view.byteAt(0) < 0xfd) {
            return 1;
         }
         if (_view.byteAt(0) == 0xfd) {
            return 3;
         }
         if (_view.byteAt(0) == 0xfe) {
            return 5;
         }
         if (_view.byteAt(0) == 0xff) {
            return 9;
         }
         revert("invalid compact int");
      }
      //compactIntとは、コンパクト整数を取得する関数です。
      function compactInt(bytes29 _view) internal pure returns (uint256) {
         if (_view.byteAt(0) < 0xfd) {
            return _view.byteAt(0);
         }
         if (_view.byteAt(0) == 0xfd) {
            return _view.u16At(1);
         }
         if (_view.byteAt(0) == 0xfe) {
            return _view.u32At(1);
         }
         if (_view.byteAt(0) == 0xff) {
            return _view.u64At(1);
         }
         revert("invalid compact int");
      }
      //txidLeとは、トランザクションIDを取得する関数です。
      function txidLe(bytes29 _view) internal pure returns (bytes32) {
         return _view.hash256(0, _view.len());
      }
      //outpointIdxとは、アウトポイントのインデックスを取得する関数です。
      function outpointIdx(bytes29 _view) internal pure returns (uint256) {
         return _view.u32At(36);
      }
      //outpointとは、アウトポイントを取得する関数です。
      function outpoint(bytes29 _view) internal pure returns (bytes32) {
         return _view.hash256(0, 36);
      }
      //scriptSigとは、スクリプトシグを取得する関数です。
      function scriptSig(bytes29 _view) internal pure returns (bytes29) {
         return _view.bytesAt(36);
      }
      //sequenceとは、シーケンスを取得する関数です。
      function sequence(bytes29 _view) internal pure returns (uint256) {
         return _view.u32At(36 + _view.bytesAt(36).len());
      }
      //inputLengthとは、入力の長さを取得する関数です。
      function inputLength(bytes29 _view) internal pure returns (uint256) {
         return 36 + _view.bytesAt(36).len() + 4;
      }
      //indexVinとは、Vinのインデックスを取得する関数です。
      function indexVin(bytes29 _view) internal pure returns (uint256) {
         return 4 + indexCompactInt(_view.bytesAt(4));
      }
      

}