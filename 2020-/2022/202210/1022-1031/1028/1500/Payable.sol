pragma solidity ^0.8.13;

//Payableとは、Etherを受け取ることができるコントラクトです。

contract Payable {
    //fallbackとは、Etherを受け取る関数です。
    fallback() external payable {}
    //receiveとは、Etherを受け取る関数です。
    receive() external payable {}

    //constructorとは、コントラクトがデプロイされたときに実行される関数です。
      constructor() payable {}

      //depositとは、Etherを受け取る関数です。
      function deposit() public payable {}

      //notPayableとは、Etherを受け取ることができない関数です。
      function notPayable() public {}
      //withdrawとは、Etherを送信する関数です。
      function withdraw() public {
          payable(msg.sender).transfer(address(this).balance);
      }
      //transferとは、Etherを送信する関数です。
      function transfer(address payable _to) public {
          _to.transfer(address(this).balance);
      }
      
}