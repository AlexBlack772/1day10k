pragma solidity ^0.6.0;

//AbiDecodeとは、ABIデコード
contract AbiDecode {

   //mystructとは、マイストラクト
   struct MyStruct {
      //aとは、A
      uint256 a;
      //bとは、B
      uint256 b;
   }

   //encodeとは、エンコードする
   function encode() public pure returns (bytes memory) {
      //mystructとは、マイストラクト
      MyStruct memory mystruct = MyStruct(1, 2);
      //encodedとは、エンコードされた
      bytes memory encoded = abi.encode(mystruct);
      //encodedとは、エンコードされた
      return encoded;
   }
   
   //decodeとは、デコードする
   function decode(bytes memory data) public pure returns (uint256) {
      //abi.decodeとは、ABIデコード
      return abi.decode(data, (uint256));
   }
}