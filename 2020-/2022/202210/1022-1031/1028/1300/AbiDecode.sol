pragma solidity ^0.8.13;

contract AbiDecode {

   //myStruct
   struct myStruct {
       uint256 a;
       uint256 b;
       uint256 c;
   }
   
   //decodeとは、ABIをデコードすること
    function decode(bytes memory data) public pure returns (uint256) {
        return abi.decode(data, (uint256));
    }

    //encodeとは、ABIをエンコードすること
      function encode(uint256 value) public pure returns (bytes memory) {
         return abi.encode(value);
      }

}