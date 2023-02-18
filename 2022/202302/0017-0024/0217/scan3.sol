// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.7.5;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

/**
 * @dev This contract allows for non-custodial Gitcoin Grants match payouts. It works as follows:
 *  1. During a matching round, deploy a new instance of this contract
 *  2. Once the round is complete, Gitcoin computes the final match amounts earned by each grant
 *  3. Over the course of multiple transactions, the contract owner will set the payout mapping
 *     stored in the `payouts` variable. This maps each grant receiving address to the match amount
 *     owed, in DAI
 *  4. Once this mapping has been set for each grant, the contract owner calls `finalize()`. This
 *     sets `finalized` to `true`, and at this point the payout mapping can no longer be updated.
 *  5. Funders review the payout mapping, and if they approve they transfer their funds to this
 *     contract. This can be done with an ordinary transfer to this contract address.
 *  6. Once all funds have been transferred, the contract owner calls `enablePayouts` which lets
 *     grant owners withdraw their match payments
 *  6. Grant owners can now call `withdraw()` to have their match payout sent to their address.
 *     Anyone can call this method on behalf of a grant owner, which is useful if your Gitcoin
 *     grants address cannot call contract methods.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *        WARNING: DO NOT SEND ANYTHING EXCEPT FOR DAI TO THIS CONTRACT OR IT WILL BE LOST!        *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
contract MatchPayouts {
  using SafeERC20 for IERC20;

  // ======================================= STATE VARIABLES =======================================

  /// @dev Address that can modify contract state
  address public immutable owner;

  /// @dev Address where funding comes from (Gitcoin Grants multisig)
  address public immutable funder;

  /// @dev Token used for match payouts
  IERC20 public immutable dai;

  /// @dev Convenience type used for setting inputs
  struct PayoutFields {
    address recipient; // grant receiving address
    uint256 amount; // match amount for that grant
  }

  /// @dev Maps a grant's receiving address their match amount
  mapping(address => uint256) public payouts;

  /// @dev `Waiting` for payment mapping to be set, then mapping is `Finalized`, and lastly the
  /// contract is `Funded`
  enum State {Waiting, Finalized, Funded}
  State public state = State.Waiting;

  // =========================================== EVENTS ============================================

  /// @dev Emitted when state is set to `Finalized`
  event Finalized();

  /// @dev Emitted when state is set to `Funded`
  event Funded();

  /// @dev Emitted when the funder reclaims the funds in this contract
  event FundingWithdrawn(IERC20 token, uint256 amount);

  /// @dev Emitted when a payout `amount` is added to the `recipient`'s payout total
  event PayoutAdded(address recipient, uint256 amount);

  /// @dev Emitted when a `recipient` withdraws their payout
  event PayoutClaimed(address recipient, uint256 amount);

  // ================================== CONSTRUCTOR AND MODIFIERS ==================================

  /**
   * @param _owner Address of contract owner
   * @param _funder Address of funder
   * @param _dai DAI address
   */
  constructor(address _owner, address _funder, IERC20 _dai) {
    owner = _owner;
    funder = _funder;
    dai = _dai;
  }

  /// @dev Requires caller to be the owner
  modifier onlyOwner() {
    require(msg.sender == owner, "MatchPayouts: caller is not the owner");
    _;
  }

  /// @dev Prevents method from being called unless contract is in the specified state
  modifier requireState(State _state) {
    require(state == _state, "MatchPayouts: Not in required state");
    _;
  }

  // ======================================= PRIMARY METHODS =======================================
  // Functions are laid out in the order they will be called over the lifetime of the contract

  /**
   * @notice Set's the mapping of addresses to their match amount
   * @dev This will need to be called multiple times to prevent exceeding the block gas limit, based
   * on the number of grants`
   * @param _payouts Array of `Payout`s to set
   */
  function setPayouts(PayoutFields[] calldata _payouts) external onlyOwner requireState(State.Waiting) {
    // Set each payout amount. We allow amount to be overriden in subsequent calls because this lets
    // us fix mistakes before finalizing the payout mapping
    for (uint256 i = 0; i < _payouts.length; i += 1) {
      payouts[_payouts[i].recipient] = _payouts[i].amount;
      emit PayoutAdded(_payouts[i].recipient, _payouts[i].amount);
    }
  }

  /**
   * @notice Called by the owner to signal that the payout mapping is finalized
   * @dev Once called, this cannot be reversed!
   * @dev We use an explicit method here instead of doing this as part of the `setPayouts()` method
   * to reduce the chance of accidentally setting this flag
   */
  function finalize() external onlyOwner requireState(State.Waiting) {
    state = State.Finalized;
    emit Finalized();
  }

  /**
   * @notice Enables funder to withdraw all funds
   * @dev Escape hatch, intended to be used if the payout mapping is finalized incorrectly. In this
   * case a new MatchPayouts contract can be deployed and that one will be used instead
   * @dev We trust the funder, which is why they are allowed to withdraw funds at any time
   * @param _token Address of token to withdraw from this contract
   */
  function withdrawFunding(IERC20 _token) external {
    require(msg.sender == funder, "MatchPayouts: caller is not the funder");
    uint256 _balance = _token.balanceOf(address(this));
    _token.safeTransfer(funder, _balance);
    emit FundingWithdrawn(_token, _balance);
  }

  /**
   * @notice Called by the owner to enable withdrawals of match payouts
   * @dev Once called, this cannot be reversed!
   */
  function enablePayouts() external onlyOwner requireState(State.Finalized) {
    state = State.Funded;
    emit Funded();
  }

  /**
   * @notice Withdraws funds owed to `_recipient`
   * @param _recipient Address to withdraw for
   */
  function claimMatchPayout(address _recipient) external requireState(State.Funded) {
    uint256 _amount = payouts[_recipient]; // save off amount owed
    payouts[_recipient] = 0; // clear storage to mitigate reentrancy (not likely anyway since we trust Dai)
    dai.safeTransfer(_recipient, _amount);
    emit PayoutClaimed(_recipient, _amount);
  }
}

// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.7.5;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

/**
 * @dev This contract allows for non-custodial Gitcoin Grants match payouts. It works as follows:
 *  1. During a matching round, deploy a new instance of this contract
 *  2. Once the round is complete, Gitcoin computes the final match amounts earned by each grant
 *  3. Over the course of multiple transactions, the contract owner will set the payout mapping
 *     stored in the `payouts` variable. This maps each grant receiving address to the match amount
 *     owed, in DAI
 *  4. Once this mapping has been set for each grant, the contract owner calls `finalize()`. This
 *     sets `finalized` to `true`, and at this point the payout mapping can no longer be updated.
 *  5. Funders review the payout mapping, and if they approve they transfer their funds to this
 *     contract. This can be done with an ordinary transfer to this contract address.
 *  6. Once all funds have been transferred, the contract owner calls `enablePayouts` which lets
 *     grant owners withdraw their match payments
 *  6. Grant owners can now call `withdraw()` to have their match payout sent to their address.
 *     Anyone can call this method on behalf of a grant owner, which is useful if your Gitcoin
 *     grants address cannot call contract methods.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *        WARNING: DO NOT SEND ANYTHING EXCEPT FOR DAI TO THIS CONTRACT OR IT WILL BE LOST!        *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
contract MatchPayouts {
  using SafeERC20 for IERC20;

  // ======================================= STATE VARIABLES =======================================

  /// @dev Address that can modify contract state
  address public immutable owner;

  /// @dev Address where funding comes from (Gitcoin Grants multisig)
  address public immutable funder;

  /// @dev Token used for match payouts
  IERC20 public immutable dai;

  /// @dev Convenience type used for setting inputs
  struct PayoutFields {
    address recipient; // grant receiving address
    uint256 amount; // match amount for that grant
  }

  /// @dev Maps a grant's receiving address their match amount
  mapping(address => uint256) public payouts;

  /// @dev `Waiting` for payment mapping to be set, then mapping is `Finalized`, and lastly the
  /// contract is `Funded`
  enum State {Waiting, Finalized, Funded}
  State public state = State.Waiting;

  // =========================================== EVENTS ============================================

  /// @dev Emitted when state is set to `Finalized`
  event Finalized();

  /// @dev Emitted when state is set to `Funded`
  event Funded();

  /// @dev Emitted when the funder reclaims the funds in this contract
  event FundingWithdrawn(IERC20 token, uint256 amount);

  /// @dev Emitted when a payout `amount` is added to the `recipient`'s payout total
  event PayoutAdded(address recipient, uint256 amount);

  /// @dev Emitted when a `recipient` withdraws their payout
  event PayoutClaimed(address recipient, uint256 amount);

  // ================================== CONSTRUCTOR AND MODIFIERS ==================================

  /**
   * @param _owner Address of contract owner
   * @param _funder Address of funder
   * @param _dai DAI address
   */
  constructor(address _owner, address _funder, IERC20 _dai) {
    owner = _owner;
    funder = _funder;
    dai = _dai;
  }

  /// @dev Requires caller to be the owner
  modifier onlyOwner() {
    require(msg.sender == owner, "MatchPayouts: caller is not the owner");
    _;
  }

  /// @dev Prevents method from being called unless contract is in the specified state
  modifier requireState(State _state) {
    require(state == _state, "MatchPayouts: Not in required state");
    _;
  }

  // ======================================= PRIMARY METHODS =======================================
  // Functions are laid out in the order they will be called over the lifetime of the contract

  /**
   * @notice Set's the mapping of addresses to their match amount
   * @dev This will need to be called multiple times to prevent exceeding the block gas limit, based
   * on the number of grants`
   * @param _payouts Array of `Payout`s to set
   */
  function setPayouts(PayoutFields[] calldata _payouts) external onlyOwner requireState(State.Waiting) {
    // Set each payout amount. We allow amount to be overriden in subsequent calls because this lets
    // us fix mistakes before finalizing the payout mapping
    for (uint256 i = 0; i < _payouts.length; i += 1) {
      payouts[_payouts[i].recipient] = _payouts[i].amount;
      emit PayoutAdded(_payouts[i].recipient, _payouts[i].amount);
    }
  }

  /**
   * @notice Called by the owner to signal that the payout mapping is finalized
   * @dev Once called, this cannot be reversed!
   * @dev We use an explicit method here instead of doing this as part of the `setPayouts()` method
   * to reduce the chance of accidentally setting this flag
   */
  function finalize() external onlyOwner requireState(State.Waiting) {
    state = State.Finalized;
    emit Finalized();
  }

  /**
   * @notice Enables funder to withdraw all funds
   * @dev Escape hatch, intended to be used if the payout mapping is finalized incorrectly. In this
   * case a new MatchPayouts contract can be deployed and that one will be used instead
   * @dev We trust the funder, which is why they are allowed to withdraw funds at any time
   * @param _token Address of token to withdraw from this contract
   */
  function withdrawFunding(IERC20 _token) external {
    require(msg.sender == funder, "MatchPayouts: caller is not the funder");
    uint256 _balance = _token.balanceOf(address(this));
    _token.safeTransfer(funder, _balance);
    emit FundingWithdrawn(_token, _balance);
  }

  /**
   * @notice Called by the owner to enable withdrawals of match payouts
   * @dev Once called, this cannot be reversed!
   */
  function enablePayouts() external onlyOwner requireState(State.Finalized) {
    state = State.Funded;
    emit Funded();
  }

  /**
   * @notice Withdraws funds owed to `_recipient`
   * @param _recipient Address to withdraw for
   */
  function claimMatchPayout(address _recipient) external requireState(State.Funded) {
    uint256 _amount = payouts[_recipient]; // save off amount owed
    payouts[_recipient] = 0; // clear storage to mitigate reentrancy (not likely anyway since we trust Dai)
    dai.safeTransfer(_recipient, _amount);
    emit PayoutClaimed(_recipient, _amount);
  }
}

//
pragma solidity 0.4.18;


import "./FeeBurnerInterface.sol";
import "./Withdrawable.sol";
import "./Utils3.sol";
import "./KyberNetworkInterface.sol";


interface BurnableToken {
    function transferFrom(address _from, address _to, uint _value) public returns (bool);
    function burnFrom(address _from, uint256 _value) public returns (bool);
}


contract FeeBurner is Withdrawable, FeeBurnerInterface, Utils3 {

    mapping(address=>uint) public reserveFeesInBps;
    mapping(address=>address) public reserveKNCWallet; //wallet holding knc per reserve. from here burn and send fees.
    mapping(address=>uint) public walletFeesInBps; // wallet that is the source of tx is entitled so some fees.
    mapping(address=>uint) public reserveFeeToBurn;
    mapping(address=>uint) public feePayedPerReserve; // track burned fees and sent wallet fees per reserve.
    mapping(address=>mapping(address=>uint)) public reserveFeeToWallet;
    address public taxWallet;
    uint public taxFeeBps = 0; // burned fees are taxed. % out of burned fees.

    BurnableToken public knc;
    KyberNetworkInterface public kyberNetwork;
    uint public kncPerEthRatePrecision = 600 * PRECISION; //--> 1 ether = 600 knc tokens

    function FeeBurner(
        address _admin,
        BurnableToken _kncToken,
        KyberNetworkInterface _kyberNetwork,
        uint _initialKncToEthRatePrecision
    )
        public
    {
        require(_admin != address(0));
        require(_kncToken != address(0));
        require(_kyberNetwork != address(0));
        require(_initialKncToEthRatePrecision != 0);

        kyberNetwork = _kyberNetwork;
        admin = _admin;
        knc = _kncToken;
        kncPerEthRatePrecision = _initialKncToEthRatePrecision;
    }

    event ReserveDataSet(address reserve, uint feeInBps, address kncWallet);

    function setReserveData(address reserve, uint feesInBps, address kncWallet) public onlyOperator {
        require(feesInBps < 100); // make sure it is always < 1%
        require(kncWallet != address(0));
        reserveFeesInBps[reserve] = feesInBps;
        reserveKNCWallet[reserve] = kncWallet;
        ReserveDataSet(reserve, feesInBps, kncWallet);
    }

    event WalletFeesSet(address wallet, uint feesInBps);

    function setWalletFees(address wallet, uint feesInBps) public onlyAdmin {
        require(feesInBps < 10000); // under 100%
        walletFeesInBps[wallet] = feesInBps;
        WalletFeesSet(wallet, feesInBps);
    }

    event TaxFeesSet(uint feesInBps);

    function setTaxInBps(uint _taxFeeBps) public onlyAdmin {
        require(_taxFeeBps < 10000); // under 100%
        taxFeeBps = _taxFeeBps;
        TaxFeesSet(_taxFeeBps);
    }

    event TaxWalletSet(address taxWallet);

    function setTaxWallet(address _taxWallet) public onlyAdmin {
        require(_taxWallet != address(0));
        taxWallet = _taxWallet;
        TaxWalletSet(_taxWallet);
    }

    event KNCRateSet(uint ethToKncRatePrecision, uint kyberEthKnc, uint kyberKncEth, address updater);

    function setKNCRate() public {
        //query kyber for knc rate sell and buy
        uint kyberEthKncRate;
        uint kyberKncEthRate;
        (kyberEthKncRate, ) = kyberNetwork.getExpectedRate(ETH_TOKEN_ADDRESS, ERC20(knc), (10 ** 18));
        (kyberKncEthRate, ) = kyberNetwork.getExpectedRate(ERC20(knc), ETH_TOKEN_ADDRESS, (10 ** 18));

        //check "reasonable" spread == diff not too big. rate wasn't tampered.
        require(kyberEthKncRate * kyberKncEthRate < PRECISION ** 2 * 2);
        require(kyberEthKncRate * kyberKncEthRate > PRECISION ** 2 / 2);

        require(kyberEthKncRate <= MAX_RATE);
        kncPerEthRatePrecision = kyberEthKncRate;
        KNCRateSet(kncPerEthRatePrecision, kyberEthKncRate, kyberKncEthRate, msg.sender);
    }

    event AssignFeeToWallet(address reserve, address wallet, uint walletFee);
    event AssignBurnFees(address reserve, uint burnFee);

    function handleFees(uint tradeWeiAmount, address reserve, address wallet) public returns(bool) {
        require(msg.sender == address(kyberNetwork));
        require(tradeWeiAmount <= MAX_QTY);

        // MAX_DECIMALS = 18 = KNC_DECIMALS, use this value instead of calling getDecimals() to save gas
        uint kncAmount = calcDestAmountWithDecimals(ETH_DECIMALS, MAX_DECIMALS, tradeWeiAmount, kncPerEthRatePrecision);
        uint fee = kncAmount * reserveFeesInBps[reserve] / 10000;

        uint walletFee = fee * walletFeesInBps[wallet] / 10000;
        require(fee >= walletFee);
        uint feeToBurn = fee - walletFee;

        if (walletFee > 0) {
            reserveFeeToWallet[reserve][wallet] += walletFee;
            AssignFeeToWallet(reserve, wallet, walletFee);
        }

        if (feeToBurn > 0) {
            AssignBurnFees(reserve, feeToBurn);
            reserveFeeToBurn[reserve] += feeToBurn;
        }

        return true;
    }

    event BurnAssignedFees(address indexed reserve, address sender, uint quantity);

    event SendTaxFee(address indexed reserve, address sender, address taxWallet, uint quantity);

    // this function is callable by anyone
    function burnReserveFees(address reserve) public {
        uint burnAmount = reserveFeeToBurn[reserve];
        uint taxToSend = 0;
        require(burnAmount > 2);
        reserveFeeToBurn[reserve] = 1; // leave 1 twei to avoid spikes in gas fee
        if (taxWallet != address(0) && taxFeeBps != 0) {
            taxToSend = (burnAmount - 1) * taxFeeBps / 10000;
            require(burnAmount - 1 > taxToSend);
            burnAmount -= taxToSend;
            if (taxToSend > 0) {
                require(knc.transferFrom(reserveKNCWallet[reserve], taxWallet, taxToSend));
                SendTaxFee(reserve, msg.sender, taxWallet, taxToSend);
            }
        }
        require(knc.burnFrom(reserveKNCWallet[reserve], burnAmount - 1));

        //update reserve "payments" so far
        feePayedPerReserve[reserve] += (taxToSend + burnAmount - 1);

        BurnAssignedFees(reserve, msg.sender, (burnAmount - 1));
    }

    event SendWalletFees(address indexed wallet, address reserve, address sender);

    // this function is callable by anyone
    function sendFeeToWallet(address wallet, address reserve) public {
        uint feeAmount = reserveFeeToWallet[reserve][wallet];
        require(feeAmount > 1);
        reserveFeeToWallet[reserve][wallet] = 1; // leave 1 twei to avoid spikes in gas fee
        require(knc.transferFrom(reserveKNCWallet[reserve], wallet, feeAmount - 1));

        feePayedPerReserve[reserve] += (feeAmount - 1);
        SendWalletFees(wallet, reserve, msg.sender);
    }
}

//
