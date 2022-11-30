pragma solidity ^0.8.13;

interface IERC20 {
      function transferFrom(address , address , uint256 ) external returns (bool);
      function transfer(address , uint256 ) external returns (bool);
}

contract CrowdFund {
   event Launch(
      uint id,
      address indexed creater,
      uint goal,
      uint startAt,
      uint endAt
   );

   event Cancel(uint id);
   event Pledge(uint indexed id, address indexed caller, uint amount);

   event UnPledge(uint indexed id, address indexed caller, uint amount);

   event Claim(uint indexed id, address indexed caller, uint amount);

   event Refund(uint indexed id, address indexed caller, uint amount);

   struct Campaign {
      address creater;
      uint goal;
      uint pledges;
      uint startAt;
      uint endAt;
      bool claims;
   }
   
   IERC public immutable token;

   uint public count;

   mapping(uint => Campaign) public campaigns;

   mapping(uint => mapping(address => uint)) public pledgesAmount;

   constructor(address _token) {
      token = IEC20(_token);
   }

   function launch(uint _goal, uint _startAt, uint _endAt) external {
      require(_startAt >= block.timestamp, "CrowdFund: goal must be greater than 0");
      require(_startAt > block.timestamp, "CrowdFund: startAt must be greater than current time");
      require(_endAt > _startAt, "CrowdFund: endAt must be greater than startAt");

      count++;

      campaigns[count] = Campaign({
         creater : msg.sender,
         goal : _goal,
         startAt : _startAt,
         endAt : _endAt
      });

      emit Launch(count, msg.sender, _goal, _startAt, _endAt);
   }

   function cancel(uint _id) external {
      Campaign memory campaign = campaigns[_id];
      require(msg.sender == campaign.creater, "CrowdFund: only creater can cancel");
      require(campaign.startAt > block.timestamp, "CrowdFund: campaign has started");

      delete campaigns[_id];

      emit Cancel(_id);
   }

   function pledge(uint _id, uint _amount) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.startAt <= block.timestamp, "CrowdFund: campaign has not started");
      require(campaign.endAt >= block.timestamp, "CrowdFund: campaign has ended");

      campaigns.pledges += amount;
      pledgesAmount[_id][msg.sender] += amount;
      token.transferFrom(msg.sender, address(this), _amount);

      emit Pledge(_id, msg.sender, amount);
   }

   function unPledge(uint _id, uint _amount) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.endAt >= block.timestamp, "CrowdFund: campaign has ended");

      campaigns.pledges -= amount;
      pledgesAmount[_id][msg.sender] -= amount;
      token.transfer(msg.sender, _amount);

      emit UnPledge(_id, msg.sender, amount);
   }

   function claim(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.creater == msg.sender, "CrowdFund: only creater can claim");
      require(campaign.endAt < block.timestamp, "CrowdFund: campaign has not ended");
      require(campaign.pledges >= campaign.goal, "CrowdFund: goal not reached");
      require(!campaign.claims, "CrowdFund: already claimed");

      campaign.claims = true;
      token.transfer(campaign.creator, campaign.pledges);

      emit Claim(_id);
   } 

   function refund(uint _id) external {
      Campaign memory campaign = campaigns[_id];
      require(campaign.endAt < block.timestamp, "CrowdFund: campaign has not ended");
      require(campaign.pledges < campaign.goal, "CrowdFund: goal reached");
      
      uint bal = pledgesAmount[_id][msg.sender] > 0;
      token.transfer(msg.sender, bal);

      emit Refund(_id, msg.sender, amount);
   }
}