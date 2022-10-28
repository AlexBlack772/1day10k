pragma solidity ^0.8.13;

//VerifySignatureとは、署名を検証する関数です。
contract VerifySignature {
   //getMessageHashとは、メッセージハッシュを取得する関数です。
   function getMessageHash(bytes memory _message) public pure returns (bytes32) {
      return keccak256(_message);
   }
   //getEthSignedMessageHashとは、メッセージハッシュを取得する関数です。
   function getEthSignedMessageHash(bytes memory _message) public pure returns (bytes32) {
      return getMessageHash(_message).toEthSignedMessageHash();
   }
   //verifyとは、検証する関数です。
   function verify(
      bytes memory _message,
      bytes memory _signature,
      address _signer
   ) public pure returns (bool) {
      return _signer == getEthSignedMessageHash(_message).recover(_signature);
   }
   //recoverSignerとは、署名者を取得する関数です。
   function recoverSigner(
      bytes memory _message,
      bytes memory _signature
   ) public pure returns (address) {
      return getEthSignedMessageHash(_message).recover(_signature);
   }
   //splitSignatureとは、署名を分割する関数です。
   function splitSignature(bytes memory _sig)
      public
      pure
      returns (uint8, bytes32, bytes32)
   {
      require(_sig.length == 65, "invalid signature length");
      bytes32 r;
      bytes32 s;
      uint8 v;
      assembly {
         // first 32 bytes, after the length prefix
         r := mload(add(_sig, 32))
         // second 32 bytes
         s := mload(add(_sig, 64))
         // final byte (first byte of the next 32 bytes)
         v := byte(0, mload(add(_sig, 96)))
      }
      return (v, r, s);
   }
   
}