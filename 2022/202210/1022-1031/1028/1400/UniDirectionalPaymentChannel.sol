pragma solidity ^0.8.13;

//UniDirectionalPaymentChannelとは、送金者と受信者の間で、送金者が送金すると、受信者が受信するという単方向のチャネルです。
contract UniDirectionalPaymentChannel is ReentrancyGuard {
   //ecdsaとは、標準的な検証アルゴリズムの一つで、公開鍵暗号の一種です。
   using ECDSA for bytes32;

   address payable public sender;
    address payable public receiver;

    uint private constant DURATION = 7 * 24 * 60 * 60;
    uint public expiresAt;

    //constructorとは、コントラクトがデプロイされたときに実行される関数です。
      constructor(address payable _receiver) payable {
         sender = payable(msg.sender);
         receiver = _receiver;
         expiresAt = block.timestamp + DURATION;
      }

      //_getHashとは、ハッシュを取得する関数です。
      function _getHash(uint _amount) internal view returns (bytes32) {
         return keccak256(abi.encodePacked(address(this), _amount));
      }

      //getHashとは、ハッシュを取得する関数です。
      function getHash(uint _amount) external view returns (bytes32) {
         return _getHash(_amount);
      }

      //_getEthSignedHashとは、ハッシュを取得する関数です。
      function _getEthSignedHash(uint _amount) internal view returns (bytes32) {
         return _getHash(_amount).toEthSignedMessageHash();
      }

      //getEthSignedHashとは、ハッシュを取得する関数です。
      function getEthSignedHash(uint _amount) external view returns (bytes32) {
         return _getEthSignedHash(_amount);
      }

      //_verifyとは、検証する関数です。
      function _verify(uint _amount, bytes memory _signature) internal view returns (bool) {
         return _getEthSignedHash(_amount).recover(_signature) == sender;
      }
      //verifyとは、検証する関数です。
      function verify(uint _amount, bytes memory _signature) external view returns (bool) {
         return _verify(_amount, _signature);
      }

      //closeとは、チャネルを閉じる関数です。
      function close(uint _amount, bytes memory _signature) external nonReentrant {
         require(_verify(_amount, _signature), "Invalid signature");
         require(block.timestamp <= expiresAt, "Channel expired");
         require(address(this).balance >= _amount, "Insufficient funds");

         receiver.transfer(_amount);
         selfdestruct(sender);
      }

      //cancelとは、チャネルをキャンセルする関数です。
      function cancel() external nonReentrant {
         require(block.timestamp > expiresAt, "Channel not expired");
         selfdestruct(sender);
      }
      


}