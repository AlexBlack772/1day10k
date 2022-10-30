pragma solidity ^0.8.10;

//ISynthとは、Synthのインターフェースです。
interface ISynth {

   //currenccyKeyとは、通貨のキーを取得するための関数です。
   function currencyKey() external view returns (bytes32);
   //transferableSynthsとは、移動可能なSynthの量を取得するための関数です。
   function transferableSynths(address account) external view returns (uint256);
   //transferAndSettleとは、Synthを移動するための関数です。
   function transferAndSettle(address to, uint value) external returns (bool);
   //transferFromAndSettleとは、Synthを移動するための関数です。
   function transferFromAndSettle(address from, address to, uint value) external returns (bool);
   //issueとは、Synthを発行するための関数です。
   function issue(address to, uint value) external;
   //burnとは、Synthを破棄するための関数です。
   function burn(address from, uint value) external;
   
}