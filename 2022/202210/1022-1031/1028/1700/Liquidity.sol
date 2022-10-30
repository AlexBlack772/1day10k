pragma solidity ^0.8.13;

contract TestUniswapLiquidity {
    address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    //addLiquidtyとは、流動性を追加する関数です。
      function addLiquidty(address _tokenA, address _tokenB, uint _amountA, uint _amountB) external {
         IERC20(_tokenA).approve(ROUTER, _amountA);
         IERC20(_tokenB).approve(ROUTER, _amountB);
         IUniswapV2Router02(ROUTER).addLiquidity(_tokenA, _tokenB, _amountA, _amountB, 0, 0, msg.sender, block.timestamp);
      }
      //removeLiquidtyとは、流動性を削除する関数です。
      function removeLiquidty(address _tokenA, address _tokenB, uint _liquidity) external {
         IERC20(_tokenA).approve(ROUTER, _liquidity);
         IERC20(_tokenB).approve(ROUTER, _liquidity);
         IUniswapV2Router02(ROUTER).removeLiquidity(_tokenA, _tokenB, _liquidity, 0, 0, msg.sender, block.timestamp);
      }
      
}

interface IUniswapV2Router {
   //addLiquidtyとは、流動性を追加する関数です。
   function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity);
   //removeLiquidtyとは、流動性を削除する関数です。
   function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB);

}

//IUniswapV2Factoryとは、Uniswapのファクトリーのインターフェースです。
interface IUniswapV2Factory {
   //getPairとは、ペアのアドレスを取得する関数です。
   function getPair(address tokenA, address tokenB) external view returns (address pair);
}

//IERC20とは、ERC20トークンのインターフェースです。
interface IERC20 {
   //approveとは、トークンの承認をする関数です。
   function approve(address spender, uint amount) external returns (bool);
   //totalSupplyとは、トークンの総供給量を取得する関数です。
   function totalSupply() external view returns (uint);
   //balanceOfとは、トークンの残高を取得する関数です。
   function balanceOf(address account) external view returns (uint);
   //transferとは、トークンを送金する関数です。
   function transfer(address recipient, uint amount) external returns (bool);
   //allowanceとは、承認された残高を取得する関数です。
   function allowance(address owner, address spender) external view returns (uint);
   //transferFromとは、承認された残高を送金する関数です。
   function transferFrom(address sender, address recipient, uint amount) external returns (bool);
   
}
