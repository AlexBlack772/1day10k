pragma solidity ^0.8.13;

//test code,liquidlityとは、流動性を表す。
contract TestUniswapLiquidity {
    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

   //addLiquidlityとは、流動性を追加する関数
    function addLiquidlity(address tokenA, address tokenB, uint amountA, uint amountB) public {
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

   //removeLiquidlityとは、流動性を削除する関数
      function removeLiquidlity(address tokenA, address tokenB, uint liquidity) public {
         IUniswapV2Router02(ROUTER).removeLiquidity(
               tokenA,
               tokenB,
               liquidity,
               0,
               0,
               msg.sender,
               block.timestamp
         );
      }
}

interface IUniswapV2Router02 {
   //addLiquidlityとは、流動性を追加する関数
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

   //removeLiquidlityとは、流動性を削除する関数
      function removeLiquidity(
            address tokenA,
            address tokenB,
            uint liquidity,
            uint amountAMin,
            uint amountBMin,
            address to,
            uint deadline
      ) external returns (uint amountA, uint amountB);
}

//IUniswapV2Factoryとは、UniswapV2のファクトリー
interface IUniswapV2Factory {
   //getPairとは、ペアを取得する関数
      function getPair(address tokenA, address tokenB) external view returns (address pair);
}

//IERC20とは、ERC20トークンのインターフェース
interface IERC20 {
   //transferとは、トークンを送る関数
      function transfer(address to, uint value) external returns (bool);

   //transferFromとは、トークンを送る関数
      function transferFrom(address from, address to, uint value) external returns (bool);
      //totalSupplyとは、トークンの総供給量を取得する関数
      function totalSupply() external view returns (uint);
      //balanceOfとは、トークンの残高を取得する関数
      function balanceOf(address account) external view returns (uint);
      //allowanceとは、トークンの残高を取得する関数
      function allowance(address owner, address spender) external view returns (uint);
      //approveとは、トークンの残高を取得する関数
      function approve(address spender, uint value) external returns (bool);
      
}

