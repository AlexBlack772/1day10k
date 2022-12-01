pragma solidity ^0.8.13;

contract Proxy {
   event Deploy(address);

   receive() external payable {}

   function deploy(bytes memory _code) public {
       address addr;
       assembly {
           addr := create(0, add(_code, 0x20), mload(_code))
           if iszero(extcodesize(addr)) {
               revert(0, 0)
           }
       }
       require (addr != address(0));
       emit Deploy(addr);
   }

   function execute(address _target, bytes memory _data) public payable returns (bytes memory) {
       (bool success, bytes memory result) = _target.call{value: msg.value}(_data);
       require(success);
   }


}

contract TestContract1 {
   address public owner = msg.sender;

   function setOwner(address _owner) public {
      require(msg.sender == owner);
       owner = _owner;
   }
}

contract TestContract2 {
   address public owner = msg.sender;
   uinit public value = msg.value;

}

contract Helper {
   function getBytecode() public pure returns (bytes memory) {
       return type(TestContract1).creationCode;
   }
}