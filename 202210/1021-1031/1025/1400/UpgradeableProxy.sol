pragma solidity ^0.8.13;

contract CounterV1 {
   uint public count;
   
   function increment() public {
      count += 1;
   }
   
}

contract CounterV2 {
   uint public count;
   
   function increment() public {
      count += 1;
   }
   
   function decrement() public {
      count -= 1;
   }
   
}

contract BuggyProxy {
   address public implementation;
   
   constructor(address _implementation) {
      implementation = _implementation;
   }

   function _delegate() private {

   }
   
   fallback() external payable {
      (bool success, ) = implementation.delegatecall(msg.data);
      require(success);
   }

   receive() external payable {
      (bool success, ) = implementation.delegatecall(msg.data);
      require(success);
   }

   function upgradeTo(address _newImplementation) public {
      implementation = _newImplementation;
   }
   
}

contract Dev {
   function selectors() public pure returns (bytes4) {
      return this.selectors.selector;
   }
}

contract Proxy {
   bytes private constant _EMPTY = bytes32(0);

   bytes32 private constant _ADMIN_SLOT = 0x0;

   bytes32 private constant _IMPLEMENTATION_SLOT = 0x1;

   constructor() {
      _setAdmin(msg.sender);
   }

   modifier ifAdmin() {
      if (msg.sender == _admin()) {
         _;
      }
   }

   function _getAdmin() private view returns (address) {
      bytes32 slot = _ADMIN_SLOT;
      assembly {
         return sload(slot)
      }
   }

   function _setAdmin(address _newAdmin) private {
      bytes32 slot = _ADMIN_SLOT;
      assembly {
         sstore(slot, _newAdmin)
      }
   }

   function _getImplementation() private view returns (address) {
      bytes32 slot = _IMPLEMENTATION_SLOT;
      assembly {
         return sload(slot)
      }
   }

   function _setImplementation(address _newImplementation) private {
      bytes32 slot = _IMPLEMENTATION_SLOT;
      assembly {
         sstore(slot, _newImplementation)
      }
   }

   function changeAdmin(address _newAdmin) public ifAdmin {
      _setAdmin(_newAdmin);
   }

   function upgradeTo(address _newImplementation) public ifAdmin {
      _setImplementation(_newImplementation);
   }

   function admin() public view returns (address) {
      return _getAdmin();
   }

   function implementation() public view returns (address) {
      return _getImplementation();
   }

   function _delegate(address _implementation) private {
      assembly {
         calldatacopy(0, 0, calldatasize())
         let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)
         returndatacopy(0, 0, returndatasize())
         switch result
         case 0 { revert(0, returndatasize()) }
         default { return(0, returndatasize()) }
      }
   }

   function _fallback() private {
      _delegate(_getImplementation());
   }

   fallback() external payable {
      _fallback();
   }

   receive() external payable {
      _fallback();
   }
}

contract ProxyAdmin {
   function changeAdmin(address _proxy, address _newAdmin) public {
      Proxy(_proxy).changeAdmin(_newAdmin);
   }

   function upgradeTo(address _proxy, address _newImplementation) public {
      Proxy(_proxy).upgradeTo(_newImplementation);
   }

   function getProxyAdmin(address _proxy) public view returns (address) {
      return Proxy(_proxy).admin();
   }

   function getProxyImplementation(address _proxy) public view returns (address) {
      return Proxy(_proxy).implementation();
   }

   function changeProxyAdmin(address _proxy, address _newAdmin) public {
      Proxy(_proxy).changeAdmin(_newAdmin);
   }

   function upgrade(address _proxy, address _newImplementation) public {
      Proxy(_proxy).upgradeTo(_newImplementation);
   }

}

library StroageSlot {
   struct AddressSlot {
      address value;
   }

   function getAddressSlot(bytes32 _slot) internal pure returns (AddressSlot storage slot) {
      assembly {
         slot.slot := _slot
      }
   }

}

contract TestSlot {
   bytes public constant slot = 
}