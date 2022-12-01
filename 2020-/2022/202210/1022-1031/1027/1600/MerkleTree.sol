pragma solidity ^0.6.0;

//MarkleProofとは、マークルプルーフ
//マークルプルーフとは、マークルツリーの検証
contract MarkleProof {
   //verifyとは、検証する
   function verify(
      //proofとは、証明
      bytes32[] memory proof,
      //rootとは、ルート
      bytes32 root,
      //leafとは、リーフ
      bytes32 leaf
   ) public pure returns (bool) {
      //computedHashとは、計算されたハッシュ
      bytes32 computedHash = leaf;
      //iとは、インデックス
      for (uint256 i = 0; i < proof.length; i++) {
         //proof[i]とは、証明のインデックス
         bytes32 proofElement = proof[i];
         //computedHashとは、計算されたハッシュ
         if (computedHash < proofElement) {
            //computedHashとは、計算されたハッシュ
            computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
         } else {
            //computedHashとは、計算されたハッシュ
            computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
         }
      }
      //computedHashとは、計算されたハッシュ
      return computedHash == root;
   }

}

//