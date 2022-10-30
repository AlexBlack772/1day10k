pragma solidity ^0.5.0;

//ICEtherとは、Etherを保管するコントラクト
contract ICEther {
   //mintとは、Etherを保管する関数
   function mint() external payable;
   //redeemとは、Etherを取り出す関数
   function redeem(uint redeemTokens) external returns (uint);
   //redeemUnderlyingとは、Etherを取り出す関数
   function redeemUnderlying(uint redeemAmount) external returns (uint);
   //borrowとは、Etherを借りる関数
   function borrow(uint borrowAmount) external returns (uint);
   //repayBorrowとは、Etherを返済する関数
   function repayBorrow() external payable;
   //repayBorrowBehalfとは、Etherを返済する関数
   function repayBorrowBehalf(address borrower) external payable;
   //liquidateBorrowとは、Etherを返済する関数
   function liquidateBorrow(address borrower, address cTokenCollateral)
      external
      payable;
   //exchangeRateCurrentとは、Etherのレートを取得する関数
   function exchangeRateCurrent() external returns (uint);
   //exchangeRateStoredとは、Etherのレートを取得する関数
   function exchangeRateStored() external view returns (uint);
   //repayBorrowAllowedとは、Etherを返済する関数
   function repayBorrowAllowed(address borrower, uint repayAmount)
      external
      returns (uint);

   //liquidateBorrowAllowedとは、Etherを返済する関数
   function liquidateBorrowAllowed(
      address borrower,
      address cTokenCollateral,
      uint repayAmount
   ) external returns (uint);
   //borrowBalanceCurrentとは、Etherの残高を取得する関数
   function borrowBalanceCurrent(address account) external returns (uint);
   //borrowBalanceStoredとは、Etherの残高を取得する関数
   function borrowBalanceStored(address account) external view returns (uint);
   //balanceOfUnderlyingとは、Etherの残高を取得する関数
   function balanceOfUnderlying(address owner) external returns (uint);
   //getAccountSnapshotとは、Etherの残高を取得する関数
   function getAccountSnapshot(address account)
      external
      view
      returns (
         uint,
         uint,
         uint,
         uint
      );
       
}