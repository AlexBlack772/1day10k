pragma solidity ^0.8.13;

contract Chair {

    uint public time;

    uint public price;


   event StandUp(address indexed _from, uint _time);
   event Sit( address _from, uint256 _time);


   function sit(uint sittime) public  returns (uint256) {
       price = sittime* 10;
       return price;
       emit Sit(msg.sender , sittime);
   }
   
}