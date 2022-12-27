pragma solidity ^0.6.0;

contract ICEther {
   //mintとは、ミントする
   function mint() external payable;
   //redeemとは、リデームする
   //リデームとは、返還する
   function redeem(uint256 redeemTokens) external;
   //redeemUnderlyingとは、アンダーリングをリデームする
   function redeemUnderlying(uint256 redeemAmount) external;
   //borrowとは、借りる
   function borrow(uint256 borrowAmount) external;
   //repayBorrowとは、借りを返す
   function repayBorrow() external payable;
   //repayBorrowBehalfとは、代わりに借りを返す
   function repayBorrowBehalf(address borrower) external payable;
   //borrowBalanceStoredとは、ストアされた借りのバランスを取得する
   function borrowBalanceStored(address account) external view returns (uint256);
   //borrowBalanceCurrentとは、現在の借りのバランスを取得する
   function borrowBalanceCurrent(address account) external returns (uint256);
   //bakanceOfUnderlyingとは、アンダーリングのバランスを取得する
   function balanceOfUnderlying(address account) external returns (uint256);
   //balanceOfとは、バランスを取得する
   function balanceOf(address owner) external view returns (uint256);
   //getAccountSnapshotとは、アカウントのスナップショットを取得する
   function getAccountSnapshot(address account) external view returns (uint256, uint256, uint256, uint256);
   

}