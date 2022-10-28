pragma solidity ^0.8.13;

contract MarkleProof {
   //verifyとは、マークルプルーフを検証する関数です。
   function verify(bytes32[] memory _proof, bytes32 _root, bytes32 _leaf) public pure returns (bool) {
      bytes32 computedHash = _leaf;
      for (uint i = 0; i < _proof.length; i++) {
         bytes32 proofElement = _proof[i];
         if (computedHash < proofElement) {
            computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
         } else {
            computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
         }
      }
      return computedHash == _root;
   }

}

contract TestMerkleProof is MerkleProof {
   bytes32[] public hashes;

   //constuctorとは、コンストラクタです。
   constructor(bytes32[] memory _hashes) {
      hashes = _hashes;
   }
   //getRootとは、マークルプルーフのルートを返す関数です。
   function getRoot() public view returns (bytes32) {
      return getMerkleRoot(hashes);
   }
   
}