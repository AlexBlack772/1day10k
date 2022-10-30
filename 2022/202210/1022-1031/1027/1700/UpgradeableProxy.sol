pragma solidity ^0.8.13;

contract CounterV1 {
    uint public count;

    //incとは、インクリメントする
    function inc() external {
        count += 1;
    }
}

contract CounterV2 {
    uint public count;

    function inc() external {
        count += 1;
    }

    function dec() external {
        count -= 1;
    }
}

//BuggyProxyとは、バグのあるプロキシ