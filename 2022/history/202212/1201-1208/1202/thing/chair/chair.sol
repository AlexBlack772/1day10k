pragma solidity ^0.8.13;

contract Chair {

    uint public time;

    uint public price;


   event StandUp(address indexed _from, uint _time);
   event Sit( address _from, uint256 _time);

   struct

   function sit(uint sittime) public {
       price = sittime* 10
       return price ;
       emit Sit();
   }
   
}