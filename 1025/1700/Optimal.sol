pragma solidity ^0.8.13;

contract TestUniswapOptimalOneSidedSupply {

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

   function getSwapAmount(uint r,uint a) internal pure returns (uint) {
       return sqrt(r * r + a * a) - r;
   }

   function zap(uint r, uint a, uint b) internal pure returns (uint) {
       uint d = getSwapAmount(r, a);
       uint e = getSwapAmount(r, b);
       return d * e / r;
   }
   
   function _swap(address tokenIn, address tokenOut, uint amountIn, uint amountOut, uint amountOutMin, address to) internal returns (uint amountInUsed, uint amountOutReceived) {
       amountInUsed = amountIn;
       amountOutReceived = amountOut;
   }

}

interface IUniswapV2Router {
    funcation addLiguidity(
        address tokenA, 
        address tokenB, 
        uint amountADesired, 
        uint amountBDesired, 
        uint amountAMin, 
        uint amountBMin, 
        address to, 
        uint deadline) external returns (uint amountA, uint amountB, uint liquidity);


    function swapExactTokensForTokens(
        uint amountIn, 
        uint amountOutMin, 
        address[] calldata path, 
        address to, 
        uint deadline
        ) external returns (uint[] memory amounts);

}

interface IUniswapV2Factory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

interface IUniswapV2Pair {
    function token0() external view returns (address);
    function token1() external view returns (address);

    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);
    
}