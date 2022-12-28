pragma solidity ^0.8.13;

//IERC20とは、ERC20トークンのインターフェースです。
interface IERC20 {
   function transferFrom(
      address _from,
      address _to,
      uint256 _value
   ) external returns (bool _success);

   //transferとは、トークンを送金する関数です。
   function transfer(address _to, uint256 _value) external returns (bool _success);
}

//CrowFundとは、クラウドファンディングコントラクトです。
contract CrowFund {
   //Launchとは、クラウドファンディングを開始したときに発生するイベントです。
   event Launch(
      address indexed _from,
      uint256 _amount,
      uint256 _deadline
   );
   //Cancelとは、クラウドファンディングをキャンセルしたときに発生するイベントです。
   event Cancel(
      address indexed _from,
      uint256 _amount
   );
   //Withdrawとは、クラウドファンディングを終了し、トークンを送金したときに発生するイベントです。
   event Withdraw(
      address indexed _from,
      uint256 _amount
   );
   //Pledgeとは、クラウドファンディングに寄付したときに発生するイベントです。
   event Pledge(
      address indexed _from,
      uint256 _amount
   );
   //Unpledgeとは、クラウドファンディングに寄付したトークンを取り消したときに発生するイベントです。
   event Unpledge(
      address indexed _from,
      uint256 _amount
   );
   //Claimとは、クラウドファンディングに寄付したトークンを取り消したときに発生するイベントです。
   event Claim(
      address indexed _from,
      uint256 _amount
   );
   //Refundとは、クラウドファンディングに寄付したトークンを取り消したときに発生するイベントです。
   event Refund(
      address indexed _from,
      uint256 _amount
   );

   //Campaignとは、クラウドファンディングの情報です。
   struct Campaign {
      uint256 _amount;
      uint256 _deadline;
      uint256 _pledge;
      uint256 _claim;
      uint256 _refund;
      bool _cancel;
   }

   IERC20 public immutable token;
   
    uint public count;
    
    mapping(uint => Campaign) public campaigns;
    
    mapping(uint => mapping(address => uint)) public pledgedAmount;

   //constructorとは、コンストラクタです。
   constructor(IERC20 _token) {
      token = _token;
   }

   //launchとは、クラウドファンディングを開始する関数です。
   function launch(uint256 _amount, uint256 _deadline) external {
      require(_amount > 0, "CrowFund: amount must be greater than 0");
      require(_deadline > block.timestamp, "CrowFund: deadline must be greater than now");
      require(token.transferFrom(msg.sender, address(this), _amount), "CrowFund: transferFrom failed");
      campaigns[count] = Campaign(_amount, _deadline, 0, 0, 0, false);
      emit Launch(msg.sender, _amount, _deadline);
      count++;
   }

   //cancelとは、クラウドファンディングをキャンセルする関数です。
   function cancel(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign._amount > 0, "CrowFund: campaign not found");
      require(campaign._deadline > block.timestamp, "CrowFund: campaign already ended");
      require(!campaign._cancel, "CrowFund: campaign already canceled");
      campaign._cancel = true;
      require(token.transfer(msg.sender, campaign._amount), "CrowFund: transfer failed");
      emit Cancel(msg.sender, campaign._amount);
   }

   //pledgeとは、クラウドファンディングに寄付する関数です。
   function pledge(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign._amount > 0, "CrowFund: campaign not found");
      require(campaign._deadline > block.timestamp, "CrowFund: campaign already ended");
      require(!campaign._cancel, "CrowFund: campaign already canceled");
      uint amount = token.allowance(msg.sender, address(this));
      require(amount > 0, "CrowFund: amount must be greater than 0");
      require(token.transferFrom(msg.sender, address(this), amount), "CrowFund: transferFrom failed");
      campaign._pledge += amount;
      pledgedAmount[_id][msg.sender] += amount;
      emit Pledge(msg.sender, amount);
   }

   //unpledgeとは、クラウドファンディングに寄付したトークンを取り消す関数です。
   function unpledge(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign._amount > 0, "CrowFund: campaign not found");
      require(campaign._deadline > block.timestamp, "CrowFund: campaign already ended");
      require(!campaign._cancel, "CrowFund: campaign already canceled");
      uint amount = pledgedAmount[_id][msg.sender];
      require(amount > 0, "CrowFund: amount must be greater than 0");
      pledgedAmount[_id][msg.sender] = 0;
      campaign._pledge -= amount;
      require(token.transfer(msg.sender, amount), "CrowFund: transfer failed");
      emit Unpledge(msg.sender, amount);
   }

   //claimとは、クラウドファンディングに寄付したトークンを取り消す関数です。
   function claim(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign._amount > 0, "CrowFund: campaign not found");
      require(campaign._deadline <= block.timestamp, "CrowFund: campaign not ended");
      require(!campaign._cancel, "CrowFund: campaign already canceled");
      uint amount = pledgedAmount[_id][msg.sender];
      require(amount > 0, "CrowFund: amount must be greater than 0");
      pledgedAmount[_id][msg.sender] = 0;
      campaign._pledge -= amount;
      campaign._claim += amount;
      require(token.transfer(msg.sender, amount), "CrowFund: transfer failed");
      emit Claim(msg.sender, amount);
   }

   //refundとは、クラウドファンディングに寄付したトークンを取り消す関数です。
   function refund(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign._amount > 0, "CrowFund: campaign not found");
      require(campaign._deadline <= block.timestamp, "CrowFund: campaign not ended");
      require(campaign._cancel, "CrowFund: campaign not canceled");
      uint amount = pledgedAmount[_id][msg.sender];
      require(amount > 0, "CrowFund: amount must be greater than 0");
      pledgedAmount[_id][msg.sender] = 0;
      campaign._pledge -= amount;
      campaign._refund += amount;
      require(token.transfer(msg.sender, amount), "CrowFund: transfer failed");
      emit Refund(msg.sender, amount);
   }
   
}
