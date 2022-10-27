pragma solidity ^0.6.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/security/ReentrancyGuard.sol";

//UniDirectionalPaymentChannelとは、一方向の支払いチャネル
contract UniDirectionalPaymentChannel is ReentrancyGuard {
   //ECDSAとは、標準的な機能を提供する
   using ECDSA for bytes32;

    address payable public sender;
    address payable public receiver;

    uint private constant DURATION = 7 * 24 * 60 * 60;
    uint public expiresAt;

    constructor(address payable _receiver) payable {
        require(_receiver != address(0), "receiver = zero address");
        sender = payable(msg.sender);
        receiver = _receiver;
        expiresAt = block.timestamp + DURATION;
    }

    //_getHashとは、ハッシュを取得する
      function _getHash(uint256 _amount) internal view returns (bytes32) {
         return keccak256(abi.encodePacked(address(this), _amount));
      }

      //getHashとは、ハッシュを取得する
      function getHash(uint256 _amount) external view returns (bytes32) {
         return _getHash(_amount);
      }

      //_getEthSignedHashとは、ETHサインハッシュを取得する
      function _getEthSignedHash(uint256 _amount) internal view returns (bytes32) {
         return _getHash(_amount).toEthSignedMessageHash();
      }

      //getEthSignedHashとは、ETHサインハッシュを取得する
      function getEthSignedHash(uint256 _amount) external view returns (bytes32) {
         return _getEthSignedHash(_amount);
      }

      //_verifyとは、検証する
      function _verify(uint256 _amount, bytes memory _signature) internal view returns (bool) {
         return _getEthSignedHash(_amount).recover(_signature) == sender;
      }

      //verifyとは、検証する
      function verify(uint256 _amount, bytes memory _signature) external view returns (bool) {
         return _verify(_amount, _signature);
      }

      //closeとは、閉じる
      function close(uint256 _amount, bytes memory _signature) external nonReentrant {
         require(_verify(_amount, _signature), "invalid signature");
         require(_amount <= address(this).balance, "insufficient funds");
         require(block.timestamp < expiresAt, "channel expired");
         receiver.transfer(_amount);
      }

      //cancelとは、キャンセルする
      function cancel() external nonReentrant {
         require(block.timestamp >= expiresAt, "channel not expired");
         selfdestruct(sender);
      }
      
}