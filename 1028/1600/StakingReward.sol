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
      //stakeとは、トークンをステーキングする関数です。
        function stake(uint amount) public updateReward(msg.sender) {
             require(amount > 0, "Cannot stake 0");
             totalSupply = totalSupply + amount;
             balanceOf[msg.sender] = balanceOf[msg.sender] + amount;
             stakingToken.transferFrom(msg.sender, address(this), amount);
             emit Staked(msg.sender, amount);
        }
        //withdrawとは、トークンをステーキングから取り出す関数です。
        function withdraw(uint amount) public updateReward(msg.sender) {
             require(amount > 0, "Cannot withdraw 0");
             totalSupply = totalSupply - amount;
             balanceOf[msg.sender] = balanceOf[msg.sender] - amount;
             stakingToken.transfer(msg.sender, amount);
             emit Withdrawn(msg.sender, amount);
        }
        //earnedとは、報酬を取得する関数です。
        function earned(address account) public view returns (uint) {
             return
                 (balanceOf[account] *
                     (rewardPerToken() - userRewardPerTokenPaid[account])) /
                 1e18 +
                 rewards[account];
        }
        //getRewardとは、報酬を受け取る関数です。
        function getReward() public updateReward(msg.sender) {
             uint reward = earned(msg.sender);
             if (reward > 0) {
                 rewards[msg.sender] = 0;
                 rewardsToken.transfer(msg.sender, reward);
                 emit RewardPaid(msg.sender, reward);
             }
        }
        //setRewardDurationとは、報酬を支払う期間を設定する関数です。
        function setRewardDuration(uint _duration) public onlyOwner {
             duration = _duration;
             emit RewardDurationUpdated(duration);
        }
        //notifyRewardAmountとは、報酬を設定する関数です。
        function notifyRewardAmount(uint reward)
             public
             onlyOwner
             updateReward(address(0))
        {
             if (block.timestamp >= finishAt) {
                 rewardRate = reward / duration;
             } else {
                 uint remaining = finishAt - block.timestamp;
                 uint leftover = remaining * rewardRate;
                 rewardRate = (reward + leftover) / duration;
             }
             updatedAt = block.timestamp;
             finishAt = block.timestamp + duration;
             emit RewardAdded(reward);
        }
        //_mintとは、トークンを発行する関数です。
        function _mint(address account, uint amount) internal {
             require(account != address(0), "ERC20: mint to the zero address");
             totalSupply = totalSupply + amount;
             balanceOf[account] = balanceOf[account] + amount;
             emit Transfer(address(0), account, amount);
        }
        
}

//IERC20とは、ERC20トークンのインターフェースです。
interface IERC20 {
    //totalSupplyとは、トークンの総発行量を取得する関数です。
    function totalSupply() external view returns (uint256);
    //balanceOfとは、指定したアドレスの残高を取得する関数です。
    function balanceOf(address account) external view returns (uint256);
    //transferとは、指定したアドレスにトークンを送金する関数です。
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
    //allowanceとは、指定したアドレスが送金できる残高を取得する関数です。
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);
    //approveとは、指定したアドレスにトークンを送金できる残高を設定する関数です。
    function approve(address spender, uint256 amount) external returns (bool);
    //transferFromとは、指定したアドレスからトークンを送金する関数です。
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    //eventとは、イベントを発行する関数です。
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    
}