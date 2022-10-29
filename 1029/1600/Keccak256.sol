pragma solidity ^0.8.13;

//HashFunctionsとは、ハッシュ関数を提供するライブラリ
contract HashFunction {
   //hashとは、ハッシュ関数を提供する関数
   function hash(bytes memory data) public pure returns (bytes32) {
      return keccak256(data);
   }

   //collisionとは、ハッシュ関数の衝突をテストする関数
   function collision(bytes memory data1, bytes memory data2) public pure returns (bool) {
      return keccak256(data1) == keccak256(data2);
   }

}

//GuessTheMagicWordとは、ハッシュ関数の衝突をテストするコントラクト
contract GuessTheMagicWord {
   //magicWordとは、ハッシュ関数の衝突をテストするための変数
   bytes32 public magicWord = 0x0000000000000000000000000000000000000000000000000000000000000000;

   //guessとは、ハッシュ関数の衝突をテストする関数
   function guess(bytes32 word) public view returns (bool) {
      return keccak256(abi.encodePacked(word)) == magicWord;
   }
}
