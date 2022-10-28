pragma solidity ^0.6.0;

interface ILendingPool {
   //addressesProviderとは、アドレスプロバイダーを取得する
   function addressesProvider() external view returns (address);
   //depositとは、デポジットする
   function deposit(address _reserve, uint256 _amount, uint16 _referralCode) external payable;
   //redeemUnderlyingとは、レディムアンダーリングする
   function redeemUnderlying(address _reserve, address _user, uint256 _amount, uint256 _aTokenBalanceAfterRedeem) external;
   //borrowとは、ブローする
   function borrow(address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode) external;
   //repayとは、レペイする
   function repay(address _reserve, uint256 _amount, address _onBehalfOf) external payable;
   //swapBorrowRateModeとは、スワップブローレートモードする
   function swapBorrowRateMode(address _reserve) external;
   //rebalanceFixedBorrowRateとは、固定ブローレートを再平衡する
   function rebalanceFixedBorrowRate(address _reserve, address _user) external;
   //setUserUseReserveAsCollateralとは、ユーザーがリザーブをコレタルとして使用するかどうかを設定する
   function setUserUseReserveAsCollateral(address _reserve, bool _useAsCollateral) external;
   //liquidationCallとは、リキッドエーションコールする
   function liquidationCall(address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken) external payable;
   //flashLoanとは、フラッシュローンする
   function flashLoan(address _receiver, address _reserve, uint256 _amount, bytes calldata _params) external;
   //getReserveConfigurationDataとは、リザーブの設定データを取得する
   function getReserveConfigurationData(address _reserve) external view returns (
       uint256 ltv,
       uint256 liquidationThreshold,
       uint256 liquidationBonus,
       address interestRateStrategyAddress,
       bool usageAsCollateralEnabled,
       bool borrowingEnabled,
       bool stableBorrowRateEnabled,
       bool isActive
   );
   //getReserveDataとは、リザーブデータを取得する
   function getReserveData(address _reserve) external view returns (
       uint256 totalLiquidity,
       uint256 availableLiquidity,
       uint256 totalBorrowsStable,
       uint256 totalBorrowsVariable,
       uint256 liquidityRate,
       uint256 variableBorrowRate,
       uint256 stableBorrowRate,
       uint256 averageStableBorrowRate,
       uint256 utilizationRate,
       uint256 liquidityIndex,
       uint256 variableBorrowIndex,
       address aTokenAddress,
       uint40 lastUpdateTimestamp
   );
   //getUserAccountDataとは、ユーザーアカウントデータを取得する
   function getUserAccountData(address _user) external view returns (
       uint256 totalLiquidityETH,
       uint256 totalCollateralETH,
       uint256 totalBorrowsETH,
       uint256 totalFeesETH,
       uint256 availableBorrowsETH,
       uint256 currentLiquidationThreshold,
       uint256 ltv,
       uint256 healthFactor
   );
   //getUserReserveDataとは、ユーザーリザーブデータを取得する
   function getUserReserveData(address _reserve, address _user) external view returns (
       uint256 currentATokenBalance,
       uint256 currentBorrowBalance,
       uint256 principalBorrowBalance,
       uint256 borrowRateMode,
       uint256 borrowRate,
       uint256 liquidityRate,
       uint256 originationFee,
       uint256 variableBorrowIndex,
       uint256 lastUpdateTimestamp,
       bool usageAsCollateralEnabled
   );
   //getReservesとは、リザーブを取得する
   function getReserves() external view returns (address[] memory);
   
}