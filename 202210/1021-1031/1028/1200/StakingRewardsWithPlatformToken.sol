pragma solidity ^0.6.0;

interface StakingRewardsWithPlatformToken {
   //stakeとは、ステークする
   function stake(uint256 amount) external;
   //exitとは、出口
   function exit() external;
   //withdrawとは、引き出す
   function withdraw(uint256 amount) external;
   //claimRewardとは、報酬を請求する
   function claimReward() external;
   //claimRewardOnlyとは、報酬のみを請求する
   function claimRewardOnly() external;
   //getRewardTokenとは、報酬トークンを取得する
   function getRewardToken() external view returns (address);
   //lastTimeRewardApplicableとは、最終報酬適用可能時間
   function lastTimeRewardApplicable() external view returns (uint256);
   //rewardPerTokenとは、トークンごとの報酬
   function rewardPerToken() external view returns (uint256);
   //earnedとは、得た
   function earned(address account) external view returns (uint256);
   
}