pragma solidity ^0.8.13;

//ReceiveEtherとは、Etherを受け取るコントラクトです。
contract ReceiveEther {
    //constructorとは、コントラクトがデプロイされたときに実行される関数です。
    constructor() payable {}
    //fallbackとは、Etherを受け取る関数です。
    fallback() external payable {}
    //receiveとは、Etherを受け取る関数です。
    receive() external payable {}
    //getBalanceとは、Etherの残高を取得する関数です。
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

//SendEtherとは、Etherを送信するコントラクトです。
contract SendEther {
    //sendViaTransferとは、Etherを送信する関数です。
      function sendViaTransfer(address payable _to) public payable {
         _to.transfer(msg.value);
      }
      //sendViaSendとは、Etherを送信する関数です。
      function sendViaSend(address payable _to) public payable {
         bool sent = _to.send(msg.value);
         require(sent, "Failed to send Ether");
      }
      //sendViaCallとは、Etherを送信する関数です。
      function sendViaCall(address payable _to) public payable {
         (bool sent, bytes memory data) = _to.call{value: msg.value}("");
         require(sent, "Failed to send Ether");
      }
      
}
