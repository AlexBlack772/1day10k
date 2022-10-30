pragma solidity ^0.5.0;

interface IUniswapV2Router01 {
   //factoryとは、ファクトリー
   function factory() external pure returns (address);
   //WETHとは、ETH
   function WETH() external pure returns (address);
   //addLiquidityとは、リキッドティティを追加する
   function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity);
   //addLiquidityETHとは、ETHをリキッドティティに追加する
   function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity);
   //removeLiquidityとは、リキッドティティを削除する
   function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB);
   //removeLiquidityETHとは、ETHをリキッドティティから削除する
   function removeLiquidityETH(address token, uint liquidity, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external returns (uint amountToken, uint amountETH);
   //removeLiquidityWithPermitとは、リキッドティティを許可して削除する
   function removeLiquidityWithPermit(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) external returns (uint amountA, uint amountB);
   //removeLiquidityETHWithPermitとは、ETHをリキッドティティから許可して削除する
   function removeLiquidityETHWithPermit(address token, uint liquidity, uint amountTokenMin, uint amountETHMin, address to, uint deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) external returns (uint amountToken, uint amountETH);
   //swapExactTokensForTokensとは、トークンを入力してトークンを出力する
   function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
   //swapTokensForExactTokensとは、トークンを出力してトークンを入力する
   function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
   //swapExactETHForTokensとは、ETHを入力してトークンを出力する
   function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);
   //swapTokensForExactETHとは、トークンを入力してETHを出力する
   function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
   //swapExactTokensForETHとは、トークンを入力してETHを出力する
   function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
   //swapETHForExactTokensとは、ETHを入力してトークンを出力する
   function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);
   //quoteとは、引用する
   function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
   //getAmountOutとは、出力量を取得する
   function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
   //getAmountInとは、入力量を取得する
   function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
   //getAmountsOutとは、出力量を取得する
   function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
   //getAmountsInとは、入力量を取得する
   function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
   
}