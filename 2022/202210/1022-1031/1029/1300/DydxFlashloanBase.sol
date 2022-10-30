pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

//DydxFlashloanBaseとは、DydxのFlashloanを行うためのコントラクトです。
contract DydxFlashloanBase {
   //SafeMathとは、安全な数学演算を行うためのライブラリです。
   using SafeMath for uint256;

   //_getMarketIdFromTokenAddressとは、トークンアドレスからマーケットIDを取得するための関数です。
   function _getMarketIdFromTokenAddress(address tokenAddress) internal pure returns (uint256) {
      if (tokenAddress == address(0)) {
         return 0;
      } else if (tokenAddress == address(1)) {
         return 1;
      } 
      revert("Invalid token address");
   }

   //_getRepaymentAmountInternalとは、返済額を取得するための関数です。
   function _getRepaymentAmountInternal(uint256 amount) internal pure returns (uint256) {
      return amount.add(amount.div(10));
   }

   //_getAccountInfoとは、アカウント情報を取得するための関数です。
   function _getAccountInfo(ISoloMargin margin, address accountOwner) internal view returns (Account.Info memory) {
      return Account.Info({owner: accountOwner, number: margin.getAccountNumber(accountOwner)});
   }

   //_getWithdrawActionとは、引き出しアクションを取得するための関数です。
   function _getWithdrawAction(address tokenAddress, uint256 amount) internal pure returns (Actions.ActionArgs memory) {
      return Actions.ActionArgs({
         actionType: Actions.ActionType.Withdraw,
         accountId: 0,
         amount: Types.AssetAmount({
            sign: false,
            denomination: Types.AssetDenomination.Wei,
            ref: Types.AssetReference.Delta,
            value: amount
         }),
         primaryMarketId: _getMarketIdFromTokenAddress(tokenAddress),
         secondaryMarketId: 0,
         otherAddress: address(this),
         otherAccountId: 0,
         data: ""
      });
   }
   
   //_getCallActionとは、コールアクションを取得するための関数です。
   function _getCallAction(bytes memory data) internal pure returns (Actions.ActionArgs memory) {
      return Actions.ActionArgs({
         actionType: Actions.ActionType.Call,
         accountId: 0,
         amount: Types.AssetAmount({
            sign: false,
            denomination: Types.AssetDenomination.Wei,
            ref: Types.AssetReference.Delta,
            value: 0
         }),
         primaryMarketId: 0,
         secondaryMarketId: 0,
         otherAddress: address(this),
         otherAccountId: 0,
         data: data
      });
   }

   //_getDepositActionとは、デポジットアクションを取得するための関数です。
   function _getDepositAction(address tokenAddress, uint256 amount) internal pure returns (Actions.ActionArgs memory) {
      return Actions.ActionArgs({
         actionType: Actions.ActionType.Deposit,
         accountId: 0,
         amount: Types.AssetAmount({
            sign: true,
            denomination: Types.AssetDenomination.Wei,
            ref: Types.AssetReference.Delta,
            value: amount
         }),
         primaryMarketId: _getMarketIdFromTokenAddress(tokenAddress),
         secondaryMarketId: 0,
         otherAddress: address(this),
         otherAccountId: 0,
         data: ""
      });
   }
   

}