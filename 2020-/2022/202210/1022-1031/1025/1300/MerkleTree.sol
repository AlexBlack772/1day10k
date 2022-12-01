pragma solidity ^0.8.13;

contract MerkleProof {
      function verify(
         bytes32[] memory proof,
         bytes32 root,
         bytes32 leaf
      ) public pure returns (bool) {
         bytes32 computedHash = leaf;
         for (uint256 i = 0; i < proof.length; i++) {
               bytes32 proofElement = proof[i];
               if (computedHash < proofElement) {
                  computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
               } else {
                  computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
               }
         }
         return computedHash == root;
      }
}

contract TestMerkleProof is MerkleProof {
   bytes[] public hashes;
   
   constructor() {
      string[4] memory transactions = [
         "0x1234",
         "0x5678",
         "0x9abc",
         "0xdef0"
      ];

      for (uint i = 0; i < transactions.length; i++) {
         hashes.push(abi.encodePacked(transactions[i]));
      }

      uint n = hashes.length;
      while (n > 1) {
         for (uint i = 0; i < n; i += 2) {
            if (i + 1 < n) {
               hashes.push(abi.encodePacked(keccak256(abi.encodePacked(hashes[i], hashes[i + 1]))));
            } else {
               hashes.push(hashes[i]);
            }
         }
         n = (n + 1) / 2;
      }

   }

   function getRoot() public view returns (bytes32) {
      return keccak256(abi.encodePacked(hashes[hashes.length - 1]));
   }

   
}