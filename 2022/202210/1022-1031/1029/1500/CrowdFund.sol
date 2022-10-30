pragma solidity ^0.8.13;

interface IERC20 {
   //transferとは、トークンを送る関数
   function transfer(address to, uint256 value) external returns (bool);

   //transferFromとは、トークンを送る関数
   function transferFrom(
      address from,
      address to,
      uint256 value
   ) external returns (bool);
}

//CrowdFundとは、クラウドファンディングを行うコントラクト
contract CrowdFund {
   //Launchとは、クラウドファンディングを開始するイベント
   event Launch(
      address indexed owner,
      address indexed token,
      uint256 amount,
      uint256 deadline
   );
   event Cancel(uint id);
   //Pledgeとは、クラウドファンディングに寄付するイベント
    event Pledge(uint indexed id, address indexed caller, uint amount);
    //UnPledgeとは、クラウドファンディングに寄付したトークンを取り消すイベント
    event Unpledge(uint indexed id, address indexed caller, uint amount);
    event Claim(uint id);
    event Refund(uint id, address indexed caller, uint amount);

    //Campaignとは、クラウドファンディングの情報を格納する構造体
      struct Campaign {
         address owner;
         IERC20 token;
         uint256 amount;
         uint256 deadline;
         uint256 totalPledged;
         mapping(address => uint256) pledges;
      }
      IERC20 public immutable token;
    
    uint public count;
    
    mapping(uint => Campaign) public campaigns;
    
    mapping(uint => mapping(address => uint)) public pledgedAmount;

    //コンストラクタとは、コントラクトをデプロイする際に呼び出される関数
      constructor(IERC20 _token) {
         token = _token;
      }

      //lauchとは、クラウドファンディングを開始する関数
      function launch(uint256 amount, uint256 deadline) external {
         require(deadline > block.timestamp, "CrowdFund: deadline is in the past");
         require(amount > 0, "CrowdFund: amount is 0");
         require(
            token.transferFrom(msg.sender, address(this), amount),
            "CrowdFund: transfer failed"
         );
         campaigns[count] = Campaign({
            owner: msg.sender,
            token: token,
            amount: amount,
            deadline: deadline,
            totalPledged: 0
         });
         emit Launch(msg.sender, address(token), amount, deadline);
         count++;
      }

      //cancelとは、クラウドファンディングをキャンセルする関数
      function cancel(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.owner == msg.sender, "CrowdFund: not owner");
         require(campaign.deadline > block.timestamp, "CrowdFund: deadline passed");
         require(
            campaign.token.transfer(msg.sender, campaign.amount),
            "CrowdFund: transfer failed"
         );
         campaign.amount = 0;
         emit Cancel(id);
      }

      //pledgeとは、クラウドファンディングに寄付する関数
      function pledge(uint id) external payable {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline > block.timestamp, "CrowdFund: deadline passed");
         uint amount = msg.value;
         campaign.pledges[msg.sender] += amount;
         campaign.totalPledged += amount;
         emit Pledge(id, msg.sender, amount);
      }

      //unpledgeとは、クラウドファンディングに寄付したトークンを取り消す関数
      function unpledge(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline > block.timestamp, "CrowdFund: deadline passed");
         uint amount = campaign.pledges[msg.sender];
         campaign.pledges[msg.sender] = 0;
         campaign.totalPledged -= amount;
         payable(msg.sender).transfer(amount);
         emit Unpledge(id, msg.sender, amount);
      }

      //claimとは、クラウドファンディングの目標金額に達した場合に、トークンを受け取る関数
      function claim(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline <= block.timestamp, "CrowdFund: deadline not passed");
         require(
            campaign.totalPledged >= campaign.amount,
            "CrowdFund: goal not reached"
         );
         require(
            campaign.token.transfer(campaign.owner, campaign.amount),
            "CrowdFund: transfer failed"
         );
         campaign.amount = 0;
         emit Claim(id);
      }

      //refundとは、クラウドファンディングの目標金額に達しなかった場合に、トークンを返金する関数
      function refund(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline <= block.timestamp, "CrowdFund: deadline not passed");
         require(
            campaign.totalPledged < campaign.amount,
            "CrowdFund: goal reached"
         );
         uint amount = campaign.pledges[msg.sender];
         campaign.pledges[msg.sender] = 0;
         campaign.totalPledged -= amount;
         payable(msg.sender).transfer(amount);
         emit Refund(id, msg.sender, amount);
      }
}