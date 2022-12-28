pragma solidity >=0.4.24;

interface IDepot {
   //depositSynthsとは、Synthsを入金する関数
   function depositSynths(uint amount) external;
   //totalSellableDepositsとは、totalSellableDepositsの関数
   function totalSellableDeposits(address account) external view returns (uint);
   
}