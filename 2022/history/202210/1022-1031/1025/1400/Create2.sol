pragma solidity ^0.8.13;

contract Factory {
   function deploy(
      address _owner,
      
   ) public {
      new Contract(_owner);
   }
}

contract FactoryAssembly {
   event Deployed(address addr);

   function getBytecode(address _owner) public pure returns (bytes memory) {
      bytes memory bytecode = type(Contract).creationCode;

      return abi.encodePacked(
         type(Contract).creationCode,
         abi.encode(_owner)
      );
   }

   function getAddress(bytes memory _bytecode) public pure returns (address) {
      bytes32 salt = keccak256(abi.encodePacked(_bytecode));

      return address(uint160(uint256(keccak256(abi.encodePacked(
         hex"ff",
         address(this),
         salt,
         keccak256(_bytecode)
      )))));
   }
}