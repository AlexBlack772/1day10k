pragma solidity ^0.8.10;

//IUniswapV2Router01とは、Uniswapのルーターを管理するためのインターフェースです。
interface IUniswapV2Router01 {
   //factoryとは、ファクトリーを取得するための関数です。
   function factory() external pure returns (address);
   //WETHとは、WETHを取得するための関数です。
   function WETH() external pure returns (address);
   //addLiquidityとは、流動性を追加するための関数です。
   function addLiquidity(
      address tokenA,
      address tokenB,
      uint amountADesired,
      uint amountBDesired,
      uint amountAMin,
      uint amountBMin,
      address to,
      uint deadline
   ) external returns (uint amountA, uint amountB, uint liquidity);
   //addLiquidityETHとは、ETHを追加するための関数です。
   function addLiquidityETH(
      address token,
      uint amountTokenDesired,
      uint amountTokenMin,
      uint amountETHMin,
      address to,
      uint deadline
   ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
   //removeLiquidityとは、流動性を削除するための関数です。
   function removeLiquidity(
      address tokenA,
      address tokenB,
      uint liquidity,
      uint amountAMin,
      uint amountBMin,
      address to,
      uint deadline
   ) external returns (uint amountA, uint amountB);
   //removeLiquidityETHとは、ETHを削除するための関数です。
   function removeLiquidityETH(
      address token,
      uint liquidity,
      uint amountTokenMin,
      uint amountETHMin,
      address to,
      uint deadline
   ) external returns (uint amountToken, uint amountETH);
   //removeLiquidityWithPermitとは、許可を使用して流動性を削除するための関数です。
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
   //swapExactTokensForTokensとは、トークンを交換するための関数です。
   function swapExactTokensForTokens(
      uint amountIn,
      uint amountOutMin,
      address[] calldata path,
      address to,
      uint deadline
   ) external returns (uint[] memory amounts);
   //swapTokensForExactTokensとは、トークンを交換するための関数です。
   function swapTokensForExactTokens(
      uint amountOut,
      uint amountInMax,
      address[] calldata path,
      address to,
      uint deadline
   ) external returns (uint[] memory amounts);
   //swapExactETHForTokensとは、ETHをトークンに交換するための関数です。
   function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
      external
      payable
      returns (uint[] memory amounts);
   //swapTokensForExactETHとは、トークンをETHに交換するための関数です。
   function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
      external
      returns (uint[] memory amounts);
   //swapExactTokensForETHとは、トークンをETHに交換するための関数です。
   function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
      external
      returns (uint[] memory amounts);
      //quoteとは、価格を取得するための関数です。
   function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
   //getAmountOutとは、出力量を取得するための関数です。
   function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
   //getAmountInとは、入力量を取得するための関数です。
   function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
   //getAmountsOutとは、出力量を取得するための関数です。
   function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
   //getAmountsInとは、入力量を取得するための関数です。
   function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
   
}