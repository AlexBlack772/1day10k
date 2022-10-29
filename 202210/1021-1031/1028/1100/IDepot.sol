pragma solidity ^0.6.0;

interface IDepot {
   //fundsWalletとは、ファンドウォレットを取得する
   function fundsWallet() external view returns (address);
   //maxEthPurchaseとは、最大ETH購入を取得する
   function maxEthPurchase() external view returns (uint256);
   //minimumDepositAmountとは、最小デポジット額を取得する
   function minimumDepositAmount() external view returns (uint256);
   //synthsReceivedForEtherとは、Etherに対して受け取るシンセットを取得する
   function synthsReceivedForEther(uint256 amount) external view returns (uint256);
   //totalSellableDepositsとは、販売可能なデポジットの合計を取得する
   function totalSellableDeposits() external view returns (uint256);
   //depositSynthsとは、シンセットをデポジットする
   function depositSynths(uint256 amount) external;
   //exchangeEtherForSynthsとは、Etherをシンセットに交換する
   function exchangeEtherForSynths() external payable;
   //exchangeEtherForSynthsAtRateとは、Etherをシンセットに交換する
   function exchangeEtherForSynthsAtRate(uint256 guaranteedRate) external payable;
   //withdrawMyDepositedSynthsとは、デポジットしたシンセットを引き出す
   function withdrawMyDepositedSynths() external;
   //exchangeEtherForSNXとは、EtherをSNXに交換する
   function exchangeEtherForSNX() external payable;
   //exchangeEtherForSNXAtRateとは、EtherをSNXに交換する
   function exchangeEtherForSNXAtRate(uint256 guaranteedRate) external payable;
   //exchangeSynthsForSNXとは、シンセットをSNXに交換する
   function exchangeSynthsForSNX(uint256 amount) external;
   //exchangeSynthsForSNXAtRateとは、シンセットをSNXに交換する
   function exchangeSynthsForSNXAtRate(uint256 amount, uint256 guaranteedRate) external;

}