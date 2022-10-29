pragma solidity ^0.8;

//StakingRewardsとは、ステーキング報酬を支払うコントラクト

contract StakingRewards {
      //rewardsDistributionとは、報酬配布先
      address public rewardsDistribution;
      //rewardsTokenとは、報酬トークン
      IERC20 public rewardsToken;
      //stakingTokenとは、ステーキングトークン
      IERC20 public stakingToken;
      //rewardsDurationとは、報酬期間
      uint256 public rewardsDuration;
      //periodFinishとは、報酬期間終了
      uint256 public periodFinish = 0;
      //rewardRateとは、報酬レート
      uint256 public rewardRate = 0;
      //lastUpdateTimeとは、最終更新時間
      uint256 public lastUpdateTime;
      //rewardPerTokenStoredとは、トークンごとの報酬
      uint256 public rewardPerTokenStored;
      //totalSupplyとは、総供給量
      uint256 public totalSupply;
      //userRewardPerTokenPaidとは、ユーザーごとのトークン報酬
      mapping(address => uint256) public userRewardPerTokenPaid;
      //rewardsとは、報酬
      mapping(address => uint256) public rewards;
      //stakedとは、ステーキング
      mapping(address => uint256) public staked;
   
      //rewardPerTokenとは、トークンごとの報酬
      event RewardAdded(uint256 reward);
      //stakedとは、ステーキング
      event Staked(address indexed user, uint256 amount);
      //withdrawnとは、引き出し
      event Withdrawn(address indexed user, uint256 amount);
      //rewardPaidとは、報酬支払い
      event RewardPaid(address indexed user, uint256 reward);
   
      //constructorとは、コンストラクタ
      constructor(
         address _rewardsDistribution,
         address _rewardsToken,
         address _stakingToken,
         uint256 _rewardsDuration
      ) {
         rewardsDistribution = _rewardsDistribution;
         rewardsToken = IERC20(_rewardsToken);
         stakingToken = IERC20(_stakingToken);
         rewardsDuration = _rewardsDuration;
      }

      //onlyOwnerとは、オーナーのみ実行可能な修飾子
      modifier onlyOwner() {
         require(msg.sender == rewardsDistribution, "Caller is not owner");
         _;
      }
      //updateRewardとは、報酬を更新する関数
      function updateReward(address account) internal {
         rewardPerTokenStored = rewardPerToken();
         lastUpdateTime = lastTimeRewardApplicable();
         if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
         }
      }
      //lastTimeRewardApplicableとは、最終報酬適用時間を取得する関数
      function lastTimeRewardApplicable() public view returns (uint256) {
         return block.timestamp < periodFinish ? block.timestamp : periodFinish;
      }
      //rewardPerTokenとは、トークンごとの報酬を取得する関数
      function rewardPerToken() public view returns (uint256) {
         if (totalSupply == 0) {
            return rewardPerTokenStored;
         }
         return
            rewardPerTokenStored +
            ((lastTimeRewardApplicable() - lastUpdateTime) *
               rewardRate *
               1e18) /
            totalSupply;
      }
      //stakesとは、ステーキングする関数
      function stake(uint256 amount) public {
         require(amount > 0, "Cannot stake 0");
         updateReward(msg.sender);
         stakingToken.transferFrom(msg.sender, address(this), amount);
         totalSupply = totalSupply + amount;
         staked[msg.sender] = staked[msg.sender] + amount;
         emit Staked(msg.sender, amount);
      }
      //withdrawとは、引き出す関数
      function withdraw(uint256 amount) public {
         require(amount > 0, "Cannot withdraw 0");
         updateReward(msg.sender);
         totalSupply = totalSupply - amount;
         stakingToken.transfer(msg.sender, amount);
         staked[msg.sender] = staked[msg.sender] - amount;
         emit Withdrawn(msg.sender, amount);
      }
      //earnedとは、報酬を取得する関数
      function earned(address account) public view returns (uint256) {
         return
            (staked[account] *
               (rewardPerToken() - userRewardPerTokenPaid[account])) /
            1e18 +
            rewards[account];
      }
      //getRewardとは、報酬を取得する関数
      function getReward() public {
         updateReward(msg.sender);
         uint256 reward = earned(msg.sender);
         if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardsToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
         }
      }
      //setRewardsDurationとは、報酬期間を設定する関数
      function setRewardsDuration(uint256 _rewardsDuration)
         external
         onlyOwner
      {
         require(
            block.timestamp > periodFinish,
            "Previous rewards period must be complete before changing the duration for the new period"
         );
         rewardsDuration = _rewardsDuration;
         emit RewardAdded(rewardsDuration);
      }
      //notifyRewardAmountとは、報酬量を通知する関数
      function notifyRewardAmount(uint256 reward)
         external
         onlyOwner
         updateReward(address(0))
      {
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
      
}