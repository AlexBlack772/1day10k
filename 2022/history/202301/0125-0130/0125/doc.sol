pragma solidity >=0.7.0 <0.9.0;
/// @title 委任による投票
contract Ballot {
   struct Voter {
        uint weight; // ウェイトは委任により蓄積される
        bool voted;  // trueならすでにその人は投票済み
        address delegate; // 委任先
        uint vote;   // 投票したプロポーザルのインデックス
    }

      struct Proposal {
         bytes32 name;   // 紹介文
         uint voteCount; // このプロポーザルに投票した人数
      }

}
