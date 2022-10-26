pragma solidity ^0.8.13;

contract HashFunction {
   function hash (
         string memory _input
         uint _nonce
         address _addr
      ) public pure returns (bytes32) {
         return keccak256(abi.encodePacked(_input, _nonce, _addr)); 
      
   }

   function collison(
         string memory _input
         uint _nonce
         address _addr
      ) public pure returns (bytes32) {
         return keccak256(abi.encodePacked(_input, _nonce, _addr)); 
      
   }

}

contract GuessTheMagicWord {
   bytes32 public answerHash = 0x8b3b7b2b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b;
   uint public nonce = 0;
   address public owner = msg.sender;

   function guess(string memory _guess) public {
      require(keccak256(abi.encodePacked(_guess, nonce, msg.sender)) == answerHash);
      selfdestruct(payable(owner));
   }
}