pragma solidity ^0.6.0;

interface ExchangeProxy {

   //batchSwapExactInとは、入力の正確なバッチスワップを行う
   function batchSwapExactIn(
       address tokenIn,
       address tokenOut,
       uint256 totalAmountIn,
       uint256 minTotalAmountOut,
       bytes calldata data
   )
       external
       payable
       returns (uint256 totalAmountOut);
   //batchSwapExactOutとは、出力の正確なバッチスワップを行う
   function batchSwapExactOut(
       address tokenIn,
       address tokenOut,
       uint256 maxTotalAmountIn,
       bytes calldata data
   )
       external
       payable
       returns (uint256 totalAmountIn);
       //batchEthInSwapExactInとは、入力の正確なバッチスワップを行う
   function batchEthInSwapExactIn(
         address tokenOut,
         uint256 totalAmountIn,
         uint256 minTotalAmountOut,
         bytes calldata data
      )
         external
         payable
         returns (uint256 totalAmountOut);
      //batchEthInSwapExactOutとは、出力の正確なバッチスワップを行う
      function batchEthInSwapExactOut(
         address tokenOut,
         uint256 maxTotalAmountIn,
         bytes calldata data
      )
         external
         payable
         returns (uint256 totalAmountIn);
      //batchEthOutSwapExactInとは、入力の正確なバッチスワップを行う
      function batchEthOutSwapExactIn(
         address tokenIn,
         uint256 totalAmountIn,
         uint256 minTotalAmountOut,
         bytes calldata data
      )
         external
         payable
         returns (uint256 totalAmountOut);
      //batchEthOutSwapExactOutとは、出力の正確なバッチスワップを行う
      function batchEthOutSwapExactOut(
         address tokenIn,
         uint256 maxTotalAmountIn,
         bytes calldata data
      )
         external
         payable
         returns (uint256 totalAmountIn);


}