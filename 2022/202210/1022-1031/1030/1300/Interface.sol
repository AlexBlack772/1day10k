pragma solidity ^0.8.13;

//Counterとは、カウンター
contract Counter {
    uint public count;

    function increment() external {
        count += 1;
    }
}

//ICounterとは、Counterのインターフェース
interface ICounter {
    function count() external view returns (uint);

    function increment() external;
}

contract MyContract {
   //incrementCounterとは、Counterのインスタンスを作成し、incrementを呼び出す関数
    function incrementCounter(address _counter) external {
        ICounter(_counter).increment();
    }

      //getCountとは、Counterのインスタンスを作成し、countを呼び出す関数
      function getCount(address _counter) external view returns (uint) {
         return ICounter(_counter).count();
      }

}

interface UniswapV2Factory {
   //getPairとは、トークンペアを取得する関数
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);
}

interface UniswapV2Pair {
   //getReservesとは、トークンの残高を取得する関数
    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );
}

contract UniswapExample {
    address private factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

}