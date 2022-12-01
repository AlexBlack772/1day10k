pragma solidity ^0.8.13;

contract staking {
      IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    address public owner;

    // Duration of rewards to be paid out (in seconds)
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

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

      
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

      function stake(uint _amount, uint _duration, uint _rate) public {
         stakingDuration = _duration;
         stakingRate = _rate;
      }

      
      function withdraw() public {
         
      }


      function claimStaking(uint _id) public {
         Staking memory _staking = stakings[_id];
         _staking.amount = 0;
         stakings[_id] = _staking;
      }

      function 

      
}