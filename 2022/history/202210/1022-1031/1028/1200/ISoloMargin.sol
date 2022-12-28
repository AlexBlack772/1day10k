pragma solidity ^0.5.0;

contract ISoloMargin {
   //OperatorArgとは、オペレーター引数
   struct OperatorArg {
      //ownerとは、所有者
      address payable owner;
      //operatorとは、オペレーター
      address payable operator;
      //trustedとは、信頼された
      bool trusted;
   }

   //ownerSetSpreadPremiumとは、オーナーがスプレッドプレミアムを設定する
   function ownerSetSpreadPremium(uint256 spreadPremium) external;
   //getIsGlobalOperatorとは、グローバルオペレーターかどうかを取得する
   function getIsGlobalOperator(address operator) external view returns (bool);
   //getMarketTokenAddressとは、マーケットトークンアドレスを取得する
   function getMarketTokenAddress(uint256 marketId) external view returns (address);
   //ownerSetInterestSetterとは、オーナーがインタレストセッターを設定する
   function ownerSetInterestSetter(uint256 marketId, address interestSetter) external;
   //getAccountValuesとは、アカウントの値を取得する
   function getAccountValues(address owner) external view returns (uint256, uint256);
   //getMarketPriceOracleとは、マーケット価格オラクルを取得する
   function getMarketPriceOracle(uint256 marketId) external view returns (address);
   //getMarketInterestSetterとは、マーケットインタレストセッターを取得する
   function getMarketInterestSetter(uint256 marketId) external view returns (address);
   //getMarketSpredPremiumとは、マーケットスプレッドプレミアムを取得する
   function getMarketSpreadPremium(uint256 marketId) external view returns (uint256);
   //getNumMarketsとは、マーケットの数を取得する
   function getNumMarkets() external view returns (uint256);
   //ownerWithdrawUnsupportedTokensとは、オーナーがサポートされていないトークンを引き出す
   function ownerWithdrawUnsupportedTokens(address token, address recipient) external;
   //ownerSetMinBorrowedValueとは、オーナーが最小借入値を設定する
   function ownerSetMinBorrowedValue(uint256 minBorrowedValue) external;
   //ownerSetLiquidationSpreadとは、オーナーがリキッドエーションスプレッドを設定する
   function ownerSetLiquidationSpread(uint256 liquidationSpread) external;
   //ownerSetEarningsRateとは、オーナーがイワリングレートを設定する
   function ownerSetEarningsRate(uint256 earningsRate) external;
   //getIsLocalOperatorとは、ローカルオペレーターかどうかを取得する
   function getIsLocalOperator(address owner, address operator) external view returns (bool);
   //getAccountParとは、アカウントのパーを取得する
   function getAccountPar(address owner, uint256 marketId) external view returns (int256);
   //ownerSetMarginPremiumとは、オーナーがマージンプレミアムを設定する
   function ownerSetMarginPremium(uint256 marginPremium) external;
   //getMarginRatioとは、マージンレシオを取得する
   function getMarginRatio(address owner, uint256 marketId) external view returns (uint256);
   //getMarketCurrentIndexとは、マーケットの現在のインデックスを取得する
   function getMarketCurrentIndex(uint256 marketId) external view returns (uint256);
   //getMarketIsClosingとは、マーケットがクロージングかどうかを取得する
   function getMarketIsClosing(uint256 marketId) external view returns (bool);
   //getRiskParamsとは、リスクパラメーターを取得する
   function getRiskParams() external view returns (uint256, uint256, uint256, uint256);
   //getAccountBalancesとは、アカウントのバランスを取得する
   function getAccountBalances(address owner) external view returns (uint256[] memory, uint256[] memory);
   //renounceOwnershipとは、所有権を放棄する
   function renounceOwnership() external;
   //getMinBorrowedValueとは、最小借入値を取得する
   function getMinBorrowedValue() external view returns (uint256);
   //setOperatorsとは、オペレーターを設定する
   function setOperators(OperatorArg[] calldata args) external;
   //getMarketPriceとは、マーケット価格を取得する
   function getMarketPrice(uint256 marketId) external view returns (uint256);
   //ownerとは、所有者
   function owner() external view returns (address);
   //isOwnerとは、所有者かどうか
   function isOwner() external view returns (bool);
   //ownerWithdrawExcessTokensとは、オーナーが余分なトークンを引き出す
   function ownerWithdrawExcessTokens(uint256 marketId, address recipient) external;
   //ownerAddMarketとは、オーナーがマーケットを追加する
   function ownerAddMarket(uint256 marketId, address marketTokenAddress) external;
   //operateとは、操作する
   function operate(Account.Info[] calldata accounts, Actions.ActionArgs[] calldata actions) external;
   //getMarketWithInfoとは、マーケットと情報を取得する
   function getMarketWithInfo(uint256 marketId) external view returns (Market, bool, uint256, uint256);
   //ownerSetMarginRatioとは、オーナーがマージンレシオを設定する
   function ownerSetMarginRatio(uint256 marginRatio) external;
   //getLiquidationSpreadとは、リキッドエーションスプレッドを取得する
   function getLiquidationSpread() external view returns (uint256);
   //getAccountWeiとは、アカウントのウェイトを取得する
   function getAccountWei(address owner, uint256 marketId) external view returns (uint256);
   //getMarketTotalParとは、マーケットのトータルパーを取得する
   function getMarketTotalPar(uint256 marketId) external view returns (int256);
   //getLiquidationSpreadForPairとは、ペアのリキッドエーションスプレッドを取得する
   function getLiquidationSpreadForPair(uint256 heldMarketId, uint256 owedMarketId) external view returns (uint256);
   //getNumExcessTokensとは、余分なトークンの数を取得する
   function getNumExcessTokens(uint256 marketId) external view returns (uint256);
   //getMarketCachedIndexとは、マーケットのキャッシュインデックスを取得する
   function getMarketCachedIndex(uint256 marketId) external view returns (uint256);
   //getAccountStatusとは、アカウントのステータスを取得する
   function getAccountStatus(address owner) external view returns (uint8);
   //getEarningsRateとは、イワリングレートを取得する
   function getEarningsRate() external view returns (uint256);
   //ownerSetPriceOracleとは、オーナーが価格オラクルを設定する
   function ownerSetPriceOracle(address priceOracle) external;
   //getRiskLimitsとは、リスクリミットを取得する
   function getRiskLimits() external view returns (uint256, uint256);
   //getMarketとは、マーケットを取得する
   function getMarket(uint256 marketId) external view returns (Market);
   //ownerSetIsClosingとは、オーナーがクロージングかどうかを設定する
   function ownerSetIsClosing(uint256 marketId, bool isClosing) external;
   //ownerSetGlobalOperatorとは、オーナーがグローバルオペレーターを設定する
   function ownerSetGlobalOperator(address operator, bool approved) external;
   //transferOwnershipとは、所有権を移転する
   function transferOwnership(address newOwner) external;
   //getAdjustedAccountValuesとは、調整されたアカウントのバリューを取得する
   function getAdjustedAccountValues(Account.Info calldata account) external view returns (MathError, uint256, uint256);
   //getAccountValuesとは、アカウントのバリューを取得する
   function getAccountValues(Account.Info calldata account) external view returns (MathError, uint256, uint256);
   //getMarketInterestRateとは、マーケットのイワリングレートを取得する
   function getMarketInterestRate(uint256 marketId) external view returns (uint256);
   //getMarketMarginPremiumとは、マーケットのマージンプレミアムを取得する
   function getMarketMarginPremium(uint256 marketId) external view returns (uint256);
   
}