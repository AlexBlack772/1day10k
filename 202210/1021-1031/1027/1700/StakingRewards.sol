pragma solidity ^0.6.0;

//stakingRewardsとは、ステーキング報酬
contract StakingRewards {
   IERC20 public immutable stakingToken;
    //rewardsTokenとは、ステーキングしたトークンに対して配布されるトークンのこと
    IERC20 public immutable rewardsToken;

    address public owner;

    // Duration of rewards to be paid out (in seconds)
    // durationとは、報酬を支払う期間のこと。
    uint public duration;
    // Timestamp of when the rewards finish
    uint public finishAt;
    // Minimum of last updated time and reward finish time
    uint public updatedAt;
    // Reward to be paid out per second
    uint public rewardRate;
    // Sum of (reward rate * dt * 1e18 / total supply)
    uint public rewardPerTokenStored;
    // User address => rewardPerTokenStored
    mapping(address => uint) public userRewardPerTokenPaid;
    // User address => rewards to be claimed
    mapping(address => uint) public rewards;

    // Total staked
    uint public totalSupply;
    // User address => staked amount
    mapping(address => uint) public balanceOf;

    //stakeとは、ステークする
    function stake(uint256 amount) external;
    //withdrawとは、引き出す
    function withdraw(uint256 amount) external;
    //getRewardとは、報酬を取得する
    function getReward() external;
    //exitとは、出口
    function exit() external;
    //stakeWithPermitとは、パーミットを使ってステークする
    function stakeWithPermit(uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external;
    //stakeWithPermitMaxとは、パーミットを使って最大のステークをする
    function stakeWithPermitMax(uint256 deadline, uint8 v, bytes32 r, bytes32 s) external;
    //permitとは、パーミット
    function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external;
    //earnedとは、稼いだ
    function earned(address account) external view returns (uint256);
    //balanceOfとは、バランスを取得する
    function balanceOf(address account) external view returns (uint256);
    //lastTimeRewardApplicableとは、最後に報酬が適用された時間を取得する
    function lastTimeRewardApplicable() external view returns (uint256);
    //rewardPerTokenとは、トークンごとの報酬を取得する
    function rewardPerToken() external view returns (uint256);
    //earnedとは、稼いだ
    function earned(address account) external view returns (uint256);
    //lastTimeRewardApplicableとは、最後に報酬が適用された時間を取得する
    function lastTimeRewardApplicable() external view returns (uint256);
    //rewardPerTokenとは、トークンごとの報酬を取得する
    function rewardPerToken() external view returns (uint256);
    //rewardRateとは、報酬率を取得する
    function rewardRate() external view returns (uint256);
    //onlyOwnerとは、オーナーのみ
      modifier onlyOwner() {
         require(msg.sender == owner, "Ownable: caller is not the owner");
         _;
      }
   //updateRewardとは、報酬を更新する
   modifier updateReward(address account) {
      rewardPerTokenStored = rewardPerToken();
      lastUpdateTime = lastTimeRewardApplicable();
      if (account != address(0)) {
         rewards[account] = earned(account);
         userRewardPerTokenPaid[account] = rewardPerTokenStored;
      }
      _;
   }
   //lastTimeRewardApplicableとは、最後に報酬が適用された時間を取得する
   function lastTimeRewardApplicable() public view returns (uint256) {
      return Math.min(block.timestamp, periodFinish);
   }
   //rewardPerTokenとは、トークンごとの報酬を取得する
   function rewardPerToken() public view returns (uint256) {
      if (totalSupply() == 0) {
         return rewardPerTokenStored;
      }
      return
         rewardPerTokenStored.add(
            lastTimeRewardApplicable()
               .sub(lastUpdateTime)
               .mul(rewardRate)
               .mul(1e18)
               .div(totalSupply())
         );
   }
   //stakesとは、ステークする
   function stake(uint256 amount) public updateReward(msg.sender) checkhalve checkStart {
      require(amount > 0, "Cannot stake 0");
      totalSupply = totalSupply.add(amount);
      balances[msg.sender] = balances[msg.sender].add(amount);
      stakingToken.safeTransferFrom(msg.sender, address(this), amount);
      emit Staked(msg.sender, amount);
   }
   //withdrawとは、引き出す
   function withdraw(uint256 amount) public updateReward(msg.sender) checkhalve checkStart {
      require(amount > 0, "Cannot withdraw 0");
      totalSupply = totalSupply.sub(amount);
      balances[msg.sender] = balances[msg.sender].sub(amount);
      stakingToken.safeTransfer(msg.sender, amount);
      emit Withdrawn(msg.sender, amount);
   }

   //earnedとは、稼いだ
   function earned(address account) public view returns (uint256) {
      return
         balances[account]
            .mul(rewardPerToken().sub(userRewardPerTokenPaid[account]))
            .div(1e18)
            .add(rewards[account]);
   }
   //getRewardとは、報酬を取得する
   function getReward() public updateReward(msg.sender) checkhalve checkStart {
      uint256 reward = earned(msg.sender);
      if (reward > 0) {
         rewards[msg.sender] = 0;
         rewardToken.safeTransfer(msg.sender, reward);
         emit RewardPaid(msg.sender, reward);
      }
   }
   //setRewardsDurationとは、報酬期間を設定する
   function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner {
      require(block.timestamp > periodFinish, "Previous reward period must be complete before changing the duration for the new period");
      rewardsDuration = _rewardsDuration;
      emit RewardsDurationUpdated(rewardsDuration);
   }

   //notifyRewardAmountとは、報酬量を通知する
   function notifyRewardAmount(uint256 reward) external onlyOwner updateReward(address(0)) {
      if (block.timestamp >= periodFinish) {
         rewardRate = reward.div(rewardsDuration);
      } else {
         uint256 remaining = periodFinish.sub(block.timestamp);
         uint256 leftover = remaining.mul(rewardRate);
         rewardRate = reward.add(leftover).div(rewardsDuration);
      }
      lastUpdateTime = block.timestamp;
      periodFinish = block.timestamp.add(rewardsDuration);
      emit RewardAdded(reward);
   }
}