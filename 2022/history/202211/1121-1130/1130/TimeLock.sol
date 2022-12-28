pragma solidity ^0.8.13;

contract TimeLock {
    uint public startAt;
    uint public endAt;
    uint public totalAmount;
    address payable public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }
    
    constructor(uint _startAt, uint _endAt, uint _totalAmount) {
        startAt = _startAt;
        endAt = _endAt;
        totalAmount = _totalAmount;
        owner = payable(msg.sender);
    }
    
    function TimeLockDeposit() public payable onlyOwner {
        require(block.timestamp >= startAt && block.timestamp <= endAt, "not in the farm period");
        require(msg.value <= totalAmount, "exceed the total amount");
    }

    

   
}
