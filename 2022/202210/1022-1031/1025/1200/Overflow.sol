pragma solidity ^0.8.13;

contract TimeLock {
   mapping (address => uint) public balances;
   mapping (address => uint) public lockTime;

   function deposit() public payable {
      balances[msg.sender] += msg.value;
      lockTime[msg.sender] = block.timestamp + 1 weeks;
   }

   function increaseLockTime(uint _secondsToIncrease) public {
      lockTime[msg.sender] += _secondsToIncrease;
   }

   function withdraw() public {
      require(balances[msg.sender] > 0, "Insufficient balance");
      require(block.timestamp > lockTime[msg.sender], "Account is locked");

      uint amount = balances[msg.sender];
      balances[msg.sender] = 0;

      (bool success, ) = msg.sender.call{value: amount}("");
      require(success, "Transfer failed");
   }
}

contract Attack {
   TimeLock public timeLock;

   constructor(TimeLock _timeLock) {
      timeLock = TimeLock(_timeLock);
   }

   function attack() public payable {
      timeLock.deposit{value: msg.value}();
      timeLock.withdraw();
   }

}