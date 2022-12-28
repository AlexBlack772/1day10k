pragma solidity ^0.8.13;

//HashFunctionとは、ハッシュ関数
contract HashFunction {
   //hashとは、ハッシュ
   function hash(string memory input) public pure returns (bytes32) {
      return keccak256(abi.encodePacked(input));
   }

   //collisionとは、衝突
   function collision(string memory input1, string memory input2)
      public
      pure
      returns (bool)
   {
      return keccak256(abi.encodePacked(input1)) ==
         keccak256(abi.encodePacked(input2));
   }

}

//GuessTheMagicWordとは、マジックワードを当てる
contract GuessTheMagicWord {
   bytes32 public answerHash =
      0x8b3b7b2b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b;

   //guessとは、当てる
   function guess(string memory magicWord) public view returns (bool) {
      return keccak256(abi.encodePacked(magicWord)) == answerHash;
   }
}
