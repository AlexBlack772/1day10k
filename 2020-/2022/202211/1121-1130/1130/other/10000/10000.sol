pragma solidity ^0.5.0;

contract Test {

   address public owner;
   uint public value;
   uint public startAt;
   uint public endAt;

   mapping (address => uint) public balances;

   constructor() public {
       owner = msg.sender;
   }

   function add(uint x,uint y) public pure returns (uint) {
       return x + y;
   }

   function div(uint x,uint y) public pure returns (uint) {
       return x / y;
   }

   function mul(uint x,uint y) public pure returns (uint) {
       return x * y;
   }

   function iff(uint x) private {
   if (x = 5){
      console.log("x is 5");
   }else {
      console.log("x is not 5");
   }
   }

   function getBalanceOf(address _address) public view returns (uint) {
       return _address.balances;
   }

   function transfer(address payable _to, uint _amount) public {
       require(_amount <= balances[msg.sender], "Insufficient balance.");
       balances[msg.sender] -= _amount;
       balances[_to] += _amount;
   }

   //transfer(x, fee);

   function transferFrom(address _from, address _to, uint _amount) public {
       require(_amount <= balances[_from], "Insufficient balance.");
       balances[_from] -= _amount;
       balances[_to] += _amount;
   }

   //transferFrom(x, y, fee);

   function approve(address _spender, uint _amount) public {
       require(_amount <= balances[msg.sender], "Insufficient balance.");
       balances[msg.sender] -= _amount;
       balances[_spender] += _amount;
   }

   //approve(x, fee);

   function allowance(address _spender, uint _addedValue) public {
       require(_addedValue <= balances[msg.sender], "Insufficient balance.");
       balances[msg.sender] -= _addedValue;
       balances[_spender] += _addedValue;
   }






}