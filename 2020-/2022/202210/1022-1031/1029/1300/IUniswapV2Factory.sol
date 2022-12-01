pragma solidity >=0.5.0;

interface IUniswapV2Factory {
   //getPairとは、ペアを取得するための関数です。
    function getPair(address tokenA, address tokenB) external view returns (address pair);
   //allPairsとは、すべてのペアを取得するための関数です。
    function allPairs(uint) external view returns (address pair);
   //allPairsLengthとは、すべてのペアの長さを取得するための関数です。
      function allPairsLength() external view returns (uint);
   //feeToとは、手数料を取得するための関数です。
      function feeTo() external view returns (address);
   //feeToSetterとは、手数料を設定するための関数です。
      function feeToSetter() external view returns (address);
   //createPairとは、ペアを作成するための関数です。
      function createPair(address tokenA, address tokenB) external returns (address pair);
}