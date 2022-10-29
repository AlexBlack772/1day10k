pragma solidity ^0.8.13;

//IUniswapV2Calleeとは、UniswapV2Calleeのインターフェース
interface IUniswapV2Callee {
   //uniswapV2Callとは、UniswapV2Calleeを呼び出す関数
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
    
    uint public amountToRepay;

      constructor() {
         pair = IUniswapV2Pair(factory.getPair(WETH, DAI));
      }

      //flashSwapとは、FlashSwapを行う関数
      function flashSwap(uint amount) external {
         weth.approve(address(pair), amount);
         pair.swap(0, amount, address(this), new bytes(0));
      }

      //uniswapV2Callとは、UniswapV2Calleeを呼び出す関数
      function uniswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external override {
         require(msg.sender == address(pair), "UniswapV2FlashSwap: unauthorized");
         require(amount0 == 0 || amount1 == 0, "UniswapV2FlashSwap: invalid swap");

         uint amount = amount0 == 0 ? amount1 : amount0;

         amountToRepay = amount * 2;

         weth.transfer(msg.sender, amountToRepay);
      }
}

//IUniswapV2Pairとは、UniswapV2Pairのインターフェース

interface IUniswapV2Pair {
   //swapとは、トークンを交換する関数
    function swap(
        uint amount0Out,
        uint amount1Out,
        address to,
        bytes calldata data
    ) external;
}

//IUniswapV2Factoryとは、UniswapV2Factoryのインターフェース
interface IUniswapV2Factory {
   //getPairとは、ペアのアドレスを取得する関数
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

