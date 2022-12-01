pragma solidity ^0.6.0;

interface IDepot {
   //fundWalletとは、ウォレットを資金する関数
   function fundWallet ( address account, uint amount ) external;
   //maxEthPurchaseとは、最大のETH購入額を取得する関数
   function maxEthPurchase () external view returns ( uint );
   //minimumDepositAmountとは、最小のデポジット額を取得する関数
   function minimumDepositAmount () external view returns ( uint );
   //synsthsReceiveredForEthとは、ETHに対するsynthsを受け取る関数
   function synthsReceivedForEth ( uint amount ) external view returns ( uint );
   //totalSellableDepositsとは、売却可能なデポジットの合計を取得する関数
   function totalSellableDeposits () external view returns ( uint );
   //depositSynthsとは、synthsをデポジットする関数
   function depositSynths ( uint amount ) external;
   //exchangeEtherForSynthsとは、synthsに対するETHを交換する関数
   function exchangeEtherForSynths () external payable;
   //exchangeEtherForSynthsAtRateとは、synthsに対するETHを交換する関数
   function exchangeEtherForSynthsAtRate ( uint guaranteedRate ) external payable;
   //withdrawMyDepositedSynthsとは、デポジットしたsynthsを引き出す関数
   function withdrawMyDepositedSynths () external;
   //exchangeEtherForSNXとは、SNXに対するETHを交換する関数
   function exchangeEtherForSNX () external payable;
   //exchangeEtherForSNXAtRateとは、SNXに対するETHを交換する関数
   function exchangeEtherForSNXAtRate ( uint guaranteedRate ) external payable;
   //

}