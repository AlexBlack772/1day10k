pragma solidity ^0.8.13;

//StakingRewardとは、Stakingの報酬を受け取るコントラクトです。
contract StakingRewards {
    IERC20 public immutable stakingToken;
    //rewardsTokenとは、ステーキングしたトークンに対して配布されるトークンのこと
    IERC20 public immutable rewardsToken;

    address public owner;

   
    // durationとは、報酬を支払う期間のこと。
    uint public duration;
    
    uint public finishAt;
    
    uint public updatedAt;
   
    uint public rewardRate;
   
    uint public rewardPerTokenStored;
   
    mapping(address => uint) public userRewardPerTokenPaid;
   
    mapping(address => uint) public rewards;

    uint public totalSupply;
   
    mapping(address => uint) public balanceOf;

    constructor(
        address _owner,
        address _stakingToken,
        address _rewardsToken,
        uint _duration
    ) {
        owner = _owner;
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
        duration = _duration;
    }

    //onlyOwnerとは、コントラクトのオーナーのみが実行できる修飾子です。
      modifier onlyOwner() {
         require(msg.sender == owner, "Ownable: caller is not the owner");
         _;
      }
      //updateRewardとは、報酬を更新する関数です。
      modifier updateReward(address account) {
         rewardPerTokenStored = rewardPerToken();
         updatedAt = lastTimeRewardApplicable();
         if (account != address(0)) {
             rewards[account] = earned(account);
             userRewardPerTokenPaid[account] = rewardPerTokenStored;
         }
         _;
      }
      //lastTimeRewardApplicableとは、報酬を支払う最後の時間を取得する関数です。
      function lastTimeRewardApplicable() public view returns (uint) {
         return block.timestamp < finishAt ? block.timestamp : finishAt;
      }
      //rewardPerTokenとは、報酬をトークン単位で取得する関数です。
      function rewardPerToken() public view returns (uint) {
         if (totalSupply == 0) {
             return rewardPerTokenStored;
         }
         return
             rewardPerTokenStored +
             ((lastTimeRewardApplicable() - updatedAt) * rewardRate * 1e18) /
             totalSupply;
      }
      
}