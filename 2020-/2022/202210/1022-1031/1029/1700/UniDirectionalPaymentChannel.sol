pragma solidity ^0.8.13;

contract UniDirectionalPaymentChannel is ReentrancyGuard {
   using ECDSA for bytes32;

    address payable public sender;
    address payable public receiver;

    uint private constant DURATION = 7 * 24 * 60 * 60;
    uint public expiresAt;

    //constructorとは、コンストラクタ
      constructor(address payable _receiver) payable {
         sender = payable(msg.sender);
         receiver = _receiver;
         expiresAt = block.timestamp + DURATION;
      }
      // _getHashとは、ハッシュを取得する
      function _getHash(address _receiver, uint _expiresAt) private view returns (bytes32) {
         return keccak256(abi.encodePacked(address(this), _receiver, _expiresAt));
      }
      //getHashとは、ハッシュを取得する
      function getHash(address _receiver, uint _expiresAt) public view returns (bytes32) {
         return _getHash(_receiver, _expiresAt);
      }
      //_getEthSignedHashとは、ETH署名ハッシュを取得する
      function _getEthSignedHash(address _receiver, uint _expiresAt) private view returns (bytes32) {
         return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _getHash(_receiver, _expiresAt)));
      }
      //getEthSignedHashとは、ETH署名ハッシュを取得する
      function getEthSignedHash(address _receiver, uint _expiresAt) public view returns (bytes32) {
         return _getEthSignedHash(_receiver, _expiresAt);
      }
      //verifyとは、署名を検証する
      function verify(address _receiver, uint _expiresAt, bytes memory _signature) public view returns (bool) {
         return _receiver == _getEthSignedHash(_receiver, _expiresAt).toEthSignedMessageHash().recover(_signature);
      }
      //closeとは、閉じる
      function close(address _receiver, uint _expiresAt, bytes memory _signature) public nonReentrant {
         require(msg.sender == receiver, "UniDirectionalPaymentChannel: only receiver can close");
         require(block.timestamp <= _expiresAt, "UniDirectionalPaymentChannel: channel expired");
         require(verify(_receiver, _expiresAt, _signature), "UniDirectionalPaymentChannel: invalid signature");
         selfdestruct(receiver);
      }
      //cancelとは、キャンセルする
      function cancel() public nonReentrant {
         require(msg.sender == sender, "UniDirectionalPaymentChannel: only sender can cancel");
         require(block.timestamp > expiresAt, "UniDirectionalPaymentChannel: channel not expired");
         selfdestruct(sender);
      }
}