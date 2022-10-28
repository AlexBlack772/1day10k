pragma solidity ^0.5.0;

// Note: Kyber uses it owns ERC20 interface
// See: https://github.com/KyberNetwork/smart-contracts/blob/master/contracts/ERC20Interface.sol
import { IERC20 as ERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface KyberNetworkProxyInterface {
   //macGasPriceとは、最大ガス価格を取得する
   function maxGasPrice() external view returns (uint256);
   //getUserCapInWeiとは、ユーザーのキャップを取得する
   function getUserCapInWei(address) external view returns (uint256);
   //getUserCapInTokenWeiとは、ユーザーのキャップを取得する
   function getUserCapInTokenWei(address, ERC20) external view returns (uint256);
   //enabledとは、有効かどうかを取得する
   function enabled() external view returns (bool);
   //infoとは、情報を取得する
   function info(bytes32) external view returns (uint256);
   //getExpectedRateとは、期待されるレートを取得する
   function getExpectedRate(ERC20, ERC20, uint256) external view returns (uint256, uint256);
   //tradeWithHintとは、ヒントを使用して取引する
   function tradeWithHint(ERC20, uint256, ERC20, address, uint256, uint256, address, bytes calldata, uint256) external payable returns (uint256);

}

interface SimpleNetworkInterface {
   //swapTokenToTokenとは、トークンをトークンに交換する
   function swapTokenToToken(ERC20, ERC20, uint256) external returns (uint256);
   //swapEtherToTokenとは、Etherをトークンに交換する
   function swapEtherToToken(ERC20, uint256) external payable returns (uint256);
   //swapTokenToEtherとは、トークンをEtherに交換する
   function swapTokenToEther(ERC20, uint256, uint256) external returns (uint256);
   
}