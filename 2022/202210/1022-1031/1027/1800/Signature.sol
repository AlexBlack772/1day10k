pragma solidity ^0.8.13;

//VerifySignatureとは、署名を検証する
contract VerifySignature  {
   //geMessageHashとは、メッセージのハッシュを取得する
   function getMessageHash(bytes32 message) public pure returns (bytes32) {
       //keccak256とは、keccak256ハッシュ関数を呼び出す
       return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));
   }
   //getEthSignedMessageHashとは、ethのメッセージのハッシュを取得する
   function getEthSignedMessageHash(bytes32 message) public pure returns (bytes32) {
       //keccak256とは、keccak256ハッシュ関数を呼び出す
       return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));
   }

   //verifyとは、検証する
   function verify(
       address signer,
       bytes32 message,
       bytes memory signature
   ) public pure returns (bool) {
       //recoverとは、署名を復元する
       return signer == recover(message, signature);
   }

   //recoverSignerとは、署名者を復元する
   function recoverSigner(bytes32 message, bytes memory signature)
       public
       pure
       returns (address)
   {
       //recoverとは、署名を復元する
       return recover(message, signature);
   }

   //splitSignatureとは、署名を分割する
   function splitSignature(bytes memory sig)
       public
       pure
       returns (uint8, bytes32, bytes32)
   {
       //requireとは、条件を満たさない場合にエラーを発生させる
       require(sig.length == 65);

       bytes32 r;
       bytes32 s;
       uint8 v;

       assembly {
           // first 32 bytes, after the length prefix
           r := mload(add(sig, 32))
           // second 32 bytes
           s := mload(add(sig, 64))
           // final byte (first byte of the next 32 bytes)
           v := byte(0, mload(add(sig, 96)))
       }

       return (v, r, s);
   }
   
}