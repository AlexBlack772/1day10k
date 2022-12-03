pragma solidity ^0.8.13;

contract senpuuki {

   uint public time;
   uint public startAt;
   uint public endAt;

   
   mapping(address => uint256) public balancesOf;

   enum strong{
         low,
         midium,
         hight
   }

   event Start();
   event Stop();
   event Up(address indexed _from, uint _time);
   
   function start() public view returns (uint256 _startAt) {
       startAt = block.timestamp;
       balanceOf[msg.sender] -= 10;
       emit Start();
   }

   function stop() public {
       endAt = block.timestamp;
       if (10 < endAt - startAt)  {
           balanceOf[msg.sender] += 10;
       }
       emit Stop();
   }

   function up(uint time) public {
       return time;
       emit up();
   }

   function balanceOf(address _owner) public view returns (uint256 balance) {
       return balanceOf[_owner];
   }


}