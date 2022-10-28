pragma solidity ^0.6.0;

interface ISynth {
   //currencyKeyとは、通貨キーを取得する
   function currencyKey() external view returns (bytes32);
   //transferableSynthsとは、転送可能なシンセットを取得する
   function transferableSynths(address account) external view returns (uint256);
   //transferAndSettleとは、転送と決済を行う
   function transferAndSettle(address to, uint value) external returns (bool);
   //burnとは、燃焼する
   function burn(address account, uint amount) external;
   //issueとは、発行する
   function issue(address account, uint amount) external;
   
}