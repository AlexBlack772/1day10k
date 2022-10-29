pragma solidity ^0.8.10;

//IDepotとは、Depotのインターフェースです。
interface IDepot {
    //funsWalletとは、ファンズウォレットのアドレスを取得するための関数です。
      function fundsWallet() external view returns (address);
      //maxEthPurchaseとは、最大のETH購入額を取得するための関数です。
      function maxEthPurchase() external view returns (uint256);
      //minimumDepositAmountとは、最小のデポジット額を取得するための関数です。
      function minimumDepositAmount() external view returns (uint256);
      //synthsReceivedForEtherとは、ETHを受け取るための関数です。
      function synthsReceivedForEther(uint256 amount) external view returns (uint256);
      //depositSynthsとは、Synthをデポジットするための関数です。
      function depositSynths(uint256 amount) external;
      //exchangeEtherForSynthsAtRateとは、ETHをSynthに交換するための関数です。
      function exchangeEtherForSynthsAtRate(uint256 minConversionRate) external payable;
      //exchangeEtherForSNXAtRateとは、ETHをSNXに交換するための関数です。
      function exchangeEtherForSNXAtRate(uint256 minConversionRate) external payable;
      //exchangeEtherForSNXとは、ETHをSNXに交換するための関数です。
      function exchangeEtherForSNX() external payable;
      

}