pragma solidity ^0.5.0;

contract ICEther {
   //mintとは、発行すること
   function mint() external payable;
   //redeemとは、返すこと
   function redeem(uint256 redeemTokens) external;
   //redeemUnderlyingとは、返すこと
   function redeemUnderlying(uint256 redeemAmount) external;
   //borrowとは、借りること
   function borrow(uint256 borrowAmount) external;
   //repayBorrowとは、返すこと
   function repayBorrow() external payable;
   //repayBorrowBehalfとは、返すこと
   function repayBorrowBehalf(address borrower) external payable;
   //liquidateBorrowとは、債務不履行のユーザーを処理すること
   function liquidateBorrow(address borrower, uint256 repayAmount, address cTokenCollateral) external payable;
   //borrowBalanceCurrentとは、現在の借りた金額を取得すること
   


}