// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
/// @title 委任による投票
contract Ballot {

   struct Voter {
         uint weight; // 投票の重み
         bool voted;  // すでに投票したか？
         address delegate; // 委任先
         uint vote;   // 投票した提案のインデックス
   }

   struct Proposal {
         bytes32 name;   // 提案の名前
         uint voteCount; // 投票数
   }

   address public chairperson;

   mapping(address => Voter) public voters;

   Proposal[] public proposals;


   constructor(bytes32[] memory proposalNames) {
         chairperson = msg.sender;
         voters[chairperson].weight = 1;

         for (uint i = 0; i < proposalNames.length; i++) {
               proposals.push(Proposal({
                     name: proposalNames[i],
                     voteCount: 0
               }));
         }
   }

   function giveRightToVote(address voter) public {
         require(
               msg.sender == chairperson,
               "Only chairperson can give right to vote."
         );
         require(
               !voters[voter].voted,
               "The voter already voted."
         );
         require(voters[voter].weight == 0);
         voters[voter].weight = 1;
   }

   function delegate(address to) external {
         Voter storage sender = voters[msg.sender];
         require(!sender.voted, "You already voted.");

         require(to != msg.sender, "Self-delegation is disallowed.");

         while (voters[to].delegate != address(0)) {
               to = voters[to].delegate;

               require(to != msg.sender, "Found loop in delegation.");
         }

         sender.voted = true;
         sender.delegate = to;
         Voter storage delegate_ = voters[to];
         if (delegate_.voted) {
               proposals[delegate_.vote].voteCount += sender.weight;
         } else {
               delegate_.weight += sender.weight;
         }
   }
   
   function vote(uint proposal) external {
         Voter storage sender = voters[msg.sender];
         require(sender.weight != 0, "Has no right to vote");
         require(!sender.voted, "Already voted.");
         sender.voted = true;
         sender.vote = proposal;

         proposals[proposal].voteCount += sender.weight;
   }



}