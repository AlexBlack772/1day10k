pragma solidity ^0.8.13;

contract TestUniswapOptimalOneSidedSupply {
    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    //sqrtとは、平方根
      function sqrt(uint256 y) internal pure returns (uint256 z) {
         if (y > 3) {
               z = y;
               uint256 x = y / 2 + 1;
               while (x < z) {
                  z = x;
                  x = (y / x + x) / 2;
               }
         } else if (y != 0) {
               z = 1;
         }
      }

      //getSwapAmountとは、スワップ量を取得する
      function getSwapAmount(address tokenIn, address tokenOut, uint256 amountIn) internal view returns (uint256 amountOut) {
         address pair = UniswapV2Library.pairFor(FACTORY, tokenIn, tokenOut);
         (uint256 reserveIn, uint256 reserveOut) = UniswapV2Library.getReserves(FACTORY, tokenIn, tokenOut);
         uint256 amountInWithFee = amountIn * 997;
         uint256 numerator = amountInWithFee * reserveOut;
         uint256 denominator = reserveIn * 1000 + amountInWithFee;
         amountOut = numerator / denominator;
      }

      //zapとは、ZAP
      function zap(address tokenIn, address tokenOut, uint256 amountIn) external {
         uint256 amountOut = getSwapAmount(tokenIn, tokenOut, amountIn);
         IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
         IERC20(tokenIn).approve(ROUTER, amountIn);
         address[] memory path = new address[](2);
         path[0] = tokenIn;
         path[1] = tokenOut;
         IUniswapV2Router02(ROUTER).swapExactTokensForTokens(amountIn, amountOut, path, msg.sender, block.timestamp);
      }

      //_swapとは、スワップする
      function _swap(address tokenIn, address tokenOut, uint256 amountIn) internal returns (uint256 amountOut) {
         amountOut = getSwapAmount(tokenIn, tokenOut, amountIn);
         IERC20(tokenIn).approve(ROUTER, amountIn);
         address[] memory path = new address[](2);
         path[0] = tokenIn;
         path[1] = tokenOut;
         IUniswapV2Router02(ROUTER).swapExactTokensForTokens(amountIn, amountOut, path, address(this), block.timestamp);
      }

      //_addLiquidityとは、リクイディティを追加する
      function _addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired) internal returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
         IERC20(tokenA).approve(ROUTER, amountADesired);
         IERC20(tokenB).approve(ROUTER, amountBDesired);
         (amountA, amountB, liquidity) = IUniswapV2Router02(ROUTER).addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, 0, 0, address(this), block.timestamp);
      }
}

//IUniswapV2Routerとは、UniswapV2のルーター
//ルーターとは、経路を決める
interface IUniswapV2Router {
   //addLiquidtyとは、リクイディティを追加する
   function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity);

   //swapExactTokensForTokensとは、トークンを交換する
   function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);

}

//IUniswapV2Factoryとは、UniswapV2のファクトリー
interface IUniswapV2Factory {
   //getPairとは、ペアを取得する
   function getPair(address tokenA, address tokenB) external view returns (address pair);
}

//IUniswapV2Pairとは、UniswapV2のペア
interface IUniswapV2Pair {
   //token0とは、トークン0
   function token0() external view returns (address);
   //token1とは、トークン1
   function token1() external view returns (address);

   //getReservesとは、リザーブを取得する
   function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

}

//IERC20とは、ERC20トークン
interface IERC20 {
   //totalSupplyとは、トータルサプライ
   function totalSupply() external view returns (uint256);
   //balanceOfとは、残高を取得する
   function balanceOf(address account) external view returns (uint256);
   //transferとは、送金する
   function transfer(address recipient, uint256 amount) external returns (bool);
   //allowanceとは、許可額を取得する
   function allowance(address owner, address spender) external view returns (uint256);
   //approveとは、許可する
   function approve(address spender, uint256 amount) external returns (bool);
   
   //transferFromとは、トークンを送る
   function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

   //approveとは、承認する
   function approve(address spender, uint256 amount) external returns (bool);
}
