pragma solidity ^0.8.10;

//KyberNetworkProxyInterfaceとは、KyberNetworkProxyのインターフェースです。
interface KyberNetworkProxyInterface {
   //getExpectedRateとは、レートを取得するための関数です。
   function getExpectedRate(address src, address dest, uint srcQty) external view returns (uint expectedRate, uint slippageRate);
   //maxGasPriceとは、最大ガス価格を取得するための関数です。
   function maxGasPrice() external view returns(uint);
   //getUserCapInWeiとは、ユーザーのキャップを取得するための関数です。
   function getUserCapInWei(address user) external view returns(uint);
   //getUserCapInTokenWeiとは、ユーザーのトークンのキャップを取得するための関数です。
   function getUserCapInTokenWei(address user, address token) external view returns(uint);
   //enabledとは、有効かどうかを取得するための関数です。
   function enabled() external view returns(bool);
   //infoとは、情報を取得するための関数です。
   function info(bytes32 id) external view returns(uint);
   //getExpectedRateとは、レートを取得するための関数です。
   function getExpectedRate(address src, address dest, uint srcQty, uint platformFeeBps, bool withKyberFee) external view returns (uint expectedRate, uint slippageRate);

}

interface SimpleNetworkInterface {
   //swapTokenToTokenとは、トークンをトークンに交換するための関数です。
   function swapTokenToToken(address src, address dest, uint srcAmount) external payable returns (uint);
   //swapEtherToTokenとは、Etherをトークンに交換するための関数です。
   function swapEtherToToken(address token, uint minConversionRate) external payable returns (uint);
   //swapTokenToEtherとは、トークンをEtherに交換するための関数です。
   function swapTokenToEther(address token, uint srcAmount, uint minConversionRate) external payable returns (uint);
}
