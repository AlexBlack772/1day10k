pragma solidity ^0.5.0;

interface IUniswapV2Factory {
   //getPairとは、ペアを取得する
   function getPair(address tokenA, address tokenB) external view returns (address pair);
   //allPairsとは、すべてのペア
   function allPairs(uint) external view returns (address pair);
   //allPairsLengthとは、すべてのペアの長さ
   function allPairsLength() external view returns (uint);
   //feeToとは、手数料を取得する
   function feeTo() external view returns (address);
   //feeToSetterとは、手数料を設定する
   function feeToSetter() external view returns (address);
   //createPairとは、ペアを作成する
   function createPair(address tokenA, address tokenB) external returns (address pair);
   
}