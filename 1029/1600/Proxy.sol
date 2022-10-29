pragma solidity ^0.8.13;

//Proxyとは、プロキシコントラクト
contract Proxy {
   event Deploy(address);

    receive() external payable {}

   //deployとは、コントラクトをデプロイする関数
   function deploy(bytes memory _code) public returns (address) {
      address addr;
      assembly {
         addr := create(0, add(_code, 0x20), mload(_code))
         if iszero(extcodesize(addr)) {
            revert(0, 0)
         }
      }
      emit Deploy(addr);
      return addr;
   }

   //execute
   function execute(address _addr, bytes memory _data) public payable returns (bytes memory) {
      (bool success, bytes memory result) = _addr.call{value: msg.value}(_data);
      require(success);
      return result;
   }

}

//TestContract1とは、テストコントラクト1
contract TestContract1 {
   uint public x;

   //setとは、値を設定する関数
   function set(uint _x) public {
      x = _x;
   }

}

//TestContract2とは、テストコントラクト2
contract TestContract2 {
   address public owner = msg.sender;
    uint public value = msg.value;
    uint public x;
    uint public y;

   //setとは、値を設定する関数
   function set(uint _y) public {
      y = _y;
   }

}

//Helperとは、ヘルパー関数
contract Helper {
   //deployAndCallとは、コントラクトをデプロイして、コントラクトを呼び出す関数
   function deployAndCall(bytes memory _code, bytes memory _data) public payable returns (address) {
      Proxy proxy = new Proxy();
      address addr = proxy.deploy{value: msg.value}(_code);
      proxy.execute{value: msg.value}(addr, _data);
      return addr;
   }

   //getBytecode1とは、コントラクトのバイトコードを取得する関数
   function getBytecode1() public pure returns (bytes memory) {
      return type(TestContract1).creationCode;
   }
   //getBytecode2とは、コントラクトのバイトコードを取得する関数
   function getBytecode2() public pure returns (bytes memory) {
      return type(TestContract2).creationCode;
   }
   //getCalldata1とは、コントラクトの呼び出しデータを取得する関数 
   function getCalldata1() public pure returns (bytes memory) {
      return abi.encodeWithSignature("set(uint256)", 1);
   }
   

}
