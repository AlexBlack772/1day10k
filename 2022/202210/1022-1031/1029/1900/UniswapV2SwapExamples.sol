pragma solidity ^0.8.13;

contract UniswapV2SwapExamples {
   address private constant UNISWAP_V2_ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address private constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    IUniswapV2Router private router = IUniswapV2Router(UNISWAP_V2_ROUTER);
    IERC20 private weth = IERC20(WETH);
    IERC20 private dai = IERC20(DAI);

    //swapSingleHopExactAmountInとは、単一のホップでトークンを交換する関数
      function swapSingleHopExactAmountIn(
         address tokenIn,
         address tokenOut,
         uint amountIn,
         uint amountOutMin
      ) external {
         IERC20(tokenIn).approve(UNISWAP_V2_ROUTER, amountIn);
   
         address[] memory path = new address[](2);
         path[0] = tokenIn;
         path[1] = tokenOut;
   
         router.swapExactTokensForTokens(
               amountIn,
               amountOutMin,
               path,
               address(this),
               block.timestamp
         );
      }

      //swapSingleHopExactAmountOutとは、単一のホップでトークンを交換する関数
      function swapSingleHopExactAmountOut(
         address tokenIn,
         address tokenOut,
         uint amountInMax,
         uint amountOut
      ) external {
         IERC20(tokenIn).approve(UNISWAP_V2_ROUTER, amountInMax);
   
         address[] memory path = new address[](2);
         path[0] = tokenIn;
         path[1] = tokenOut;
   
         router.swapTokensForExactTokens(
               amountOut,
               amountInMax,
               path,
               address(this),
               block.timestamp
         );
      }
      
}