pragma solidity ^0.6.0;

//stakingRewardsのコントラクトを作成
contract StakingRewards {
   
   IERC public immutable rewardsToken;
   IERC public immutable stakingToken;
   address immutable owner;

   uint256 public periodFinish ;
   uint256 public rewardRate ;
   uint256 public rewardsDuration ;  
   uint256 public lastUpdateTime;
   uint256 public rewardPerTokenStored;

   mapping(address => uint256) public userRewardPerTokenPaid;
   mapping(address => uint256) public rewards;

   uint256 ppublic _totalSupply;
   mapping(address => uint256) public _balances;

   constructor(
       address _rewardsToken,
       address _stakingToken,
       
   ) public {
       rewardsToken = IERC(_rewardsToken);
       stakingToken = IERC(_stakingToken);
       owner = msg.sender;
       
   }

   modifier onlyOwner() {
       require(msg.sender == owner, "Ownable: caller is not the owner");
       _;
   }

   modifier updateReward(address account) {
       rewardPerTokenStored = rewardPerToken();
       lastUpdateTime = lastTimeRewardApplicable();
       if (account != address(0)) {
           rewards[account] = earned(account);
           userRewardPerTokenPaid[account] = rewardPerTokenStored;
       }
       _;
   }

   function lastTimeRewardApplicable() public view returns (uint256) {
       return Math.min(block.timestamp, periodFinish);
   }

   function stake(uint256 amount) public updateReward(msg.sender) checkhalve checkStart {
       require(amount > 0, "Cannot stake 0");
       
       stakingToken.transferFrom(msg.sender, address(this), amount);
       _totalSupply += amount;
       _balances[msg.sender] += _amount;
       emit Staked(msg.sender, amount);
   }

   function withdraw(uint256 amount) public updateReward(msg.sender) checkhalve checkStart {
       require(amount > 0, "Cannot withdraw 0");
       _totalSupply -= amount;
       _balances[msg.sender] -= amount;
       stakingToken.transfer(msg.sender, amount);
       emit Withdrawn(msg.sender, amount);
   }

   function earned(address account) public view returns (uint256) {
       return _balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account]) / 1e18 + rewards[account];
   }

   function getReward() public updateReward(msg.sender) checkhalve checkStart {
       uint256 reward = earned(msg.sender);
       if (reward > 0) {
           rewards[msg.sender] = 0;
           rewardsToken.transfer(msg.sender, reward);
           emit RewardPaid(msg.sender, reward);
       }
   }

   function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner {
       require(periodFinish == 0 || block.timestamp > periodFinish, "Previous rewards period must be complete before changing the duration for the new period");
       rewardsDuration = _rewardsDuration;
       emit RewardsDurationUpdated(rewardsDuration);
   }

   function notifyRewardAmount(uint256 reward) external onlyOwner updateReward(address(0)) {
       if (block.timestamp >= periodFinish) {
           rewardRate = reward / rewardsDuration;
       } else {
           uint256 remaining = periodFinish - block.timestamp;
           uint256 leftover = remaining * rewardRate;
           rewardRate = (reward + leftover) / rewardsDuration;
       }
       lastUpdateTime = block.timestamp;
       periodFinish = block.timestamp + rewardsDuration;
       emit RewardAdded(reward);
   }

   function _min(uint256 a, uint256 b) internal pure returns (uint256) {
       return a < b ? a : b;
   }


}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    
    function balanceOf(address account) external view returns (uint256);
    
    function transfer(address recipient, uint256 amount) external returns (bool);
    
    function allowance(address owner, address spender) external view returns (uint256);
    
    function approve(address spender, uint256 amount) external returns (bool);
    
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
}