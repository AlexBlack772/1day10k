pragma solidity ^0.8.13;

//experimentalとは、solidityのバージョンが安定していないときに使う
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ISoloMargin.sol";

contract DydxFlashloanBase {
    using SafeMath for uint256;

    function _getMarketIdFromTokenAddress(ISoloMargin solo, address token)
        internal
        view
        returns (uint256)
    {
        uint256 numMarkets = solo.getNumMarkets();
        for (uint256 i = 0; i < numMarkets; i++) {
            if (solo.getMarketTokenAddress(i) == token) {
                return i;
            }
        }
        revert("token not found");
    }

    function _getRepaymentAmountInternal(uint256 amount)
        internal
        pure
        returns (uint256)
    {
        return amount.add(2);
    }

    function _getAccountInfo() internal view returns (Account.Info memory) {
        return Account.Info({owner: address(this), number: 1});
    }

    function _getWithdrawAction(uint256 marketId, uint256 amount)
        internal
        pure
        returns (Actions.ActionArgs memory)
    {
        Actions.ActionType actionType = Actions.ActionType.Withdraw;
        Types.AssetAmount memory amount = Types.AssetAmount({
            sign: true,
            denomination: Types.AssetDenomination.Wei,
            ref: Types.AssetReference.Delta,
            value: amount
        });
        return
            Actions.ActionArgs({
                actionType: actionType,
                accountId: 0,
                amount: amount,
                primaryMarketId: marketId,
                secondaryMarketId: 0,
                otherAddress: address(this),
                otherAccountId: 0,
                data: ""
            });
    }

    function _getCallAction(
        bytes memory data,
        uint256 marketId,
        uint256 amount
    ) internal pure returns (Actions.ActionArgs memory) {
        Actions.ActionType actionType = Actions.ActionType.Call;
        Types.AssetAmount memory amount = Types.AssetAmount({
            sign: false,
            denomination: Types.AssetDenomination.Wei,
            ref: Types.AssetReference.Delta,
            value: amount
        });
        return
            Actions.ActionArgs({
                actionType: actionType,
                accountId: 0,
                amount: amount,
                primaryMarketId: marketId,
                secondaryMarketId: 0,
                otherAddress: address(this),
                otherAccountId: 0,
                data: data
            });
    }

    function _getDepositAction(uint256 marketId, uint256 amount)
        internal
        pure
        returns (Actions.ActionArgs memory)
    {
        Actions.ActionType actionType = Actions.ActionType.Deposit;
        Types.AssetAmount memory amount = Types.AssetAmount({
            sign: false,
            denomination: Types.AssetDenomination.Wei,
            ref: Types.AssetReference.Delta,
            value: amount
        });
        return
            Actions.ActionArgs({
                actionType: actionType,
                accountId: 0,
                amount: amount,
                primaryMarketId: marketId,
                secondaryMarketId: 0,
                otherAddress: address(this),
                otherAccountId: 0,
                data: ""
            });
    }
    