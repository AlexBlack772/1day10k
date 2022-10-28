pragma solidity ^0.8.13;

//CounterV1とは、カウントを行うコントラクトです。
contract CounterV1 {
    uint public count;
    
    //incrementとは、カウントを増やす関数です。
    function increment() public {
        count += 1;
    }
}

//CounterV2とは、カウントを行うコントラクトです。
contract CounterV2 {
    uint public count;
    
    //incrementとは、カウントを増やす関数です。
    function increment() public {
        count += 1;
    }
    
    //decrementとは、カウントを減らす関数です。
    function decrement() public {
        count -= 1;
    }
}

//BuggyProxyとは、CounterV1とCounterV2のコントラクトをプロキシするコントラクトです。
contract BuggyProxy {
    address public implementation;
    
    constructor(address _implementation) {
        implementation = _implementation;
    }
    
    //_delegateとは、プロキシするコントラクトを呼び出す関数です。
      function _delegate(address _implementation) internal {
         assembly {
               calldatacopy(0, 0, calldatasize())
               let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)
               returndatacopy(0, 0, returndatasize())
               switch result
               case 0 { revert(0, returndatasize()) }
               default { return(0, returndatasize()) }
         }
      }

    fallback() external payable {
        (bool success, bytes memory returndata) = implementation.delegatecall(msg.data);
        if (success) {
            this;
        } else {
            revert();
        }
    }

    //upgradeToとは、プロキシするコントラクトをアップグレードする関数です。
      function upgradeTo(address _implementation) external {
         implementation = _implementation;
      }

}

//Devとは、開発者のアドレスです。
contract Dev {
   //selectorsとは、関数のセレクターです。
   bytes4 constant public incrementSelector = bytes4(keccak256("increment()"));

}

//Proxyとは、CounterV1とCounterV2のコントラクトをプロキシするコントラクトです。
contract Proxy {
     // 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
    bytes32 private constant IMPLEMENTATION_SLOT =
        bytes32(uint(keccak256("eip1967.proxy.implementation")) - 1);
    // 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
    bytes32 private constant ADMIN_SLOT =
        bytes32(uint(keccak256("eip1967.proxy.admin")) - 1);

        //constructとは、コントラクトを初期化する関数です。
      constructor(address _implementation) {
         _setImplementation(_implementation);
         _setAdmin(msg.sender);
      }

      //ifAdminとは、管理者のアドレスであるかを確認する関数です。
      modifier ifAdmin() {
         require(msg.sender == _admin(), "Not admin");
         _;
      }
      //_getAdminとは、管理者のアドレスを取得する関数です。
      function _admin() internal view returns (address adm) {
         bytes32 slot = ADMIN_SLOT;
         assembly {
               adm := sload(slot)
         }
      }
      //_setAdminとは、管理者のアドレスを設定する関数です。
      function _setAdmin(address newAdmin) internal {
         bytes32 slot = ADMIN_SLOT;
         assembly {
               sstore(slot, newAdmin)
         }
      }
      //_getImplementationとは、プロキシするコントラクトのアドレスを取得する関数です。
      function _implementation() internal view returns (address impl) {
         bytes32 slot = IMPLEMENTATION_SLOT;
         assembly {
               impl := sload(slot)
         }
      }
      //_setImplementationとは、プロキシするコントラクトのアドレスを設定する関数です。
      function _setImplementation(address newImplementation) internal {
         bytes32 slot = IMPLEMENTATION_SLOT;
         assembly {
               sstore(slot, newImplementation)
         }
      }
      //changeAdminとは、管理者のアドレスを変更する関数です。
      function changeAdmin(address newAdmin) external ifAdmin {
         _setAdmin(newAdmin);
      }
      //upgradeToとは、プロキシするコントラクトをアップグレードする関数です。
      function upgradeTo(address newImplementation) external ifAdmin {
         _setImplementation(newImplementation);
      }
      //implementationとは、プロキシするコントラクトのアドレスを取得する関数です。
      function implementation() external view returns (address) {
         return _implementation();
      }
      //adminとは、管理者のアドレスを取得する関数です。
      function admin() external view returns (address) {
         return _admin();
      }
      //_delegateとは、プロキシするコントラクトを呼び出す関数です。
      function _delegate(address implementation) internal {
         assembly {
               calldatacopy(0, 0, calldatasize())
               let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)
               returndatacopy(0, 0, returndatasize())
               switch result
               case 0 { revert(0, returndatasize()) }
               default { return(0, returndatasize()) }
         }
      }
      //_fallbackとは、プロキシするコントラクトを呼び出す関数です。
      function _fallback() internal {
         _delegate(_implementation());
      }
      //fallbackとは、プロキシするコントラクトを呼び出す関数です。
      fallback() external payable {
         _fallback();
      }


}

contract ProxyAdmin {
   address public owner;

    constructor() {
        owner = msg.sender;
    }

    //onlyOwnerとは、オーナーのアドレスであるかを確認する関数です。
      modifier onlyOwner() {
         require(msg.sender == owner, "Not owner");
         _;
      }
      //getProxyAdminとは、プロキシするコントラクトの管理者のアドレスを取得する関数です。
      function getProxyAdmin(address proxy) external view returns (address) {
         return Proxy(proxy).admin();
      }
      //getProxyImplementationとは、プロキシするコントラクトのアドレスを取得する関数です。
      function getProxyImplementation(address proxy) external view returns (address) {
         return Proxy(proxy).implementation();
      }
      //changeProxyAdminとは、プロキシするコントラクトの管理者のアドレスを変更する関数です。
      function changeProxyAdmin(address proxy, address newAdmin) external onlyOwner {
         Proxy(proxy).changeAdmin(newAdmin);
      }
      //upgradeとは、プロキシするコントラクトをアップグレードする関数です。
      function upgrade(address proxy, address newImplementation) external onlyOwner {
         Proxy(proxy).upgradeTo(newImplementation);
      }
}

//StrorageSlotとは、ストレージスロットを取得する関数です。
library StrorageSlot {
   //addressslotとは、アドレスのストレージスロットを取得する関数です。
   function addressslot(bytes32 slot) internal pure returns (bytes32) {
      return slot;
   }
   //getAddressSlotとは、アドレスのストレージスロットを取得する関数です。
   function getAddressSlot(bytes32 slot) internal pure returns (bytes32) {
      return slot;
   }

}

//testSlotとは、ストレージスロットを取得する関数です。
contract testSlot {
   //testとは、アドレスのストレージスロットを取得する関数です。
   function test() public pure returns (bytes32) {
      return StrorageSlot.addressslot(0x1234567890123456789012345678901234567890123456789012345678901234);
   }
}
