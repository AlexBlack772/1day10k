pragma solidity ^0.8.0;

contract bdoBnak {

   uint public total;
   uint public count;
   uint public accounts[];
   mapping (uint => uint) public balances;


   function withdraw(uint _id) public {
       require(msg.sender == accounts[_id]);
       uint amount = balances[_id];
       balances[_id] = 0;
       accounts[_id].transfer(amount);
       total -= amount;
   }

   function deposit() public payable {
       balances[count] = msg.value;
       accounts[count] = msg.sender;
       total += msg.value;
       count++;
   }


}