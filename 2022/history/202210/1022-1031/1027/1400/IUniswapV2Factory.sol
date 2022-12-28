pragma solidity ^0.6.0;

interface IUniswapV2Factory {
   //PairCreatedとは、ペアが作成されたときに発火するイベント
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    //getPairとは、ペアのアドレスを取得する関数
    function getPair(address tokenA, address tokenB) external view returns (address pair);
    //allPairsとは、すべてのペアのアドレスを取得する関数
    function allPairs(uint) external view returns (address pair);
    //allPairsLengthとは、すべてのペアの長さを取得する関数
    function allPairsLength() external view returns (uint);
    //createPairとは、ペアを作成する関数
    function createPair(address tokenA, address tokenB) external returns (address pair);
    //feeToとは、手数料を送るアドレス
      function feeTo() external view returns (address);
      //feeToSetterとは、手数料を送るアドレスを設定するアドレス
      function feeToSetter() external view returns (address);
      

}