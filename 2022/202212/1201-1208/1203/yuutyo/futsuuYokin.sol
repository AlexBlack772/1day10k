pragma solidity ^0.8.0;

contract futsuuYokin {

   uint public  time;
   uint public  riritsu;
   uint public  price;
   address public  owner;
   mapping(address => uint) public  balanceOf;
   uint public  _value;

   modifier onlyOwner() {
       require(msg.sender == owner);
       _;
   }

   function desposit (uint yokin) payable public onlyOwner {
      balanceOf[msg.sender] += msg.value;
   }

   function withdraw (uint syukkin) public onlyOwner {
      require(balanceOf[msg.sender] >= _value);
      balanceOf[msg.sender] -= _value;
      payable(msg.sender).transfer(_value);
   }

   function transfer(address _to, uint _value) public onlyOwner {
      require(balanceOf[msg.sender] >= _value);
      balanceOf[msg.sender] -= _value;
      balanceOf[_to] += _value;
   }

   
}