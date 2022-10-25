pragma solidity ^0.8.13;

interface IERC20 {
   function transferFrom(address from, address to, uint256 amount) external;
   
   function transfer(address to, uint256 amount) external returns (bool);
}

contract CrowFund {
   event Launch(uint id, address owner, uint goal, uint startAt, uint deadline);

   event Cancel(uint id);
   event Predge(uint id, address owner, uint amount);
   event Unpledge(uint id, address owner, uint amount);
   event Claim(uint id)
   event Refund(uint id, address owner, uint amount);

   struct Campaign {
      address owner;
      uint goal;
      uint startAt;
      uint deadline;
      uint balance;
      bool isLaunched;
   }

   IERC20 public token;
   uint public campaignCount;
   mapping(uint => Campaign) public campaigns;
   mapping(uint => mapping(address => uint)) public pledges;

   constructor(address _token) {
      token = IERC20(_token);
   }

   function launch(
      uint _goal,
      uint _startAt,
      uint _deadline
   ) public {
      require(_goal > 0, "Goal must be greater than 0");
      require(_startAt > block.timestamp, "Start time must be in the future");
      require(_deadline > _startAt, "Deadline must be after start time");

      campaignCount++;
      Campaign storage campaign = campaigns[campaignCount];
      campaign.owner = msg.sender;
      campaign.goal = _goal;
      campaign.startAt = _startAt;
      campaign.deadline = _deadline;
      campaign.isLaunched = true;

      emit Launch(campaignCount, msg.sender, _goal, _startAt, _deadline);
   }
   
   function cancel(uint _id) public {
      Campaign storage campaign = campaigns[_id];
      require(campaign.isLaunched, "Campaign is not launched");
      require(campaign.owner == msg.sender, "Only owner can cancel campaign");
      require(block.timestamp < campaign.startAt, "Campaign has started");
      campaign.isLaunched = false;
      delete campaigns[_id];
      emit Cancel(_id);
   }
   
   function pledges(uint _id) public view returns (uint) {
      Campaign storage campaign = campaigns[_id];
      require(block.timestamp > campaign.startAt, "Campaign has not started");
      require(block.timestamp < campaign.deadline, "Campaign has ended");

      campaign.pledges += msg.value;
      pledges[_id][msg.sender] += msg.value;
      token.transferFrom(msg.sender, address(this), msg.value);
      emit Predge(_id, msg.sender, msg.value);

   }

   function unpledge(uint _id,uint amout)
   external {
      Campaign storage campaign = campaigns[_id];
      
      require(block.timestamp < campaign.deadline, "Campaign has ended");
      require(pledges[_id][msg.sender] >= amount, "Not enough pledge");

      campaign.pledges -= amount;
      pledges[_id][msg.sender] -= amount;
      token.transfer(msg.sender, amount);

      emit Unpledge(_id, msg.sender, amount);
   }

   function claim(uint _id) public {
      Campaign storage campaign = campaigns[_id];
      require(campaign.creator == msg.sender, "Only creator can claim");
      require(block.timestamp > campaign.deadline, "Campaign has not ended");
      require(campaign.pledges >= campaign.goal, "Campaign has not reached goal");
      require(campaign.owner == msg.sender, "Only owner can claim funds");

      campaign.claimed = false;
      token.transfer(msg.sender, campaign.pledges);
      emit Claim(_id);
   }

   function refund(uint _id) public {
      Campaign memory campaign = campaigns[_id];
      
      require(block.timestamp > campaign.deadline, "Campaign has not ended");
      require(campaign.pledges < campaign.goal, "Campaign has reached goal");
      
      uint bal = pledges[_id][msg.sender];
      campaign.claimed = false;
      token.transfer(msg.sender, campaign.pledges);
      emit Refund(_id, msg.sender, campaign.pledges);
   }
}