pragma solidity ^0.6.0;

contract ICEther {
   //mintとは、ミントする
   function mint() external payable;
   //redeemとは、レデムする
   function redeem(uint redeemTokens) external returns (uint);
   //redeemUnderlyingとは、レデムする
   function redeemUnderlying(uint redeemAmount) external returns (uint);
   //borrowとは、借りる
   function borrow(uint borrowAmount) external returns (uint);
   //repayBorrowとは、返済する
   function repayBorrow() external payable;
   //repayBorrowBehalfとは、代わりに返済する
   function repayBorrowBehalf(address borrower) external payable;
   //borrowBalanceCurrentとは、現在の借入残高を取得する
   function borrowBalanceCurrent(address account) external returns (uint);
   //borrowBalanceStoredとは、借入残高を取得する
   function borrowBalanceStored(address account) external view returns (uint);
   //balanceOfUnderlyingとは、残高を取得する
   function balanceOfUnderlying(address owner) external returns (uint);
   //balanceOfとは、残高を取得する
   function balanceOf(address owner) external view returns (uint);
   //getAccountSnapshotとは、アカウントのスナップショットを取得する
   function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint);
   
}