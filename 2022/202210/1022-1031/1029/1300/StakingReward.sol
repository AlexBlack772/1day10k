pragma solidity ^0.8.10;

//StakingRewardsWithPlatformTokenとは、プラットフォームトークンを使用したステーキング報酬を行うためのコントラクトです。

interface StakingRewardWithPlatformToken {
   //stakeとは、ステーキングを行うための関数です。
   function stake(uint256 amount) external;

   //withdrawとは、ステーキングを取り出すための関数です。
   function withdraw(uint256 amount) external;

   //exitとは、ステーキングを終了するための関数です。
   function exit() external;

   //claimRewardとは、報酬を取得するための関数です。
   function claimReward() external;

   //claimRwardOnlyとは、報酬を取得するための関数です。
   function claimRewardOnly() external;

   //getRewardTokenとは、報酬トークンを取得するための関数です。
   function getRewardToken() external view returns (address);

   //lastTimeRewardApplicableとは、最後に報酬を適用した時間を取得するための関数です。
   function lastTimeRewardApplicable() external view returns (uint256);

   //rewardPerTokenとは、トークンごとの報酬を取得するための関数です。
   function rewardPerToken() external view returns (uint256);

   //earnedとは、報酬を取得するための関数です。
   function earned(address account) external view returns (uint256);
   
}