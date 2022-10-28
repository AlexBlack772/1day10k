pragma solidity ^0.8.13;

//Proxyとは、Etherを送信するコントラクトです。
contract Proxy {
   //Deploy
   event Deploy(address);
   //receiveとは、Etherを受け取る関数です。
   receive() external payable {
       emit Deploy(msg.sender);
   }
   //deployとは、Etherを送信してコントラクトをデプロイする関数です。
   function deploy(bytes memory _code) public payable returns (address) {
       address addr;
       assembly {
           addr := create(0, add(_code, 0x20), mload(_code))
           if iszero(extcodesize(addr)) {
               revert(0, 0)
           }
       }
       emit Deploy(addr);
       return addr;
   }

   //executeとは、コントラクトを実行する関数です。
   function execute(address _addr, bytes memory _data) public payable returns (bytes memory) {
       (bool success, bytes memory result) = _addr.call{value: msg.value}(_data);
       require(success, "Failed to execute");
       return result;
   }
}

//TestContract