pragma solidity ^0.8.13;

//IUniswapV2Calleeとは、UniswapV2の呼び出しを表す
interface IUniswapV2Callee {
    //uniswapV2Callとは、UniswapV2の呼び出しを表す
    function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}

//UniswapV2FlashSwapとは、UniswapV2のフラッシュスワップを表す
contract UniswapV2FlashSwap is IUniswapV2Callee {
   address private constant UNISWAP_V2_FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    address private constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    IUniswapV2Factory private constant factory = IUniswapV2Factory(UNISWAP_V2_FACTORY);

    IERC20 private constant weth = IERC20(WETH);

    IUniswapV2Pair private immutable pair;

    uint public amountToRepay;

      constructor() {
         pair = IUniswapV2Pair(factory.getPair(DAI, WETH));
      }

      //flashSwapとは、フラッシュスワップを表す
      function flashSwap(uint amount) external {
         address[] memory path = new address[](2);
         path[0] = DAI;
         path[1] = WETH;
         uint amountRequired = IUniswapV2Router02(ROUTER).getAmountsIn(amount, path)[0];
         IERC20(DAI).transferFrom(msg.sender, address(this), amountRequired);
         IERC20(DAI).approve(ROUTER, amountRequired);
         IUniswapV2Router02(ROUTER).swapExactTokensForETH(amount, 0, path, address(this), block.timestamp);
         weth.approve(address(pair), amount);
         (uint amount0Out, uint amount1Out) = DAI < WETH ? (uint(0), amount) : (amount, uint(0));
         pair.swap(amount0Out, amount1Out, address(this), new bytes(0));
         amountToRepay = amountRequired + amount;
      }

      //uniswapV2Callとは、UniswapV2の呼び出しを表す
      function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external override {
         require(msg.sender == address(pair), "UniswapV2FlashSwap: unauthorized");
         require(sender == address(this), "UniswapV2FlashSwap: unauthorized");
         uint amount = DAI < WETH ? amount1 : amount0;
         require(amount <= amountToRepay, "UniswapV2FlashSwap: insufficient funds");
         weth.transfer(msg.sender, amount);
         amountToRepay = 0;
      }

}

//IUniswapV2Pairとは、UniswapV2のペアを表す
interface IUniswapV2Pair {
    //swapとは、スワップを表す
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
}

//IUniswapV2Factoryとは、UniswapV2のファクトリーを表す
interface IUniswapV2Factory {
    //getPairとは、ペアを取得する
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}



     