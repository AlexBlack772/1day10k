pragma solidity ^0.8.10;

interface ExchangeProxy {
   //batchSwapExactInとは、入力の量を指定して、出力の量を計算するための関数です。
   function batchSwapExactIn(
      Swap[] calldata swaps,
      IERC20 fromToken,
      IERC20 toToken,
      uint256 totalInput,
      uint256 minTotalOutput
   ) external payable returns (uint256 totalOutput);

   //batchSwapExactOutとは、出力の量を指定して、入力の量を計算するための関数です。
   function batchSwapExactOut(
      Swap[] calldata swaps,
      IERC20 fromToken,
      IERC20 toToken,
      uint256 maxTotalInput
   ) external payable returns (uint256 totalInput);

}