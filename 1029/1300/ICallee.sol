pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

import { Account } from "./ISoloMargin.sol";

//ICalleeとは、Calleeのインターフェースです。

interface ICallee {
    //callFunctionとは、関数を呼び出すための関数です。
    function callFunction(
        address sender,
        Account.Info memory account,
        bytes memory data
    ) external;

    
}