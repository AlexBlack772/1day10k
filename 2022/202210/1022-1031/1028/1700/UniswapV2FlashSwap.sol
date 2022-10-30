pragma solidity ^0.8.13;

//IUniswapV2Calleeとは、UniswapV2のコールバック関数を実装するためのインターフェースです。
interface IUniswapV2Callee {
    function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}

contract UniswapV2FlashSwap is IUniswapV2Callee {
    address private constant UNISWAP_V2_FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    address private constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    IUniswapV2Factory private constant factory = IUniswapV2Factory(UNISWAP_V2_FACTORY);

    IERC20 private constant weth = IERC20(WETH);

    IUniswapV2Pair private immutable pair;

    // constructorとは、コントラクトがデプロイされたときに実行される関数です。
    uint public amountToRepay;

      constructor() {
         pair = IUniswapV2Pair(factory.getPair(DAI, WETH));
      }

      //flashSwapとは、UniswapV2のフラッシュスワップを実行する関数です。
      function flashSwap(uint amount) external {
         address[] memory path = new address[](2);
         path[0] = DAI;
         path[1] = WETH;

         uint[] memory amounts = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D)
             .swapExactTokensForTokens(amount, 0, path, address(this), block.timestamp);

         amountToRepay = amounts[0] + amounts[1];
      }
      //uniswapV2Callとは、UniswapV2のコールバック関数です。
      function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external override {
         require(msg.sender == address(pair), "UniswapV2FlashSwap: FORBIDDEN");
         require(sender == address(this), "UniswapV2FlashSwap: FORBIDDEN");

         uint amountToken = amount0 == 0 ? amount1 : amount0;
         uint amountETH = amount0 == 0 ? 0 : amount1;

         if (amountToken > 0) {
             IERC20(DAI).transfer(address(pair), amountToken);
         } else {
             weth.transfer(address(pair), amountETH);
         }

         pair.swap(amountToken == 0 ? 1 : 0, amountToken == 0 ? 0 : 1, address(this), data);

         require(
             IERC20(DAI).balanceOf(address(this)) >= amountToRepay,
             "UniswapV2FlashSwap: INSUFFICIENT_BALANCE"
         );
      }

}

interface IUniswapV2Pair {
   //swapとは、UniswapV2のスワップを実行する関数です。
      function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;

}

//IUniswapV2Factoryとは、UniswapV2のファクトリーを実装するためのインターフェースです。
interface IUniswapV2Factory {
   //getPairとは、UniswapV2のペアを取得する関数です。
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);
}

//IERC20とは、ERC20トークンを実装するためのインターフェースです。
interface IERC20 {
   //transferとは、ERC20トークンを送金する関数です。
    function transfer(address to, uint value) external returns (bool);
    //totalSupplyとは、ERC20トークンの総発行量を取得する関数です。
      function totalSupply() external view returns (uint);
      //balanceOfとは、ERC20トークンの残高を取得する関数です。
      function balanceOf(address account) external view returns (uint);
      //allowanceとは、ERC20トークンの残高を取得する関数です。
      function allowance(address owner, address spender) external view returns (uint);
      //approveとは、ERC20トークンの残高を取得する関数です。
      function approve(address spender, uint value) external returns (bool);
      //transferFromとは、ERC20トークンの残高を取得する関数です。
      function transferFrom(address from, address to, uint value) external returns (bool);
      
}

