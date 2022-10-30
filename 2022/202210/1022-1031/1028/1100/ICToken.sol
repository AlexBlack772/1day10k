pragma solidity ^0.6.0;

interface ICToken {
   //mintとは、ミントする
   function mint(uint mintAmount) external returns (uint);
   //redeemとは、レデムする
   function redeem(uint redeemTokens) external returns (uint);
   //redeemUnderlyingとは、レデムする
   function redeemUnderlying(uint redeemAmount) external returns (uint);
   //borrowとは、借りる
   function borrow(uint borrowAmount) external returns (uint);
   //repayBorrowとは、返済する
   function repayBorrow(uint repayAmount) external returns (uint);
   //repayBorrowBehalfとは、代わりに返済する
   function repayBorrowBehalf(address borrower, uint repayAmount) external returns (uint);
   //exchangeRateCurrentとは、現在の交換レートを取得する
   function exchangeRateCurrent() external returns (uint);
   //borrowBalanceCurrentとは、現在の借入残高を取得する
   function borrowBalanceCurrent(address account) external returns (uint);
   //borrowBalanceStoredとは、借入残高を取得する
   function borrowBalanceStored(address account) external view returns (uint);
   //balanceOfUnderlyingとは、残高を取得する
   function balanceOfUnderlying(address owner) external returns (uint);
   //getAccountSnapshotとは、アカウントのスナップショットを取得する
   function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint);
   //underlyingとは、基本通貨を取得する
   function underlying() external view returns (address);
   //totalSupplyとは、総供給量を取得する
   function totalSupply() external view returns (uint);
   //balanceOfとは、残高を取得する
   function balanceOf(address owner) external view returns (uint);
   //allowanceとは、許可を取得する
   function allowance(address owner, address spender) external view returns (uint);
   //approveとは、許可する
   function approve(address spender, uint value) external returns (bool);
   //transferとは、送金する
   function transfer(address dst, uint value) external returns (bool);
   //transferFromとは、送金する
   function transferFrom(address src, address dst, uint value) external returns (bool);
   
}