pragma solidity ^0.8.13;

//ValidateSPVとは、SPVの検証を行うためのコントラクトです。
library ValidateSPV {
   using BTCUtils for bytes;
    using BTCUtils for uint256;
    using BytesLib for bytes;
    using SafeMath for uint256;

    //InputTypesとは、入力の種類を表す列挙型です。
      enum InputTypes { NONE, LEGACY, COMPATIBILITY, WITNESS }

    //OutputTypesとは、出力の種類を表す列挙型です。
      enum OutputTypes { NONE, WPKH, WSH, OP_RETURN, PKH, SH, NONSTANDARD }
      //getErrBadLengthとは、長さが不正な場合のエラーを取得する関数です。
      function getErrBadLength() internal pure returns (bytes memory) {
         return abi.encodeWithSelector(bytes4(keccak256("ErrBadLength()")));
      }
      //getErrInvalidChainとは、チェーンが不正な場合のエラーを取得する関数です。
      function getErrInvalidChain() internal pure returns (bytes memory) {
         return abi.encodeWithSelector(bytes4(keccak256("ErrInvalidChain()")));
      }
      //getErrInvalidVersionとは、バージョンが不正な場合のエラーを取得する関数です。
      function getErrInvalidVersion() internal pure returns (bytes memory) {
         return abi.encodeWithSelector(bytes4(keccak256("ErrInvalidVersion()")));
      }
      //parseIntとは、整数をパースする関数です。
      function parseInt(bytes memory _b, uint256 _start, uint256 _len) internal pure returns (uint256 _parsedInt) {
         bytes memory bres = new bytes(_len);
          uint256 res = 0;
          assembly {
             switch iszero(_len)
             case 0 {
                let mask := exp(0x100, sub(0x20, _len))
                _parsedInt := and(mload(add(add(_b, 0x20), _start)), mask)
             }
          }
          return res;
      }
      //parseOutputとは、出力をパースする関数です。
      function parseOutput(bytes memory _vout) internal pure returns (OutputTypes, bytes memory, uint256) {
         uint256 len = _vout.keccak256Slice(8, 1).toUint8(0);
          if (len < 0xfd) {
              return parseOutputLegacy(_vout);
          } else if (len == 0xfd) {
              return parseOutputWitness(_vout);
          } else {
              return (OutputTypes.NONE, new bytes(0), 0);
          }
      }
      //parseHeaderとは、ヘッダーをパースする関数です。
      function parseHeader(bytes memory _header) internal pure returns (uint256, bytes32, bytes32, bytes32) {
         require(_header.length == 80, "Header must be exactly 80 bytes");
          uint256 _version = _header.keccak256Slice(0, 4).toUint32(0);
          bytes32 _prevHash = _header.keccak256Slice(4, 32);
          bytes32 _merkleRoot = _header.keccak256Slice(36, 32);
          bytes32 _hash = _header.keccak256();
          return (_version, _prevHash, _merkleRoot, _hash);
      }
      //validateHeaderChainとは、ヘッダーのチェーンを検証する関数です。
      function validateHeaderChain(bytes memory _headers, uint256 _start, uint256 _stop, uint256 _max) internal pure returns (uint256) {
         require(_headers.length % 80 == 0, "Header array length must be divisible by 80");
          require(_start < _stop, "Start must be less than stop");
          require(_stop <= _headers.length / 80, "Stop must be less than or equal to the number of headers");
          require(_max >= _stop - _start, "Max must be greater than or equal to stop - start");
          uint256 _index = _start;
          uint256 _height;
          bytes32 _currentHash;
          bytes32 _previousHash;
          (_height, _previousHash, , _currentHash) = parseHeader(_headers.slice(_index * 80, 80));
          _index += 1;
          while (_index < _stop) {
              bytes32 _intermediateHash;
              uint256 _intermediateHeight;
              (_intermediateHeight, , , _intermediateHash) = parseHeader(_headers.slice(_index * 80, 80));
              require(_intermediateHeight == _height + 1, "Headers must be in order");
              require(_intermediateHash == _previousHash, "Headers must be linked");
              _previousHash = _currentHash;
              _currentHash = _intermediateHash;
              _height = _intermediateHeight;
              _index += 1;
          }
          return _height;
      }
      //validateHeaderWorkとは、ヘッダーのワークを検証する関数です。
      function validateHeaderWork(bytes memory _header, bytes memory _parent) internal pure returns (bool) {
         require(_header.length == 80, "Header must be exactly 80 bytes");
          require(_parent.length == 80, "Parent header must be exactly 80 bytes");
          uint256 _target = _header.keccak256Slice(72, 8).toUint64(0);
          uint256 _parentTarget = _parent.keccak256Slice(72, 8).toUint64(0);
          require(_target <= _parentTarget, "Header target must be less than or equal to parent target");
          bytes32 _hash = _header.keccak256();
          uint256 _hashInt = uint256(_hash);
          return _hashInt <= _target;
      }

      function validateHeaderPrevHash(

            bytes memory _header,
            bytes memory _parent
         ) internal pure returns (bool) {
            require(_header.length == 80, "Header must be exactly 80 bytes");
            require(_parent.length == 80, "Parent header must be exactly 80 bytes");
            bytes32 _prevHash = _header.keccak256Slice(4, 32);
            bytes32 _parentHash = _parent.keccak256Slice(4, 32);
            return _prevHash == _parentHash;
         }

      

}