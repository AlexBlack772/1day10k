pragma solidity ^0.8.13;

contract VendingMachine {
    uint public price1 = 100;
    uint public price2 = 120;
    mapping (address => uint) public balances;

    event Buy(address indexed _from, uint _price);

    function buy(uint price1) public payable {
         require(msg.value == price1);
         msg.sender.transfer(msg.value);

         emit Buy(msg.sender, 100);
    }

    function bounsPlusOne(uint price2) public payable {
         require(msg.value == price2);
         msg.sender.transfer(msg.value);

         emit Buy(msg.sender, 0);
    }

}