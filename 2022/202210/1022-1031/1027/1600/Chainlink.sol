pragma solidity ^0.6.0;

//ChainlinkPriceOracleとは、チェーンリンクの価格オラクル
contract ChainlinkPriceOracle {

   constructor() public {
   }

   //getLatestPriceとは、最新の価格を取得する
   function getLatestPrice(address _token) external view returns (uint256);
}

//AggregatorV3Interfaceとは、アグリゲーターV3インターフェース
interface AggregatorV3Interface {

   //latestRoundDataとは、最新のラウンドデータ
   function latestRoundData()
      external
      view
      returns (
         uint80 roundId,
         int256 answer,
         uint256 startedAt,
         uint256 updatedAt,
         uint80 answeredInRound
      );

   //getRoundDataとは、ラウンドデータを取得する
   function getRoundData(uint80 _roundId) external view returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
   );
}