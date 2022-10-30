pragma solidity ^0.8.13;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol";

contract MultiSigWallet {
   using ECDSA for bytes32;
   address[] public owners;

   constructor(address[] memory _owners) {
       owners = _owners;
   }

   function deposit() public payable {}

   function transfer(address payable to, uint amount) public {
       bytes32 hash = keccak256(abi.encodePacked(to, amount));
      require(_checkSignature(hash, owners[0], owners[1], owners[2]), "Invalid signature");
       to.transfer(amount);

       (bool sent, ) = to.call{value: amount}("");
         require(sent, "Failed to send Ether");
   }

   function getTxHash(address to, uint amount) public view returns (bytes32) {
       return keccak256(abi.encodePacked(to, amount));
   }

   function _checkSignature(bytes32 hash, address a, address b, address c) internal pure returns (bool) {
       return a != address(0) && b != address(0) && c != address(0) && a != b && a != c && b != c;
   }

}