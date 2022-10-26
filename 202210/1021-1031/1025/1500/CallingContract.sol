pragma solidity ^0.8.13;

contract Callee {
   uint public x;
   uint public value;

   function setX(uint _x) public payable {
       x = _x;
       value = msg.value;
   }

   function setXAndSendEther(uint _x, address payable _to) public payable {
       x = _x;
       value = msg.value;
       _to.transfer(msg.value);
   }

}

contract Caller {
   function setX(Callee _callee, uint _x) public payable {
       (bool success, ) = address(_callee).call{value: msg.value}(abi.encodeWithSignature("setX(uint256)", _x));
       require(success, "External call failed");
   }

   function setXFromAddress(address _callee, uint _x) public payable {
       (bool success, ) = _callee.call{value: msg.value}(abi.encodeWithSignature("setX(uint256)", _x));
       require(success, "External call failed");
   }

   function setXAndSendEther(Callee _callee, uint _x, address payable _to) public payable {
       (bool success, ) = address(_callee).call{value: msg.value}(abi.encodeWithSignature("setXAndSendEther(uint256,address)", _x, _to));
       require(success, "External call failed");
   }

   
}