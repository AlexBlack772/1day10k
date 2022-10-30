pragma solidity ^0.5.0;

//ExchangeProxyとは、ExchangeProxyのコントラクト
interface ExchangeProxy {
   //batchSwapExactInとは、batchSwapExactInの関数
   function batchSwapExactIn(
      Swap[] calldata swaps,
      address tokenIn,
      address tokenOut,
      uint256 totalAmountIn,
      uint256 minTotalAmountOut
   ) external payable returns (uint256 totalAmountOut);

   //batchSwapExactOutとは、batchSwapExactOutの関数
   function batchSwapExactOut(
      Swap[] calldata swaps,
      address tokenIn,
      address tokenOut,
      uint256 maxTotalAmountIn
   ) external payable returns (uint256 totalAmountIn);

   //batchEthInSwapExactInとは、batchEthInSwapExactInの関数
   function batchEthInSwapExactIn(
      Swap[] calldata swaps,
      address tokenOut,
      uint256 minTotalAmountOut
   ) external payable returns (uint256 totalAmountOut);

   //batchEthOutSwapExactInとは、batchEthOutSwapExactInの関数
   function batchEthOutSwapExactIn(
      Swap[] calldata swaps,
      address tokenIn,
      uint256 totalAmountIn,
      uint256 minTotalAmountOut
   ) external payable returns (uint256 totalAmountOut);

   //batchEthInSwapExactOutとは、batchEthInSwapExactOutの関数
   function batchEthInSwapExactOut(
      Swap[] calldata swaps,
      address tokenOut,
      uint256 maxTotalAmountIn
   ) external payable returns (uint256 totalAmountIn);

   //batchEthOutSwapExactOutとは、batchEthOutSwapExactOutの関数
   function batchEthOutSwapExactOut(
      Swap[] calldata swaps,
      address tokenIn,
      uint256 maxTotalAmountIn
   ) external payable returns (uint256 totalAmountIn);

}