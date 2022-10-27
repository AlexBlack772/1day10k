pragma solidity ^0.6.0;

contract CrowFund {
   //Launchとは、ランチする
   event Launch(address indexed _from, uint256 _value);
   //Pledgeとは、プレッジする
   //プレッジとは、保証する
   event Pledge(address indexed _from, uint256 _value);

   //Campaignとは、キャンペーン
   struct Campaign {
      //nameとは、名前
      string name;
      //descriptionとは、説明
      string description;
      //targetとは、ターゲット
      uint256 target;
      //deadlineとは、期限
      uint256 deadline;
      //totalとは、合計
      uint256 total;
      //ownerとは、オーナー
      address payable owner;
      //isLaunchedとは、ランチされたか
      bool isLaunched;
      //isCompletedとは、完了したか
      bool isCompleted;
   }
   IERC20 public immutable token;
    uint public count;

   //mappingとは、マッピング、連想配列
   mapping(uint => Campaign) public campaigns;
   mapping(uint => mapping(address => uint)) public pledges;
   //mapping内のmappingとは、マッピングのマッピング

   constructor(IERC20 _token) public {
      token = _token;
   }

   //launch()とは、ランチする
   function launch(
      string calldata _name,
      string calldata _description,
      uint256 _target,
      uint256 _deadline
   ) external {
      //requireとは、要求する
      require(_target > 0, "CrowFund: target is 0");
      require(_deadline > block.timestamp, "CrowFund: deadline is before current time");

      //campaignsとは、キャンペーン
      campaigns[count] = Campaign({
         name: _name,
         description: _description,
         target: _target,
         deadline: _deadline,
         total: 0,
         owner: msg.sender,
         isLaunched: true,
         isCompleted: false
      });
      //emitとは、発行する
      emit Launch(msg.sender, count);
      count++;
   }

   //cancel()とは、キャンセルする
   function cancel(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.owner == msg.sender, "CrowFund: not campaign owner");
      require(campaign.isLaunched, "CrowFund: campaign is not launched");
      require(!campaign.isCompleted, "CrowFund: campaign is already completed");
      require(campaign.deadline > block.timestamp, "CrowFund: campaign already ended");

      campaign.isLaunched = false;
   }

   //pledge()とは、プレッジする
   function pledge(uint _id, uint256 _amount) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.isLaunched, "CrowFund: campaign is not launched");
      require(!campaign.isCompleted, "CrowFund: campaign is already completed");
      require(campaign.deadline > block.timestamp, "CrowFund: campaign already ended");

      //transferFromとは、トランスファーする
      token.transferFrom(msg.sender, address(this), _amount);
      pledges[_id][msg.sender] += _amount;
      campaign.total += _amount;

      if (campaign.total >= campaign.target) {
         campaign.isCompleted = true;
         //transferとは、トランスファーする
         campaign.owner.transfer(campaign.total);
      }

      emit Pledge(msg.sender, _amount);
   }
   //unpledge()とは、アンプレッジする
   //アンプレッジとは、保証を取り消す
   function unpledge(uint _id, uint256 _amount) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.isLaunched, "CrowFund: campaign is not launched");
      require(!campaign.isCompleted, "CrowFund: campaign is already completed");
      require(campaign.deadline > block.timestamp, "CrowFund: campaign already ended");

      uint256 amount = pledges[_id][msg.sender];
      require(amount >= _amount, "CrowFund: not enough pledge amount");

      pledges[_id][msg.sender] -= _amount;
      campaign.total -= _amount;
      //transferとは、トランスファーする
      token.transfer(msg.sender, _amount);
   }
   //claim()とは、クレームする
   //クレームとは、主張する
   function claim(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.isLaunched, "CrowFund: campaign is not launched");
      require(campaign.isCompleted, "CrowFund: campaign is not completed");
      require(campaign.deadline <= block.timestamp, "CrowFund: campaign is not ended");

      uint256 amount = pledges[_id][msg.sender];
      require(amount > 0, "CrowFund: not enough pledge amount");

      pledges[_id][msg.sender] = 0;
      //transferとは、トランスファーする
      token.transfer(msg.sender, amount);
   }

   //refundとは、返金する
   function refund(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.isLaunched, "CrowFund: campaign is not launched");
      require(!campaign.isCompleted, "CrowFund: campaign is already completed");
      require(campaign.deadline <= block.timestamp, "CrowFund: campaign is not ended");

      uint256 amount = pledges[_id][msg.sender];
      require(amount > 0, "CrowFund: not enough pledge amount");

      pledges[_id][msg.sender] = 0;
      //transferとは、トランスファーする
      token.transfer(msg.sender, amount);
   }
   




}