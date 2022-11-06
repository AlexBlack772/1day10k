pragma solidity ^0.5.0;

interface ILendingPool {
   //depositとは、借りること
   function deposit(address _reserve, uint256 _amount, uint16 _referralCode) external payable;
   //withdrawとは、返すこと
   function withdraw(address _reserve, uint256 _amount, address _to) external;
   //borrowとは、借りること
   function borrow(address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode, address _onBehalfOf) external;
   //repayとは、返すこと
   function repay(address _reserve, uint256 _amount, uint256 _rateMode, address _onBehalfOf) external payable;
   //flashLoanとは、短期的に借りること
   function flashLoan(address _receiver, address _reserve, uint256 _amount, bytes calldata _params) external;
   //redeemUnderlyingとは、返すこと
   function redeemUnderlying(address _reserve, address _user, uint256 _amount) external;
   //borrowRateModeとは、借りること
   function borrowRateMode(address _reserve, address _user) external view returns (uint256);
   //getUserAccountDataとは、ユーザーのアカウントデータを取得すること
   function getUserAccountData(address _user) external view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor);
   //liquidationCallとは、債務不履行のユーザーを処理すること
   function liquidationCall(address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken) external payable;
   //getReserveDataとは、リザーブデータを取得すること
   function getReserveData(address _reserve) external view returns (uint256 totalLiquidity, uint256 availableLiquidity, uint256 totalBorrowsStable, uint256 totalBorrowsVariable, uint256 liquidityRate, uint256 variableBorrowRate, uint256 stableBorrowRate, uint256 averageStableBorrowRate, uint256 utilizationRate, uint256 liquidityIndex, uint256 variableBorrowIndex, address aTokenAddress, uint40 lastUpdateTimestamp);
   //

}