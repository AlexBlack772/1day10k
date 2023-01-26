//spdx-license-identifier: GPL-3.0
pragma solidity ^0.8.17;

contract construct {
    address public immutable MY_ADDRESS;
   // uint public immutable MY_UINT;

     //uint _myUint = 0;
     //MY_UINT = _myUint;
    constructor() {
        MY_ADDRESS = msg.sender;
    }

    uint public num;

    // You need to send a transaction to write to a state variable.
    function set(uint _num) public {
        num = _num;
    }

    // You can read from a state variable without sending a transaction.
    function get() public view returns (uint) {
        return num;
    }

}