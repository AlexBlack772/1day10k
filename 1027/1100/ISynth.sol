pragma solidity ^0.8.0;

interface ISynth {
   //currencyKeyとは、daiの種類を表します。
   function currencyKey() external view returns (bytes32);

   //transferableSynthsとは、daiの残高を表します。
   function transferableSynths(address account) external view returns (uint256);

   //transferAndSettleとは、daiを他のアドレスに送ること

   function transferAndSettle(address to, uint256 value) external returns (bool);

   // Restricted: used internally to Synthetix
   //burnとは、破棄すること
    function burn(address account, uint amount) external;
}