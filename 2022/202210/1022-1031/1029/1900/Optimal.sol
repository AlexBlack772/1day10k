pragma solidity ^0.8.13;

contract TestUniswapOptimalOneSidedSupply {
    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    //sqrtとは、平方根を求める関数
      function sqrt(uint y) internal pure returns (uint z) {
         if (y > 3) {
               z = y;
               uint x = y / 2 + 1;
               while (x < z) {
                  z = x;
                  x = (y / x + x) / 2;
               }
         } else if (y != 0) {
               z = 1;
         }
      }
      //getSwapAmountsとは、スワップする量を求める関数
      function getSwapAmounts(address tokenA, address tokenB, uint amountA) public view returns (uint amountB) {
         (uint reserveA, uint reserveB) = getReserves(tokenA, tokenB);
         amountB = sqrt(amountA * amountA * reserveB / reserveA);
      }
      //zapとは、スワップする関数
      function zap(address tokenA, address tokenB, uint amountA) public {
         (uint reserveA, uint reserveB) = getReserves(tokenA, tokenB);
         uint amountB = sqrt(amountA * amountA * reserveB / reserveA);
         IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
         IERC20(tokenA).approve(ROUTER, amountA);
         IERC20(tokenB).approve(ROUTER, amountB);
         address[] memory path = new address[](2);
         path[0] = tokenA;
         path[1] = tokenB;
         IUniswapV2Router02(ROUTER).swapExactTokensForTokens(
               amountA,
               amountB,
               path,
               msg.sender,
               block.timestamp
         );
      }

      //swapとは、 スワップする関数
      function swap(address tokenA, address tokenB, uint amountA, uint amountB) public {
         IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
         IERC20(tokenA).approve(ROUTER, amountA);
         IERC20(tokenB).approve(ROUTER, amountB);
         address[] memory path = new address[](2);
         path[0] = tokenA;
         path[1] = tokenB;
         IUniswapV2Router02(ROUTER).swapExactTokensForTokens(
               amountA,
               amountB,
               path,
               msg.sender,
               block.timestamp
         );
      }

      //addLiquidlityとは、流動性を追加する関数
      function addLiquidlity(address tokenA, address tokenB, uint amountA, uint amountB) public {
         IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
         IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);
         IERC20(tokenA).approve(ROUTER, amountA);
         IERC20(tokenB).approve(ROUTER, amountB);
         IUniswapV2Router02(ROUTER).addLiquidity(
               tokenA,
               tokenB,
               amountA,
               amountB,
               0,
               0,
               msg.sender,
               block.timestamp
         );
      }
}

//IUniswapV2Routerとは、UniswapV2のルーター
interface IUniswapV2Router02 {
   //addLiquidityとは、流動性を追加する関数
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
   //swapExactTokensForTokensとは、トークンをスワップする関数
   function swapExactTokensForTokens(
         uint amountIn,
         uint amountOutMin,
         address[] calldata path,
         address to,
         uint deadline
   ) external returns (uint[] memory amounts);

}

//IUniswapV2Factoryとは、UniswapV2のファクトリー
interface IUniswapV2Factory {
   //getPairとは、ペアを取得する関数
   function getPair(address tokenA, address tokenB) external view returns (address pair);
}

//IUniswapV2Pairとは、UniswapV2のペア
interface IUniswapV2Pair {
   function token0() external view returns (address);

    function token1() external view returns (address);
   //getReservesとは、リザーブを取得する関数
   function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}