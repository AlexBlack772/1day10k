pragma solidity ^0.8.13;

//StakingRewardsWithPlatformTokenとは、プラットフォームトークンとステーキング報酬を持つステーキング報酬
interface StakingRewardsWithPlatformToken {
   //stakeとは、ステークを表す
   function stake(uint256 amount) external;
   //exitとは、出口を表す
   function exit() external;
   //withdrawとは、引き出す
   function withdraw(uint256 amount) external;
   //claimRewardとは、報酬を請求する
   function claimReward() external;
   //claimRewardOnlyとは、報酬のみを請求する
   function claimRewardOnly() external;
   //getRewardTokenとは、報酬トークンを取得する
   function getRewardToken() external view returns (address);
   //lastTimeRewardApplicableとは、最後に報酬が適用された時間を取得する
   function lastTimeRewardApplicable() external view returns (uint256);
   //rewardPerTokenとは、トークンごとの報酬を取得する
   function rewardPerToken() external view returns (uint256);
   //earnedとは、得たという意味
   function earned(address account) external view returns (uint256);
   
}