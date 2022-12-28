pragma solidity ^0.8.13;

//ISynthetixとは、Synthetixのインターフェース
interface ISynthetix {
   //collateralとは、担保を取得する関数
   function collateral(address account) external view returns (uint);
   //debetAndTotalDebtとは、借入額と総借入額を取得する関数
   function debtBalanceOf(address account, bytes32 currencyKey) external view returns (uint debtBalance);
   //totalIssuedSynthsとは、総発行されたシンセットを取得する関数
   function totalIssuedSynths(bytes32 currencyKey) external view returns (uint totalIssued);
   //synthsとは、シンセットを取得する関数
   function synths(bytes32 currencyKey) external view returns (address);
   //availableCurrencyKeysとは、利用可能な通貨キーを取得する関数
   function availableCurrencyKeys() external view returns (bytes32[] memory);
   //availableSynthCountとは、利用可能なシンセットの数を取得する関数
   function availableSynthCount() external view returns (uint);
   //debtBalanceOfAndTotalDebtとは、借入額と総借入額を取得する関数
   function debtBalanceOfAndTotalDebt(address account, bytes32 currencyKey) external view returns (uint debtBalance, uint totalDebt);
   //isWaitingPeriodとは、ウェイト期間中かどうかを取得する関数
   function isWaitingPeriod(bytes32 currencyKey) external view returns (bool);
   //maxIssuableSynthsとは、発行可能なシンセットの最大値を取得する関数
   function maxIssuableSynths(address account) external view returns (uint maxIssuable);
   //remainingIssuableSynthsとは、発行可能なシンセットの残りを取得する関数
   function remainingIssuableSynths(address account) external view returns (uint maxIssuable);
   //synthsByAddressとは、シンセットを取得する関数
   function synthsByAddress(address synthAddress) external view returns (bytes32);
   //burnSynthsとは、シンセットを破棄する関数
   function burnSynths(uint amount) external;
   //burnSynthsOnBehalfとは、他人の代わりにシンセットを破棄する関数
   function burnSynthsOnBehalf(address burnForAddress, uint amount) external;
   //burnSynthsToTargetとは、シンセットを破棄して目標値にする関数
   function burnSynthsToTarget() external;
   //burnSynthsToTargetOnBehalfとは、他人の代わりにシンセットを破棄して目標値にする関数
   function burnSynthsToTargetOnBehalf(address burnForAddress) external;
   //issueMaxSynthsとは、シンセットを発行する関数
   function issueMaxSynths() external;
   //issueSynthsとは、シンセットを発行する関数
   function issueSynths(uint amount) external;
   //issueSynthsOnBehalfとは、他人の代わりにシンセットを発行する関数
   function issueSynthsOnBehalf(address issueForAddress, uint amount) external;
   //issueSynthsToTargetとは、シンセットを発行して目標値にする関数
   function issueSynthsToTarget() external;
   //issueSynthsToTargetOnBehalfとは、他人の代わりにシンセットを発行して目標値にする関数
   function issueSynthsToTargetOnBehalf(address issueForAddress) external;
   //transferAndSettleとは、転送して決済する関数
   function transferAndSettle(address to, uint value) external;
   //transferFromAndSettleとは、他人の代わりに転送して決済する関数
   function transferFromAndSettle(address from, address to, uint value) external;
   //exchangeAndSettleとは、交換して決済する関数
   function exchangeAndSettle(bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey) external;
   //exchangeOnBehalfAndSettleとは、他人の代わりに交換して決済する関数
   function exchangeOnBehalfAndSettle(address exchangeForAddress, bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey) external;
   
}