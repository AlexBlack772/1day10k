pragma solidity ^0.4.24;

interface IDepot {
   function fundsWallet() external view returns (address);

   function maxEthPurchase() external view returns (uint);

   function minimumDeposits() external view returns (uint);

   function sETHIssued() external view returns (uint);

   function exchangeEtherForSyths() 
}