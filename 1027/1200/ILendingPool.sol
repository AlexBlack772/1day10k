pragma solidity ^0.6.0;


interface ILendingPool {
   //addressProviderとは
   function addressesProvider () external view returns ( address );
   //depositとは、ユーザーがトークンをデポジットする関数
   function deposit ( address _reserve, uint256 _amount, uint16 _referralCode ) external payable;
   //redeeemUnderlyingとは、ユーザーがトークンをレディームする関数
   //レディームとは、トークンを元に戻すこと
   function redeemUnderlying ( address _reserve, address _user, uint256 _amount, uint256 _aTokenBalanceAfterRedeem ) external;
   //borrowとは、ユーザーがトークンを借りる関数
   function borrow ( address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode ) external;
   //repayとは、ユーザーがトークンを返済する関数
   function repay ( address _reserve, uint256 _amount, address _onBehalfOf ) external payable;
   //swapBorrowRateModeとは、ユーザーが借りたトークンのレートモードを変更する関数
   function swapBorrowRateMode ( address _reserve, uint256 _rateMode ) external;
   //rebalanceFixedBorrowRateとは、ユーザーが固定レートで借りたトークンのレートを再平衡する関数
   function rebalanceFixedBorrowRate ( address _reserve, address _user ) external;
   //setUserUseReserveAsCollateralとは、ユーザーがトークンをコラテラルとして使用するかどうかを設定する関数
   function setUserUseReserveAsCollateral ( address _reserve, bool _useAsCollateral ) external;
   //liquidationCallとは、ユーザーがコラテラルを使用して他のユーザーの貸付を強制的に返済する関数
   //コラテラルとは、借りた金額を保証するために使用するもの
   function liquidationCall ( address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken ) external payable;
   //flashLoanとは、ユーザーがトークンをフラッシュローンする関数
   function flashLoan ( address _receiver, address _reserve, uint256 _amount, bytes calldata _params ) external;
   //getReserveConfigurationDataとは、トークンの設定情報を取得する関数
   function getReserveConfigurationData ( address _reserve ) external view returns ( uint256 ltv, uint256 liquidationThreshold, uint256 liquidationBonus, address interestRateStrategyAddress, bool usageAsCollateralEnabled, bool borrowingEnabled, bool stableBorrowRateEnabled, bool isActive, bool isFrozen );
   //getReserveDataとは、トークンのデータを取得する関数
   function getReserveData ( address _reserve ) external view returns ( uint256 totalLiquidity, uint256 availableLiquidity, uint256 totalBorrowsStable, uint256 totalBorrowsVariable, uint256 liquidityRate, uint256 variableBorrowRate, uint256 stableBorrowRate, uint256 averageStableBorrowRate, uint256 utilizationRate, uint256 liquidityIndex, uint256 variableBorrowIndex, address aTokenAddress, uint40 lastUpdateTimestamp );
   //getUserAccountDataとは、ユーザーのアカウントデータを取得する関数
   function getUserAccountData ( address _user ) external view returns ( uint256 totalLiquidityETH, uint256 totalCollateralETH, uint256 totalBorrowsETH, uint256 totalFeesETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor );
   //getReservesとは、トークンのリストを取得する関数
   function getReserves () external view returns ( address[] memory );
   

}