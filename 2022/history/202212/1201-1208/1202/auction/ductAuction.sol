pragma solidity ^0.8.13;

contract duchAuction {
      event Launch(
         uint id,
         address indexed creator,
         uint goal,
         uint32 startAt,
         uint32 endAt
      );
      event Cancel(uint id);
      event Pledge(uint indexed id, address indexed caller, uint amount);
      event Unpledge(uint indexed id, address indexed caller, uint amount);
      event Claim(uint id);
      event Refund(uint id, address indexed caller, uint amount);
   
      struct Campaign {
         // Creator of campaign
         address creator;
         // Amount of tokens to raise
         uint goal;
         // Total amount pledged
         uint pledged;
         // Timestamp of start of campaign
         uint32 startAt;
         // Timestamp of end of campaign
         uint32 endAt;
         // True if goal was reached and creator has claimed the tokens.
         bool claimed;
      }
   
      IERC20 public immutable token;
      // Total count of campaigns created.
      // It is also used to generate id for new campaigns.
      uint public count;
      // Mapping from id to Campaign
      mapping(uint => Campaign) public campaigns;
      // Mapping from campaign id => pledger => amount pledged
      mapping(uint => mapping(address => uint)) public pledgedAmount;
   
         constructor(IERC20 _token) {
            token = _token;
         }
   
         function launch (
         uint goal,
         uint32 startAt,
         uint32 endAt
         ) external {
         require(startAt < endAt, "crowFund: invalid time range");
         require(goal > 0, "crowFund: invalid goal");
   
         uint id = count++;
         Campaign storage campaign = campaigns[id];
         campaign.creator = msg.sender;
         campaign.goal = goal;
         campaign.startAt = startAt;
         campaign.endAt = endAt;
   
         emit Launch(id, msg.sender, goal, startAt, endAt);
      }
      
}