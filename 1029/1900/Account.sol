pragma solidity ^0.8.13;

//Accountとは、アカウント
contract Account {
   uint public balance;
    uint public constant MAX_UINT = 2**256 - 1;

   //depositとは、入金する関数
   function deposit(uint _amount) public {
      balance += _amount;
   }

   //withdrawとは、出金する関数
   function withdraw(uint _amount) public {
      balance -= _amount;
   }

   
}