pragma solidity ^0.5.0;

//IComptrollerとは、IComptrollerのコントラクト
interface IComptroller{
   //isComptrollerとは、comptrollerかどうかを判定する関数
   function isComptroller() external view returns (bool);
   //enterMarketsとは、マーケットに参加する関数
   function enterMarkets(address[] calldata cTokens) external returns (uint[] memory);
   //exitMarketとは、マーケットから退出する関数
   function exitMarket(address cToken) external returns (uint);
   //getAssetsInとは、アセットを取得する関数
   function getAssetsIn(address account) external view returns (address[] memory);
   //getAccountLiquidityとは、アカウントの流動性を取得する関数
   function getAccountLiquidity(address account) external view returns (uint, uint, uint);
   //checkMembershipとは、メンバーかどうかを判定する関数
   function checkMembership(address account, address cToken) external view returns (bool);
   //mintAllowedとは、mintを許可する関数
   function mintAllowed(address cToken, address minter, uint mintAmount) external returns (uint);
   //mintVerifyとは、mintを検証する関数
   function mintVerify(address cToken, address minter, uint mintAmount, uint mintTokens) external;
   //redeemAllowedとは、redeemを許可する関数
   function redeemAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);
   //redeemVerifyとは、redeemを検証する関数
   function redeemVerify(address cToken, address redeemer, uint redeemAmount, uint redeemTokens) external;
   //borrowAllowedとは、borrowを許可する関数
   function borrowAllowed(address cToken, address borrower, uint borrowAmount) external returns (uint);
   //borrowVerifyとは、borrowを検証する関数
   function borrowVerify(address cToken, address borrower, uint borrowAmount) external;
   //repayBorrowAllowedとは、repayBorrowを許可する関数
   function repayBorrowAllowed(
      address cToken,
      address payer,
      address borrower,
      uint repayAmount) external returns (uint);
   //repayBorrowVerifyとは、repayBorrowを検証する関数
   function repayBorrowVerify(
      address cToken,
      address payer,
      address borrower,
      uint repayAmount,
      uint borrowerIndex) external;
   //liquidateBorrowAllowedとは、liquidateBorrowを許可する関数
   function liquidateBorrowAllowed(
      address cTokenBorrowed,
      address cTokenCollateral,
      address liquidator,
      address borrower,
      uint repayAmount) external returns (uint);
   //liquidateBorrowVerifyとは、liquidateBorrowを検証する関数
   function liquidateBorrowVerify(
      address cTokenBorrowed,
      address cTokenCollateral,
      address liquidator,
      address borrower,
      uint repayAmount,
      uint seizeTokens) external;
   //seizeAllowedとは、seizeを許可する関数
   function seizeAllowed(
      address cTokenCollateral,
      address cTokenBorrowed,
      address liquidator,
      address borrower,
      uint seizeTokens) external returns (uint);
   //seizeVerifyとは、seizeを検証する関数
   //seizeとは、強制的に借りたものを返すこと
   function seizeVerify(
      address cTokenCollateral,
      address cTokenBorrowed,
      address liquidator,
      address borrower,
      uint seizeTokens) external;
   //transferAllowedとは、transferを許可する関数
}