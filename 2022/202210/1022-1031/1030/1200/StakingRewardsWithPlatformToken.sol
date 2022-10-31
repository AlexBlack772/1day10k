pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface StakingRewardsWithPlatformToken {

   //stakeとは、の関数
   function stake(uint256 amount) external;
   //exitとは、出口の関数
   function exit() external;
   //getRewardとは、報酬を得る関数
   function getReward() external;
   //claimRewardとは、報酬を請求する関数
   function claimReward() external;
   //claimRewardOnlyとは、報酬のみを請求する関数
   function claimRewardOnly() external;
   //getRewardTokenとは、報酬トークンを得る関数
   function getRewardToken() external view returns (IERC20);
   //lastTimeRewardApplicableとは、最後の報酬適用時間を得る関数
   function lastTimeRewardApplicable() external view returns (uint256);
   //rewardPerTokenとは、トークンごとの報酬を得る関数
   function rewardPerToken() external view returns (uint256);
   //earnedとは、得た報酬を得る関数
   function earned(address account) external view returns (uint256);
   //stakedとは、ステークしたトークンを得る関数
   function staked(address account) external view returns (uint256);
   
}
