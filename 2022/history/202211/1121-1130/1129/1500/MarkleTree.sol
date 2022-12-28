pragma solidity ^0.8.13;

contract MarkleProof {
   function verify(bytes32[] memory proof, bytes32 root, bytes32 leaf, uint index) public pure returns (bool) {
       bytes32 hash = leaf;

       for (uint256 i = 0; i < proof.length; i++) {
           bytes32 proofElement = proof[i];
           if (index % 2 == 0 ) {
               // Hash(current computed hash + current element of the proof)
               hash = keccak256(abi.encodePacked(hash, proofElement));
           } else {
               // Hash(current element of the proof + current computed hash)
               hash = keccak256(abi.encodePacked(proofElement, hash));
           }
           index = index / 2;
       }
       // Check if the computed hash (root) is equal to the provided root
       return hash == root;
   }
}

