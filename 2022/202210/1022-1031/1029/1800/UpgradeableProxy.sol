pragma solidity ^0.8.13;

//ConterV1とは、コントラクトのバージョン管理を行うコントラクト
contract CounterV1 {
   uint public count;

   //incrementとは、カウントを増やす関数
   function increment() external {
      count += 1;
   }
}

//CounterV2とは、コントラクトのバージョン管理を行うコントラクト
contract CounterV2 {
   uint public count;

   //incrementとは、カウントを増やす関数
   function increment() external {
      count += 1;
   }

   //decrementとは、カウントを減らす関数
   function decrement() external {
      count -= 1;
   }
}

//BuggyProxyとは、コントラクトのバージョン管理を行うコントラクト
contract BuggyProxy {
   address public implementation;

   //constructorとは、コンストラクタ
   constructor(address _implementation) {
      implementation = _implementation;
   }

   //delegateとは、コントラクトのバージョン管理を行う関数

   function _delegate() private {
        (bool ok, bytes memory res) = implementation.delegatecall(msg.data);
        require(ok, "delegatecall failed");
    }

   fallback() external payable {
        _delegate();
    }

    receive() external payable {
        _delegate();
    }

   //upgradeToとは、コントラクトのバージョンをアップグレードする関数
   function upgradeTo(address _implementation) external {
      implementation = _implementation;
   }

   //fallbackとは、フォールバック関数
   fallback() external payable {
      (bool success, ) = implementation.delegatecall(msg.data);
      require(success, "BuggyProxy: delegatecall failed");
   }
}

//Devとは、開発者のアドレスを格納する構造体
contract Dev {

   //selectorsとは、関数のセレクターを格納する構造体
   struct selectors {
      bytes4 increment;
      bytes4 decrement;
   }
   address public owner;

   //constructorとは、コンストラクタ
   constructor() {
      owner = msg.sender;
   }
}

contract Proxy {
   bytes32 private constant IMPLEMENTATION_SLOT =
        bytes32(uint(keccak256("eip1967.proxy.implementation")) - 1);
    // 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
    bytes32 private constant ADMIN_SLOT =
        bytes32(uint(keccak256("eip1967.proxy.admin")) - 1);

    constructor() {
        _setAdmin(msg.sender);
    }

    //ifAdminとは、管理者のアドレスかどうかを判定する関数
      modifier ifAdmin() {
         require(msg.sender == _admin(), "Proxy: caller is not the admin");
         _;
      }

      //_getAdminとは、管理者のアドレスを取得する関数
      function _admin() internal view returns (address adm) {
         bytes32 slot = ADMIN_SLOT;
         assembly {
            adm := sload(slot)
         }
      }

      //_setAdminとは、管理者のアドレスを設定する関数
      function _setAdmin(address newAdmin) internal {
         bytes32 slot = ADMIN_SLOT;
         assembly {
            sstore(slot, newAdmin)
         }
      }

      //_implementationとは、コントラクトのバージョンを取得する関数
      function _implementation() internal view returns (address impl) {
         bytes32 slot = IMPLEMENTATION_SLOT;
         assembly {
            impl := sload(slot)
         }
      }

      //_setImplementationとは、コントラクトのバージョンを設定する関数
      function _setImplementation(address newImplementation) internal {
         bytes32 slot = IMPLEMENTATION_SLOT;
         assembly {
            sstore(slot, newImplementation)
         }
      }

      //upgradeToとは、コントラクトのバージョンをアップグレードする関数
      function upgradeTo(address newImplementation) external ifAdmin {
         _setImplementation(newImplementation);
      }
      //adminとは、管理者のアドレスを取得する関数
      function admin() external view returns (address) {
         return _admin();
      }
      //IMPLEMENTATION_SLOTとは、コントラクトのバージョンを格納するスロット
      function implementation() external view returns (address) {
         return _implementation();
      }

}

//ProxyAdminとは、コントラクトのバージョン管理を行うコントラクト
contract ProxyAdmin is Proxy {
   //constructorとは、コンストラクタ
   constructor() {
      _setAdmin(msg.sender);
   }

   //onlyOwnerとは、所有者のアドレスかどうかを判定する関数
   modifier onlyOwner() {
      require(msg.sender == owner, "ProxyAdmin: caller is not the owner");
      _;
   }
   //getProxyAdminとは、コントラクトのバージョン管理を行うコントラクトのアドレスを取得する関数
   function getProxyAdmin(address proxy) external view returns (address) {
      return ProxyAdmin(proxy).admin();
   }

   //getProxyImplementationとは、   コントラクトのバージョンを取得する関数
   function getProxyImplementation(address proxy) external view returns (address) {
      return ProxyAdmin(proxy).implementation();
   }

   //changeProxyAdminとは、コントラクトのバージョン管理を行うコントラクトのアドレスを変更する関数
   function changeProxyAdmin(address proxy, address newAdmin) external onlyOwner {
      ProxyAdmin(proxy).upgradeTo(newAdmin);
   }

   //upgradeとは、コントラクトのバージョンをアップグレードする関数
   function upgrade(address proxy, address newImplementation) external onlyOwner {
      ProxyAdmin(proxy).upgradeTo(newImplementation);
   }

}

//Storageslotとは、ストレージスロットを格納する構造体
contract Storageslot {
   //selectorsとは、関数のセレクターを格納する構造体
   struct selectors {
      bytes4 increment;
      bytes4 decrement;
   }
   //constructorとは、コンストラクタ
   constructor() {
      owner = msg.sender;
   }
}
