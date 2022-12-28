pragma solidity ^0.8.13;

contract crowdFund {
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

    
   modifier onlyOwner() {
      require(msg.sender == owner, "only owner can call this function");
      _;
   }
   
   constructor(uint _startAt, uint _endAt, uint _totalAmount) {
      startAt = _startAt;
      endAt = _endAt;
      totalAmount = _totalAmount;
      owner = payable(msg.sender);
   }

   function CampaignDeposit() public payable onlyOwner {
      require(block.timestamp >= startAt && block.timestamp <= endAt, "not in the farm period");
      require(msg.value <= totalAmount, "exceed the total amount");
   }

   function transferToOwner() public onlyOwner {
      require(block.timestamp > endAt, "not in the farm period");
      owner.transfer(address(this).balance);
   }

   function withdraw (uint _amount) public onlyOwner {
      require(block.timestamp > endAt, "not in the farm period");
      require(_amount <= address(this).balance, "exceed the total amount");
      owner.transfer(_amount);
   }

   function getBalance() public view returns (uint) {
      return address(this).balance;
   }

   function cancel() public onlyOwner {
      require(block.timestamp > endAt, "not in the farm period");
      selfdestruct(payable(owner));
   }

   function 
   
}
