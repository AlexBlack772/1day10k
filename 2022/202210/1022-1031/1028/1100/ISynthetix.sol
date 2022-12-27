pragma solidity ^0.6.0;

interface ISynthetix {
   //availableCurrencyKeysとは、利用可能な通貨キーを取得する
   function availableCurrencyKeys() external view returns (bytes32[] memory);
   //availableSynthCountとは、利用可能なシンセットの数を取得する
   function availableSynthCount() external view returns (uint);
   //collateralとは、コラテラルを取得する
   function collateral(address account) external view returns (uint);
   //collateralisationRatioとは、コラテラル化率を取得する
   function collateralisationRatio(address issuer) external view returns (uint);
   //debtBalanceOfとは、デッドバランスを取得する
   function debtBalanceOf(address issuer, bytes32 currencyKey) external view returns (uint);
   //debtBalanceOfAndTotalDebtとは、デッドバランスと総デッドを取得する
   function debtBalanceOfAndTotalDebt(address issuer, bytes32 currencyKey) external view returns (uint debtBalance, uint totalSystemDebt);
   //isWaitingPeriodとは、ウェイト期間中かどうかを取得する
   function isWaitingPeriod(bytes32 currencyKey) external view returns (bool);
   //maxIssuableSynthsとは、発行可能なシンセットの最大値を取得する
   function maxIssuableSynths(address issuer) external view returns (uint maxIssuable);
   //remainingIssuableSynthsとは、発行可能なシンセットの残りを取得する
   function remainingIssuableSynths(address issuer) external view returns (uint maxIssuable);
   //synthsとは、シンセットを取得する
   function synths(bytes32 currencyKey) external view returns (address);
   //synthsByAddressとは、シンセットをアドレスで取得する
   function synthsByAddress(address synthAddress) external view returns (bytes32);
   //totalIssuedSynthsとは、発行されたシンセットの合計を取得する
   function totalIssuedSynths(bytes32 currencyKey) external view returns (uint);
   //totalIssuedSynthsExcludeEtherCollateralとは、Etherコラテラルを除いた発行されたシンセットの合計を取得する
   function totalIssuedSynthsExcludeEtherCollateral(bytes32 currencyKey) external view returns (uint);
   //transferableSynthetixとは、転送可能なシンセットを取得する
   function transferableSynthetix(address account) external view returns (uint transferable);
   //burnSynthsとは、シンセットを燃焼する
   function burnSynths(uint amount) external;
   //burnSynthsOnBehalfとは、代わりにシンセットを燃焼する
   function burnSynthsOnBehalf(address burnForAddress, uint amount) external;
   //burnSynthsToTargetとは、ターゲットまでシンセットを燃焼する
   function burnSynthsToTarget() external;   
   //burnSynthsToTargetOnBehalfとは、代わりにターゲットまでシンセットを燃焼する
   function burnSynthsToTargetOnBehalf(address burnForAddress) external;
   //exchangeとは、交換する
   function exchange(bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey) external returns (uint amountReceived);
   //exchangeOnBehalfとは、代わりに交換する
   function exchangeOnBehalf(address exchangeForAddress, bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey) external returns (uint amountReceived);
   //issueMaxSynthsとは、最大シンセットを発行する
   function issueMaxSynths() external;
   //issueMaxSynthsOnBehalfとは、代わりに最大シンセットを発行する
   function issueMaxSynthsOnBehalf(address issueForAddress) external;
   //issueSynthsとは、シンセットを発行する
   function issueSynths(uint amount) external;
   //issueSynthsOnBehalfとは、代わりにシンセットを発行する
   function issueSynthsOnBehalf(address issueForAddress, uint amount) external;
   //mintとは、ミントする
   function mint() external;
   //settleとは、決済する
   function settle(bytes32 currencyKey) external;
   //liquidateDelinquentAccountとは、不履行アカウントを処分する
   
}