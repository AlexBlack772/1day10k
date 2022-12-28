pragma solidity ^0.8.13;

//UniswapV3FlashSwapのコントラクト
contract UniswapV3FlashSwap {
   //swaprouter contractのアドレス
   address constant swapRouter = 0xE592427A0AEce92De3Edee1F18E0157C05861564;

   //min_sqrt_ratioの値
   uint160 constant minSqrtRatio = 4295128739;
   //max_sqrt_ratioの値
   //sqrtとは、平方根のこと
   uint160 constant maxSqrtRatio = 1461446703485210103287273052203988822378723970342;

   //flashSwap関数
   function flashSwap(
         address pool0,
         uint fee1,
         address tokenIn,
         address tokenOut,
         uint amountIn,
      ) external {
         //
      }
      
}