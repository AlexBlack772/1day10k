pragma solidity ^0.8.13;

interface IERC20 {
    function transfer(address, uint) external returns (bool);

    function transferFrom(
        address,
        address,
        uint
    ) external returns (bool);
}

//CrowdFundとは、クラウドファンディング
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
         count++;
         Campaign storage campaign = campaigns[count];
         campaign.owner = msg.sender;
         campaign.token = token;
         campaign.amount = amount;
         campaign.deadline = deadline;
         emit Launch(msg.sender, address(token), amount, deadline);
      }

      //cancelとは、クラウドファンディングをキャンセルする関数
      function cancel(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.owner == msg.sender, "CrowdFund: not owner");
         require(campaign.deadline > block.timestamp, "CrowdFund: deadline is in the past");
         require(campaign.totalPledged == 0, "CrowdFund: already pledged");
         require(
            campaign.token.transfer(msg.sender, campaign.amount),
            "CrowdFund: transfer failed"
         );
         delete campaigns[id];
         emit Cancel(id);
      }

      //pledgeとは、クラウドファンディングに寄付する関数
      function pledge(uint id) external payable {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline > block.timestamp, "CrowdFund: deadline is in the past");
         require(msg.value > 0, "CrowdFund: amount is 0");
         campaign.pledges[msg.sender] += msg.value;
         campaign.totalPledged += msg.value;
         emit Pledge(id, msg.sender, msg.value);
      }

      //unpledgeとは、クラウドファンディングに寄付したトークンを取り消す関数
      function unpledge(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline > block.timestamp, "CrowdFund: deadline is in the past");
         uint amount = campaign.pledges[msg.sender];
         require(amount > 0, "CrowdFund: no amount to unpledge");
         campaign.pledges[msg.sender] = 0;
         campaign.totalPledged -= amount;
         payable(msg.sender).transfer(amount);
         emit Unpledge(id, msg.sender, amount);
      }


      //claimとは、クラウドファンディングの目標金額に達した場合に、クラウドファンディングを開始した人にトークンを送金する関数
      function claim(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline <= block.timestamp, "CrowdFund: deadline is in the future");
         require(campaign.totalPledged >= campaign.amount, "CrowdFund: not enough funds");
         require(
            campaign.token.transfer(campaign.owner, campaign.amount),
            "CrowdFund: transfer failed"
         );
         delete campaigns[id];
         emit Claim(id);
      }

      //refundとは、クラウドファンディングの目標金額に達しなかった場合に、クラウドファンディングに寄付した人にトークンを送金する関数
      function refund(uint id) external {
         Campaign storage campaign = campaigns[id];
         require(campaign.deadline <= block.timestamp, "CrowdFund: deadline is in the future");
         require(campaign.totalPledged < campaign.amount, "CrowdFund: enough funds");
         uint amount = campaign.pledges[msg.sender];
         require(amount > 0, "CrowdFund: no amount to refund");
         campaign.pledges[msg.sender] = 0;
         campaign.totalPledged -= amount;
         payable(msg.sender).transfer(amount);
         emit Refund(id, msg.sender, amount);
      }
      
}