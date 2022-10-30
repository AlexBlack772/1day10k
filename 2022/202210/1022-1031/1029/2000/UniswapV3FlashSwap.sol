pragma solidity ^0.8.13;

//UniswapV3FlashSwapとは、UniswapV3のFlashSwapを行うコントラクト
contract UniswapV3FlashSwap {
   ISwapRouter constant router =
        ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    uint160 internal constant MIN_SQRT_RATIO = 4295128739;
    uint160 internal constant MAX_SQRT_RATIO =
        1461446703485210103287273052203988822378723970342;

   //UniswapV3FlashSwap
   
}