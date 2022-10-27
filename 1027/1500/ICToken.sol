pragma solidity ^0.6.0;

interface ICToken {
   //mintとは、ミントする
   function mint(uint256 mintAmount) external returns (uint256);
   //redeemとは、リデームする
   //リデームとは、返還する
   function redeem(uint256 redeemTokens) external returns (uint256);
   //redeemUnderlyingとは、アンダーリングをリデームする
   function redeemUnderlying(uint256 redeemAmount) external returns (uint256);
   //borrowとは、借りる
   function borrow(uint256 borrowAmount) external returns (uint256);
   //repayBorrowとは、借りを返す
   function repayBorrow(uint256 repayAmount) external returns (uint256);
   //repayBorrowBehalfとは、代わりに借りを返す
   function repayBorrowBehalf(address borrower, uint256 repayAmount) external returns (uint256);
   //exchangeRateCurrentとは、現在の交換レートを取得する
   function exchangeRateCurrent() external returns (uint256);
   //borrowBalanceStoredとは、ストアされた借りのバランスを取得する
   function borrowBalanceStored(address account) external view returns (uint256);
   //borrowBalanceCurrentとは、現在の借りのバランスを取得する
   function borrowBalanceCurrent(address account) external returns (uint256);
   //bakanceOfUnderlyingとは、アンダーリングのバランスを取得する
   function balanceOfUnderlying(address account) external returns (uint256);
   //getAccountSnapshotとは、アカウントのスナップショットを取得する
   function getAccountSnapshot(address account) external view returns (uint256, uint256, uint256, uint256);
   

}