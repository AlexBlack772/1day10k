pragma solidity ^0.8.13;

//HashFunctionとは、ハッシュ関数を表すコントラクトです
contract HashFunction {
    //keccak256とは、keccak256のハッシュ値を返す関数です。
    function keccak256(string memory _str) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_str));
    }
    //hashとは、keccak256のハッシュ値を返す関数です。
      function hash(string memory _str) public pure returns (bytes32) {
         return keccak256(_str);
      }
      //collisionとは、ハッシュ値が衝突するかどうかを返す関数です。
      function collision(string memory _str1, string memory _str2) public pure returns (bool) {
         return keccak256(_str1) == keccak256(_str2);
      }
}

//GuessTheMagicWordとは、マジックワードを当てるゲームです。
contract GuessTheMagicWord {
    //magicWordとは、マジックワードです。
    string public magicWord = "Hello, World!";
    //guessとは、マジックワードを当てる関数です。
    function guess(string memory _str) public view returns (bool) {
        return keccak256(_str) == keccak256(magicWord);
    }
}
