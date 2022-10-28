pragma solidity ^0.8.13;

//ViewSpvとは、SPVを表示するコントラクトです。
library ViewSPV {
   //getErrBadLengthとは、長さが不正な場合のエラーを取得する関数です。
   function getErrBadLength() internal pure returns (string) {
      return "bad length";
   }

   //getErrInvalidChainとは、チェーンが不正な場合のエラーを取得する関数です。
   function getErrInvalidChain() internal pure returns (string) {
      return "invalid chain";
   }

   //getErrLowWorkとは、ワークが低い場合のエラーを取得する関数です。
   function getErrLowWork() internal pure returns (string) {
      return "low work";
   }

   //typeAssertとは、型をアサートする関数です。
   modifier typeAssert(bytes memory _data, uint _offset, uint _len, uint _type) {
      require(_data.length >= _offset + _len, getErrBadLength());
      require(_type == uint8(_data[_offset]), getErrInvalidChain());
      _;
   }

   //proveとは、SPVを検証する関数です。
   function prove(
      bytes memory _data,
      uint _offset,
      bytes32 _txid,
      bytes32 _root,
      uint _height,
      uint _work
   ) internal pure typeAssert(_data, _offset, 1, 0) returns (uint) {
      uint len = _data.length;
      uint offset = _offset + 1;
      uint i = 0;
   }

   //calculateTxIdとは、トランザクションIDを計算する関数です。
   function calculateTxId(bytes memory _data, uint _offset, uint _len) internal pure returns (bytes32) {
      bytes32 txid = 0;
      uint i = 0;
      while (i < _len) {
         txid = sha256(abi.encodePacked(txid, _data[_offset + i]));
         i += 1;
      }
      return txid;
   }
   //checkWorkとは、ワークをチェックする関数です。
   function checkWork(bytes32 _hash, uint _work) internal pure returns (bool) {
      uint i = 0;
      while (i < _work) {
         if (_hash[i / 8] & (1 << (i % 8)) != 0) {
            return false;
         }
         i += 1;
      }
      return true;
   }

   //checkParentとは、親をチェックする関数です。
   function checkParent(bytes32 _hash, bytes32 _parent) internal pure returns (bool) {
      return sha256(abi.encodePacked(_hash, _parent)) == 0;
   }

   //checkChainとは、チェーンをチェックする関数です。
   function checkChain(bytes memory _data, uint _offset, uint _len, bytes32 _root) internal pure returns (bool) {
      bytes32 hash = calculateTxId(_data, _offset, _len);
      uint i = _offset + _len;
      while (i < _data.length) {
         hash = sha256(abi.encodePacked(hash, calculateTxId(_data, i, 80)));
         i += 80;
      }
      return hash == _root;
   }
   
}