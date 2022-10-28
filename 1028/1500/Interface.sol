pragma　solidity ^0.8.13;

//Counterとは、カウンターのコントラクトです。
contract Counter {
    //countとは、カウントの変数です。
    uint public count = 0;
    //incrementとは、カウントを増やす関数です。
    function increment() public {
        count += 1;
    }
}

//ICounterとは、カウンターのインターフェースです。
interface ICounter {
    //countとは、カウントの変数です。
    function count() external view returns (uint);
    //incrementとは、カウントを増やす関数です。
    function increment() external;
}

//MyContractとは、コントラクトです。
contract MyContract {
    //incrementCounterとは、カウンターを増やす関数です。
      function incrementCounter(address _counter) public {
         ICounter(_counter).increment();
      }
      //getCounterとは、カウンターを取得する関数です。
      function getCounter(address _counter) public view returns (uint) {
         return ICounter(_counter).count();
      }
}

//UniswapV2Factoryとは、UniswapV2のファクトリーのコントラクトです。
interface UniswapV2Factory {
    //getPairとは、ペアを取得する関数です。
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

//UniswapV2Pairとは、UniswapV2のペアのコントラクトです。
interface UniswapV2Pair {
    //getReservesとは、リザーブを取得する関数です。
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

//UniswapV2Router02とは、UniswapV2のルーターのコントラクトです。
interface UniswapV2Router02 {
    //factoryとは、ファクトリーの変数です。
    function factory() external pure returns (address);
    //WETHとは、WETHの変数です。
    function WETH() external pure returns (address);
    //getAmountsOutとは、アウトのアウトプットを取得する関数です。
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    //swapExactETHForTokensとは、ETHをトークンに交換する関数です。
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);
}
