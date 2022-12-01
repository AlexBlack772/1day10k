pragma solidity ^0.8.13;

contract UniswapV3FlashSwap {
    ISwapRouter constant router = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    uint160 internal constant sqrtPriceLimitX96 = 0;

    uint160 internal constant sqrtPriceLimitY96 = 0;

    function flashSwap(
         address tokenIn,
         address tokenOut,
         uint24 fee,
         uint256 amountIn,
         uint256 amountOutMinimum,
         bytes calldata data
      ) external {
         // Create the pool address
         address pool = PoolAddress.computeAddress(
               factory,
               PoolAddress.PoolKey({
                  token0: tokenIn,
                  token1: tokenOut,
                  fee: fee
               })
         );
   
         // Create the swap callback
         ISwapRouter.ExactInputSingleParams memory params =
               ISwapRouter.ExactInputSingleParams({
                  tokenIn: tokenIn,
                  tokenOut: tokenOut,
                  fee: fee,
                  recipient: address(this),
                  deadline: block.timestamp,
                  amountIn: amountIn,
                  amountOutMinimum: amountOutMinimum,
                  sqrtPriceLimitX96: sqrtPriceLimitX96
               });
   
         // Perform the swap
         router.exactInputSingle(params);
   
         // Call the callback
         (bool success, ) = address(this).call(data);
         require(success, "Callback failed");
   
         // Get the balance of the output token
         uint256 balance = IERC20(tokenOut).balanceOf(address(this));
   
         // Create the swap callback
         ISwapRouter.ExactInputSingleParams memory params2 =
               ISwapRouter.ExactInputSingleParams({
                  tokenIn: tokenOut,
                  tokenOut: tokenIn,
                  fee: fee,
                  recipient: address(this),
                  deadline: block.timestamp,
                  amountIn: balance,
                  amountOutMinimum: 0,
                  sqrtPriceLimitX96: sqrtPriceLimitY96
               });
   
         // Perform the swap
         router.exactInputSingle(params2);
      }
    )
}