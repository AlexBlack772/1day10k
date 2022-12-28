pragma solidity ^0.8.13;

import { IERC20 as ERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface KyberNetworkProxyInterface {
      function maxGasPrice() external view returns (uint256);
      function getUserCapInWei(address user) external view returns (uint256);
      function getUserCapInTokenWei(address user, ERC20 token) external view returns (uint256);
      function enabled() external view returns (bool);
      function info(bytes32 id) external view returns(uint);
      function getExpectedRate(ERC20 src, ERC20 dest, uint srcQty) external view returns (uint expectedRate, uint slippageRate);

}
