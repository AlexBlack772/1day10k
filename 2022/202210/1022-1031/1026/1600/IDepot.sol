pragma solidity ^0.8.13;

interface IDepot {

   function fundsWallet() external view returns (address);

   function maxEthPurchase() external view returns (uint);

   function minimumDepositAmount() external view returns (uint);

   function systhsRecievedForEther(uint amount) external view returns (uint);

   function totalSellableDeposits() external view returns (uint);

   function depositSyths(uint amount) external;

   function exchangeEtherForSynths() external payable;

   function exchangeEtherForSynthsAtRate(uint guaranteedRate) external payable;

   function withdrawMyDepositedSynths() external;

   function exchangeEtherForSNX() external payable;

   function exchangeEtherForSNXAtRate(uint guaranteedRate) external payable;

   function exchangeEtherForXDR() external payable;
   
   function exchangeEtherForXDRAtRate(uint guaranteedRate) external payable;
}