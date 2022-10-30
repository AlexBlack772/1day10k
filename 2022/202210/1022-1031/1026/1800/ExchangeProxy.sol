pragma solidity ^0.8.13;

interface ExchangeProxy {
   function batchSwapExactIn(
       IERC20TokenV06[] calldata tokens,
       uint256 totalAmountIn,
       uint256 minTotalAmountOut,
       bytes[] calldata data
   )
       external
       payable
       returns (uint256 totalAmountOut);

   function batchSwapExactOut(
         Swap[] calldata swaps,  
         IERC20TokenV06[] calldata tokens,
         uint256 totalAmountOut,
         uint256 maxTotalAmountIn
   )

         external
         payable
         returns (uint256 totalAmountIn);

   function batchEthInSwapExactIn(
         IERC20TokenV06[] calldata tokens,
         uint256 totalAmountIn,
         uint256 minTotalAmountOut,
         bytes[] calldata data
      )
         external
         payable
         returns (uint256 totalAmountOut);

      
   function batchEthInSwapExactOut(
         Swap[] calldata swaps,  
         IERC20TokenV06[] calldata tokens,
         uint256 totalAmountOut,
         uint256 maxTotalAmountIn
   )
         external
         payable
         returns (uint256 totalAmountIn);
            
}