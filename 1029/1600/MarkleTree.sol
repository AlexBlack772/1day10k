pragma solidity ^0.8.13;

//MarkleProofとは、マークル木の検証を行うコントラクト
contract MarkleProof {
   //verifyとは、マークル木の検証を行う関数
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

//TestMerkleProofとは、MarkleProofのテストコントラクト
contract TestMerklePrrof is MarkleProof {
   bytes32[] public hashes;

   //constructorとは、コントラクトをデプロイする際に呼び出される関数
   constructor() {
      hashes.push(0x1);
      hashes.push(0x2);
      hashes.push(0x3);
      
   }

   //getRootとは、マークル木のルートを取得する関数
   function getRoot() public view returns (bytes32) {
      return keccak256(abi.encodePacked(keccak256(abi.encodePacked(0x1, 0x2)), 0x3));
   }

   

}