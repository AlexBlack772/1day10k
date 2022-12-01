pragma solidity ^0.8.13;

contract Base {
   //privateFunc()とは、privateな関数
   function privateFunc() private pure returns (string memory) {
      return "private";
   }
   //testPrivateFunc()とは、privateな関数をテストする関数
   function testPrivateFunc() public pure returns (string memory) {
      return privateFunc();
   }
   //internalFunc()とは、internalな関数
   function internalFunc() internal pure returns (string memory) {
      return "internal";
   }
   //testInternalFunc()とは、internalな関数をテストする関数
   function testInternalFunc() public pure returns (string memory) {
      return internalFunc();
   }
   //publicFunc()とは、publicな関数
   function publicFunc() public pure returns (string memory) {
      return "public";
   }
   //externalFunc()とは、externalな関数
   function externalFunc() external pure returns (string memory) {
      return "external";
   }
   string private privateVar = "my private variable";
    string internal internalVar = "my internal variable";
    string public publicVar = "my public variable";

}

