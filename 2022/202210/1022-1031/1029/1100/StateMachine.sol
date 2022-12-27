pragma solidity ^0.4.20;

//StateMachineとは、ステートマシンを作るためのコントラクトです。
contract StateMachine {
    
    // Stagesとは、ステージを表します。
      enum Stages {
         Accepting,
         Locked,
         Inactive
      }

      Stages public stage = Stages.AcceptingBlindBids;

      //atStageとは、ステージが一致するかどうかを確認するための関数です。
      modifier atStage(Stages _stage) {
         require(
            stage == _stage,
            "Function cannot be called at this time."
         );
         _;
      }

      //transitionAfterとは、ステージを変更するための関数です。
      modifier transitionAfter(uint _time) {
         require(
            now >= _time,
            "Function cannot be called at this time."
         );
         _;
      }
      //timeTransitionとは、ステージを変更するための関数です。
      modifier timeTransition(Stages _stage) {
         _;
         stage = _stage;
      }
      //bidとは、入札するための関数です。
      function bid() public payable atStage(Stages.AcceptingBlindBids) transitionAfter(biddingEnd) timeTransition(Stages.Accepting) {
         bids[msg.sender] = msg.value;
         emit LogBidSubmission(msg.sender, msg.value);
      }
      //revealとは、入札を公開するための関数です。
      function reveal(uint[] _values, bool[] _fake) public atStage(Stages.Accepting) transitionAfter(revealEnd) timeTransition(Stages.Locked) {
         uint length = bids[msg.sender];
         require(_values.length == length);
         require(_fake.length == length);
         uint refund;
         for (uint i = 0; i < length; i++) {
            if (bids[msg.sender] < _values[i]) {
               refund += bids[msg.sender];
            } else {
               if (_fake[i]) {
                  refund += _values[i];
               } else {
                  refund += bids[msg.sender] - _values[i];
               }
            }
         }
         msg.sender.transfer(refund);
         emit LogBidReveal(msg.sender, refund);
      }
      //claimGoodsとは、商品を受け取るための関数です。
      function claimGoods() public atStage(Stages.Locked) {
         require(bids[msg.sender] > 0);
         msg.sender.transfer(bids[msg.sender]);
         emit LogGoodsClaimed(msg.sender, bids[msg.sender]);
         bids[msg.sender] = 0;
      }
      //cleanUpとは、ステージを変更するための関数です。
      function cleanUp() public atStage(Stages.Locked) transitionAfter(revealEnd + 1 days) timeTransition(Stages.Inactive) {
         selfdestruct(owner);
      }
      //nextStageとは、ステージを変更するための関数です。
      function nextStage() public atStage(Stages.Inactive) {
         stage = Stages.AcceptingBlindBids;
      }
      

}