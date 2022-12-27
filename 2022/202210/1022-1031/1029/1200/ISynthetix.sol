pragma solidity ^0.8.10;

//interface ISynthetix {
   //availableCurrencyKeysとは、利用可能な通貨のキーを取得するための関数です。
   function availableCurrencyKeys() external view returns (bytes32[] memory);
   //availableSynthCountとは、利用可能なSynthの数を取得するための関数です。
   function availableSynthCount() external view returns (uint);
   //collateralとは、コラタルの量を取得するための関数です。
   function collateral(address account) external view returns (uint);
   //collateralisationRatioとは、コラタルの比率を取得するための関数です。
   function collateralisationRatio(address issuer) external view returns (uint);
   //debtBalanceOfとは、借金の残高を取得するための関数です。
   function debtBalanceOf(address issuer, bytes32 currencyKey) external view returns (uint);
   //debtBalanceOfAndTotalDebtとは、借金の残高と総借金を取得するための関数です。
   function debtBalanceOfAndTotalDebt(address issuer, bytes32 currencyKey) external view returns (uint debtBalance, uint totalSystemDebt);
   //isWaitingPeriodとは、ウェイト中かどうかを取得するための関数です。
   function isWaitingPeriod(bytes32 currencyKey) external view returns (bool);
   //remainingIssuableSynthsとは、発行可能な残りのSynthの量を取得するための関数です。
   function remainingIssuableSynths(address issuer) external view returns (uint maxIssuableSynths, uint alreadyIssuedSynths, uint totalSystemDebt);
   //synthsとは、Synthのアドレスを取得するための関数です。
   function synths(bytes32 currencyKey) external view returns (address);
   //totalIssuedSynthsとは、総発行されたSynthの量を取得するための関数です。
   function totalIssuedSynths(bytes32 currencyKey) external view returns (uint);
   //totalIssuedSynthsExcludeEtherCollateralとは、Etherコラタルを除いた総発行されたSynthの量を取得するための関数です。
   function totalIssuedSynthsExcludeEtherCollateral(bytes32 currencyKey) external view returns (uint);
   //burnSynthsとは、Synthを燃焼するための関数です。
   function burnSynths(uint amount) external;
   //burnSynthsOnBehalfとは、Synthを燃焼するための関数です。
   function burnSynthsOnBehalf(address burnForAddress, uint amount) external;
   //burnSynthsToTargetとは、Synthを燃焼するための関数です。
   function burnSynthsToTarget() external;
   //burnSynthsToTargetOnBehalfとは、Synthを燃焼するための関数です。
   function burnSynthsToTargetOnBehalf(address burnForAddress) external;
   //issueMaxSynthsとは、最大のSynthを発行するための関数です。
   function issueMaxSynths() external;
   //issueMaxSynthsOnBehalfとは、最大のSynthを発行するための関数です。
   function issueMaxSynthsOnBehalf(address issueForAddress) external;
   //issueSynthsとは、Synthを発行するための関数です。
   function issueSynths(uint amount) external;
   //issueSynthsOnBehalfとは、Synthを発行するための関数です。
   function issueSynthsOnBehalf(address issueForAddress, uint amount) external;
   //mintとは、Synthを発行するための関数です。
   function mint() external;
   //settleとは、Synthを決済するための関数です。
   function settle(bytes32 currencyKey) external;
   //liquidateDelinquentAccountとは、遅延したアカウントを処理するための関数です。
   function liquidateDelinquentAccount(address account, uint susdAmount) external;
   