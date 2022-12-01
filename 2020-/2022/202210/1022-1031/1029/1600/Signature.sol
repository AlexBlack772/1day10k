pragma solidity ^0.8.13;

//VerifySignatureとは、署名を検証するコントラクト
contract VerifySignature {
   //getMessageHashとは、メッセージのハッシュを取得する関数
   function getMessageHash(string memory message) public pure returns (bytes32) {
      return keccak256(abi.encodePacked(message));
   }
   //getEthSignedMessageHashとは、メッセージのハッシュを取得する関数
   function getEthSignedMessageHash(bytes32 messageHash) public pure returns (bytes32) {
      return keccak256(abi.encodePacked("\x19Ethereum Signed Message:
   }

   //verifyとは、署名を検証する関数
   function verify(
      address signer,
      bytes32 messageHash,
      uint8 v,
      bytes32 r,
      bytes32 s
   ) public pure returns (bool) {
      return signer == ecrecover(getEthSignedMessageHash(messageHash), v, r, s);
   }

   //recoverSignerとは、署名者を取得する関数
   function recoverSigner(
      bytes32 messageHash,
      uint8 v,
      bytes32 r,
      bytes32 s
   ) public pure returns (address) {
      return ecrecover(getEthSignedMessageHash(messageHash), v, r, s);
   }

   //splitSignatureとは、署名を分割する関数
   function splitSignature(bytes memory sig)
      public
      pure
      returns (uint8, bytes32, bytes32)
   {
      require(sig.length == 65, "invalid signature length");
      bytes32 r;
      bytes32 s;
      uint8 v;
      assembly {
         r := mload(add(sig, 32))
         s := mload(add(sig, 64))
         v := byte(0, mload(add(sig, 96)))
      }
      return (v, r, s);
   }

   //
}