pragma solidity ^0.8.0.13;

contract StakingReward {
   IERC20 public immutable stakingToken;
   IERC20 public immutable rewardToken;

   address public owner;

   uint public duration;
   uint public finshiAt;
   uint public updateAt;
   uint public rewardRate;
   uint public rewardPerTokenStored;
   mapping (address => uint) public userRewardPerTokenPaid;
   mapping (address => uint) public rewards;
   
   uint public totalSupply;
   mapping (address => uint) public balances;

   constructor(address _stakingToken, address _rewardToken ) {
      stakingToken = IERC20(_stakingToken);
      rewardToken = IERC20(_rewardToken);
      owner = msg.sender;
   }

   modifier onlyOwner() {
      require(msg.sender == owner, "only owner");
      _;
   }

   modifier updateReward(address _account) {
      rewardPerTokenStored = rewardPerToken();
      updateAt = block.timestamp;
      if (account != address(0)) {
         rewards[account] = earned(account);
         userRewardPerTokenPaid[account] = rewardPerTokenStored;
      }
      _;
   }

   function  lastTimeRewardApplicable() public view returns (uint) {
      return _min(finishAt, block.timestamp);
   }

   function rewardPerToken() public view returns (uint) {
      if (totalSupply == 0) {
         return rewardPerTokenStored;
      }
      return
         rewardPerTokenStored +
         ((lastTimeRewardApplicable() - updateAt) * rewardRate * 1e18) /
         totalSupply;
   }

   function stake(uint _amount) public updateReward(msg.sender) {
      require(_amount > 0, "Cannot stake 0");
      stakingToken.transferFrom(msg.sender, address(this), _amount);
      balances[msg.sender] = balances[msg.sender] + _amount;
      totalSupply = totalSupply + _amount;
   }

   function withdraw(uint _amount) public updateReward(msg.sender) {
      require(_amount > 0, "Cannot withdraw 0");
      balances[msg.sender] -=  _amount;
      totalSupply -= _amount;
      stakingToken.transfer(msg.sender, _amount);
   }

   function earned(address _account) public view returns (uint) {
      return
         ((balancesOf[_account] *
            (rewardPerToken() - userRewardPerTokenPaid[_account])) /
         1e18) +
         rewards[_account];
   }

   function getReward() external updateReward(msg.sender) {
      uint reward = earned(msg.sender);
      if (reward > 0) {
         rewards[msg.sender] = 0;
         rewardToken.transfer(msg.sender, reward);
      }
   }

   function setRew

}