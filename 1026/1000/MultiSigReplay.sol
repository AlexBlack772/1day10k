pragma solidity ^0.8.13;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol";

contract MultiSigWallet {
   using ECDSA for bytes32;

   address[2] public owners;
   mapping (bytes => bool) executed;

   constructor(address[2] memory _owners) {
       owners = _owners;
   }
}