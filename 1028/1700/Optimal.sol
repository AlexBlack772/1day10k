pragma solidity ^0.8.13;

contract TestUniswapOptimalOneSidedSupply {
    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    //sqrtとは、平方根を求める関数です。
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

      //getSwapAmountとは、スワップする量を取得する関数です。
      function getSwapAmount(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
         amountB = sqrt(amountA * reserveB * 3988000 / reserveA / 3981000 + 1) - 1;
         amountB = amountB * 99 / 100;
      }
      //zapとは、トークンをスワップする関数です。
      function zap(address _tokenA, address _tokenB, uint _amountA) external {
         IERC20(_tokenA).approve(ROUTER, _amountA);
         IUniswapV2Router02(ROUTER).swapExactTokensForTokens(_amountA, 0, getPath(_tokenA, _tokenB), msg.sender, block.timestamp);
      }
      //_swapとは、トークンをスワップする関数です。
      function _swap(address _tokenA, address _tokenB, uint _amountA) internal {
         IERC20(_tokenA).approve(ROUTER, _amountA);
         IUniswapV2Router02(ROUTER).swapExactTokensForTokens(_amountA, 0, getPath(_tokenA, _tokenB), address(this), block.timestamp);
      }
      //_addLiquidityとは、トークンをリップルに追加する関数です。
      function _addLiquidity(address _tokenA, address _tokenB, uint _amountA, uint _amountB) internal {
         IERC20(_tokenA).approve(ROUTER, _amountA);
         IERC20(_tokenB).approve(ROUTER, _amountB);
         IUniswapV2Router02(ROUTER).addLiquidity(_tokenA, _tokenB, _amountA, _amountB, 0, 0, msg.sender, block.timestamp);
      }


}

//IUniswapV2Router02とは、Uniswapのルーターのインターフェースです。
interface IUniswapV2Router02 {
   //addLiquidtyとは、トークンをリップルに追加する関数です。
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

   //swapExactTokensForTokensとは、トークンをスワップする関数です。
   function swapExactTokensForTokens(
      uint amountIn,
      uint amountOutMin,
      address[] calldata path,
      address to,
      uint deadline
   ) external returns (uint[] memory amounts);

}

//IUniswapV2Factoryとは、Uniswapのファクトリーのインターフェースです。
interface IUniswapV2Factory {
   //getPairとは、ペアのアドレスを取得する関数です。
   function getPair(address tokenA, address tokenB) external view returns (address pair);
}

//IUniswapV2Pairとは、Uniswapのペアのインターフェースです。
interface IUniswapV2Pair {
   //getReservesとは、リザーブの量を取得する関数です。
   function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

   //token0とは、トークン0を取得する関数です。
   function token0() external view returns (address);
   //token1とは、トークン1を取得する関数です。
   function token1() external view returns (address);
   
}
