pragma solidity ^0.8.10;

//ICTokenとは、iTokenのインターフェースです。
interface ICToken {
   //mintとは、iTokenを発行するための関数です。
   function mint(uint256 mintAmount) external returns (uint256);
   //redeemとは、iTokenを赤字するための関数です。
   function redeem(uint256 redeemTokens) external returns (uint256);
   //redeemUnderlyingとは、iTokenを赤字するための関数です。
   function redeemUnderlying(uint256 redeemAmount) external returns (uint256);
   //borrowとは、iTokenを借りるための関数です。
   function borrow(uint256 borrowAmount) external returns (uint256);
   //repayBorrowとは、iTokenを返済するための関数です。
   function repayBorrow(uint256 repayAmount) external returns (uint256);
   //repayBorrowBehalfとは、iTokenを返済するための関数です。
   function repayBorrowBehalf(address borrower, uint256 repayAmount) external returns (uint256);
   //liquidateBorrowとは、iTokenを返済するための関数です。
   function liquidateBorrow(address borrower, uint256 repayAmount, address cTokenCollateral) external returns (uint256);
   //exchangeRateCurrentとは、iTokenの交換レートを取得するための関数です。
   function exchangeRateCurrent() external returns (uint256);
   //exchangeRateStoredとは、iTokenの交換レートを取得するための関数です。
   function exchangeRateStored() external view returns (uint256);
   //balanceOfUnderlyingとは、iTokenの残高を取得するための関数です。
   function balanceOfUnderlying(address owner) external returns (uint256);
   //balanceOfとは、iTokenの残高を取得するための関数です。
   function balanceOf(address owner) external view returns (uint256);
   //borrowBalanceCurrentとは、iTokenの借りた残高を取得するための関数です。
   function borrowBalanceCurrent(address account) external returns (uint256);
   //borrowBalanceStoredとは、iTokenの借りた残高を取得するための関数です。
   
}