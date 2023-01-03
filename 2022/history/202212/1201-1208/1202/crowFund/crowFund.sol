pragma solidity ^0.8.13;

contract crowFund {
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

      function cancel(uint id) external {
        Campaign storage campaign = campaigns[id];
        require(campaign.creator == msg.sender, "crowFund: not creator");
        require(campaign.pledged == 0, "crowFund: already pledged");
        require(block.timestamp < campaign.startAt, "crowFund: already started");

        delete campaigns[id];
        emit Cancel(id);
      }

      function pledge(uint id) external payable {
        Campaign storage campaign = campaigns[id];
        require(block.timestamp >= campaign.startAt, "crowFund: not started");
        require(block.timestamp < campaign.endAt, "crowFund: already ended");
        require(campaign.pledged < campaign.goal, "crowFund: already reached goal");

        uint amount = msg.value;
        campaign.pledged += amount;
        pledgedAmount[id][msg.sender] += amount;

        emit Pledge(id, msg.sender, amount);
      }

}