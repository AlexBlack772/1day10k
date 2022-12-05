pragma solidity ^0.8.0;

contract Nihonginkou {
    address public owner;
    uint public total;
    uint public count;
    mapping (uint => uint) public balances;
    mapping (uint => address) public accounts;

    constructor() {
        owner = msg.sender;
    }

    function kaiOP () public {
         require(msg.sender == owner);
         selfdestruct(owner);
    }

    function uriOP () public {
         require(msg.sender == owner);
         selfdestruct(owner);
    }

    function tokenHakkou() public {
         require(msg.sender == owner);
         address payable to = payable(msg.sender);
    }

    function tokenBurn() public {
         require(msg.sender == owner);
         address payable to = payable(msg.sender);
    }

    


}