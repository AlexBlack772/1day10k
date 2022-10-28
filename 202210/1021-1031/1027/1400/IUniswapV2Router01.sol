pragma solidity ^0.6.0;

interface IUniswapV2Router01 {
   //factoryとは、ファクトリーのアドレス
    function factory() external pure returns (address);
    //WETHとは、ウェーブイーエス
    function WETH() external pure returns (address);
    //addLiquidityとは、リクイディティを追加する関数
    function addLiquidity(
        address tokenA,
        address tokenB,
        //amountADesiredとは、トークンAの希望量
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    //addLiquidityETHとは、ETHをリクイディティに追加する関数
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    //removeLiquidityとは、リクイディティを削除する関数
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    //removeLiquidityETHとは、ETHをリクイディティから削除する関数
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    //removeLiquidityWithPermitとは、許可を持ってリクイディティを削除する関数
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    //removeLiquidityETHWithPermitとは、許可を持ってETHをリクイディティから削除する関数
      function removeLiquidityETHWithPermit(
         address token,
         uint liquidity,
         uint amountTokenMin,
         uint amountETHMin,
         address to,
         uint deadline,
         bool approveMax, uint8 v, bytes32 r, bytes32 s
      ) external returns (uint amountToken, uint amountETH);
      //swapExactTokensForTokensとは、トークンをトークンに交換する関数
      function swapExactTokensForTokens(
         uint amountIn,
         uint amountOutMin,
         address[] calldata path,
         address to,
         uint deadline
      ) external returns (uint[] memory amounts);
      //swapTokensForExactETHとは、トークンをETHに交換する関数
      function swapTokensForExactETH(
         uint amountOut,
         uint amountInMax,
         address[] calldata path,
         address to,
         uint deadline
      ) external returns (uint[] memory amounts);
      //swapExactETHForTokensとは、ETHをトークンに交換する関数
      function swapExactETHForTokens(
         uint amountOutMin,
         address[] calldata path,
         address to,
         uint deadline
      ) external payable returns (uint[] memory amounts);
      //swapETHForExactTokensとは、ETHをトークンに交換する関数
      function swapETHForExactTokens(
         uint amountOut,
         address[] calldata path,
         address to,
         uint deadline
      ) external payable returns (uint[] memory amounts);
      //quoteとは、引数のトークンの量を返す関数
      function quote(
         uint amountA,
         uint reserveA,
         uint reserveB
      ) external pure returns (uint amountB);
      //getAmountOutとは、引数のトークンの量を返す関数
      function getAmountOut(
         uint amountIn,
         uint reserveIn,
         uint reserveOut
      ) external pure returns (uint amountOut);
      //getAmountInとは、引数のトークンの量を返す関数
      function getAmountIn(
         uint amountOut,
         uint reserveIn,
         uint reserveOut
      ) external pure returns (uint amountIn);
      

}