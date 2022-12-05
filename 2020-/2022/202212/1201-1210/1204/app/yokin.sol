pragma solidity ^0.4.24;

contract Yokin {
    address public owner;
    uint public total;
    uint public count;
    mapping (uint => uint) public balances;
    mapping (uint => address) public accounts;

    constructor() public {
        owner = msg.sender;
    }

    function deposit() public payable {
        balances[count] = msg.value;
        accounts[count] = msg.sender;
        total += msg.value;
        count++;
    }

    function withdraw(uint _id) public {
        require(msg.sender == accounts[_id]);
        uint amount = balances[_id];
        balances[_id] = 0;
        accounts[_id].transfer(amount);
        total -= amount;
    }

    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}