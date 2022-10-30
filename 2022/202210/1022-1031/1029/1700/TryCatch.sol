pragma solidity ^0.8.13;

contract Foo {
    address public owner;

    //constructorとは、コンストラクタ
      constructor() {
         owner = msg.sender;
      }
      
}