pragma solidity ^0.8.13;

//ReceiveEther 
contract ReceiveEther {
   //receiveとは、Etherを受け取る関数
   receive() external payable {}
   //fallbackとは、Etherを受け取る関数
   fallback() external payable {}
   //getBalanceとは、残高を取得する関数
   function getBalance() public view returns (uint) {
      return address(this).balance;
   }

}

//SendingEtherとは、Etherを送信するコントラクト
contract SendingEther {
   //sendEtherとは、Etherを送信する関数
   function sendEther(address payable _to) public payable {
      _to.transfer(msg.value);
   }
   //sendViaTransferとは、Etherを送信する関数
   function sendViaTransfer(address payable _to) public payable {
      _to.transfer(msg.value);
   }
   //sendViaSendとは、Etherを送信する関数
   function sendViaSend(address payable _to) public payable {
      bool sent = _to.send(msg.value);
      require(sent, "Failed to send Ether");
   }  
   //sendViaCallとは、Etherを送信する関数
   function sendViaCall(address payable _to) public payable {
      (bool sent, bytes memory data) = _to.call{value: msg.value}("");
      require(sent, "Failed to send Ether");
   }

   
}