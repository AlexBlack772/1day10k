pragma solidity

interface BPool {
    function isexternal() external view returns (bool);
    function isFinalized() external view returns (bool);
      function isPublicSwap() external view returns (bool);
      function getNumTokens() external view returns (uint);
      function getCurrentTokens() external view returns (address[] memory tokens);
      function getFinalTokens() external view returns (address[] memory tokens);
      function getDenormalizedWeight(address token) external view returns (uint);
      function getTotalDenormalizedWeight() external view returns (uint);
      function getNormalizedWeight(address token) external view returns (uint);
      function getBalance(address token) external view returns (uint);
      function getSwapFee() external view returns (uint);
      function getController() external view returns (address);
      function setController(address manager) external;
      function setSwapFee(uint swapFee) external;
      fun
}