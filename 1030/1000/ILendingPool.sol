pragma solidity ^0.5.0;

//ILendingPoolとは、LendingPoolのインターフェース
interface ILendingPool {
   //addressesProviderとは、LendingPoolのアドレス
   function addressesProvider() external view returns (address);
   //depositとは、Etherを保管する関数
   function deposit(
      address asset,
      uint256 amount,
      address onBehalfOf,
      uint16 referralCode
   ) external;
   //redeemUnderlyingとは、Etherを取り出す関数
   function redeemUnderlying(
      address asset,
      address user,
      uint256 amount,
      uint256 aTokenBalanceAfterRedeem
   ) external;
   //borrowとは、Etherを借りる関数
   function borrow(
      address asset,
      uint256 amount,
      uint256 interestRateMode,
      uint16 referralCode,
      address onBehalfOf
   ) external;
   //repayとは、Etherを返済する関数
   function repay(
      address asset,
      uint256 amount,
      uint256 rateMode,
      address onBehalfOf
   ) external;
   //swapBorrowRateModeとは、Etherのレートを変更する関数
   function swapBorrowRateMode(address asset, uint256 rateMode) external;
   //rebalanceFixedBorrowRateとは、Etherのレートを変更する関数
   function rebalanceFixedBorrowRate(address asset, address user)
      external
      returns (uint256);
   //setUserUseReserveAsCollateralとは、Etherを保管する関数
   function setUserUseReserveAsCollateral(address asset, bool useAsCollateral)
      external;
   //liquidationCallとは、Etherを返済する関数
   function liquidationCall(
      address collateralAsset,
      address debtAsset,
      address user,
      uint256 debtToCover,
      bool receiveAToken
   ) external payable;
   //flashLoanとは、Etherを借りる関数
   function flashLoan(
      address receiverAddress,
      address[] calldata assets,
      uint256[] calldata amounts,
      uint256[] calldata modes,
      address onBehalfOf,
      bytes calldata params,
      uint16 referralCode
   ) external;
   //getReserveDataとは、Etherの残高を取得する関数
   function getReserveData(address asset)
      external
      view
      returns (
         uint256,
         uint256,
         uint256,
         uint256,
         uint256,
         uint256,
         uint256,
         uint256,
         bool,
         bool,
         bool
      );
   //getUserAccountDataとは、Etherの残高を取得する関数
   function getUserAccountData(address user)
      external
      view
      returns (
         uint256,
         uint256,
         uint256,
         uint256,
         uint256,
         uint256,
         uint256,
         uint256
      );
   //getUserReserveDataとは、Etherの残高を取得する関数
   

}