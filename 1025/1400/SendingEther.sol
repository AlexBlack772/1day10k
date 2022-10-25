pragma solidity ^0.8.13;

contract ReceiveEther {
   receive() external payable {
   }

   fallback() external payable {
   }

   function getBalance() public view returns (uint) {
      return address(this).balance;
   }
}

contract SendEther {
   function sendViaTransfer(address payable _to) public payable {
      _to.transfer(msg.value);
   }

   function sendViaCall(address payable _to) public payable {
      bool sent = _to.send(msg.value);
      require(sent, "Failed to send Ether");
   }
}