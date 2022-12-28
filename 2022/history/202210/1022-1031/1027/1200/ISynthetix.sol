pragma solidity ^0.6.0;

interface ISyntheix {
   //availableCurrencyKeysとは、利用可能な通貨キーのリストを取得する関数
   function availableCurrencyKeys () external view returns ( bytes32[] memory );
   //availableSynthsとは、利用可能なシンセットのリストを取得する関数
   function availableSynths () external view returns ( address[] memory );
   //collateralとは、コラテラルのアドレスを取得する関数
   function collateral ( bytes32 currencyKey ) external view returns ( address );
   //collateralisationRatioとは、コラテラルの比率を取得する関数
   function collateralisationRatio ( address issuer ) external view returns ( uint256 );
   //debtBalanceOfとは、借金残高を取得する関数
   function debtBalanceOf ( address issuer, bytes32 currencyKey ) external view returns ( uint256 );
   //debtBalanceOfAndTotalDebtとは、借金残高と総借金を取得する関数
   function debtBalanceOfAndTotalDebt ( address issuer, bytes32 currencyKey ) external view returns ( uint256 debtBalance, uint256 totalSystemDebt );
   //isWaitingPeriodとは、ウェイト期間中かどうかを取得する関数
   function isWaitingPeriod ( address account ) external view returns ( bool );
   //maxIssuableSynthsとは、発行可能なシンセットの最大値を取得する関数
   function maxIssuableSynths ( address issuer ) external view returns ( uint256 );
   //remainingIssuableSynthsとは、発行可能なシンセットの残りを取得する関数
   function remainingIssuableSynths ( address issuer ) external view returns ( uint256 );
   //totalIssuedSynthsとは、発行されたシンセットの総額を取得する関数
   function totalIssuedSynths ( bytes32 currencyKey ) external view returns ( uint256 );
   //totalIssuedSynthsExcludeEtherCollateralとは、Etherコラテラルを除いた発行されたシンセットの総額を取得する関数
   function totalIssuedSynthsExcludeEtherCollateral ( bytes32 currencyKey ) external view returns ( uint256 );
   //transferableSynthetixとは、移動可能なシンセットを取得する関数
   function transferableSynthetix ( address account ) external view returns ( uint256 );
   //burnSynthsとは、シンセットを燃焼する関数
   function burnSynths ( uint amount ) external;
   //burnSynthsOnBehalfとは、他の人の代わりにシンセットを燃焼する関数
   function burnSynthsOnBehalf ( address burnForAddress, uint amount ) external;
   //issueMaxSynthsとは、最大のシンセットを発行する関数
   function issueMaxSynths () external;
   //issueMaxSynthsOnBehalfとは、他の人の代わりに最大のシンセットを発行する関数
   function issueMaxSynthsOnBehalf ( address issueForAddress ) external;
   //mintとは、シンセットを発行する関数
   function mint () external;
   //settleとは、シンセットを決済する関数
   function settle ( address currencyKey ) external returns ( uint reclaimed, uint refunded, uint numEntriesSettled );
   // liquidateDelinquentAccountとは、不履行のアカウントを処分する関数
   function liquidateDelinquentAccount ( address account, uint susdAmount ) external;
   

}