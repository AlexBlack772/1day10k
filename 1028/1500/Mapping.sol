pragma solidity ^0.8.13;

//Mappingとは、マッピングのコントラクトです。
contract Mapping {
   //mappingとは、マッピングです。
   mapping(address => uint) public balances;
   //getとは、マッピングの値を返す関数です。
   function get(address _addr) public view returns (uint) {
      return balances[_addr];
   }
   //setとは、マッピングの値を設定する関数です。
   function set(address _addr, uint _value) public {
      balances[_addr] = _value;
   }
   //removeとは、マッピングの値を削除する関数です。
   function remove(address _addr) public {
      delete balances[_addr];
   }

}

//NestedMappingとは、ネストしたマッピングのコントラクトです。
contract NestedMapping {
   //mappingとは、マッピングです。
   mapping(address => mapping(uint => bool)) public nestedMapping;
   //getとは、マッピングの値を返す関数です。
   function get(address _addr, uint _index) public view returns (bool) {
      return nestedMapping[_addr][_index];
   }
   //setとは、マッピングの値を設定する関数です。
   function set(address _addr, uint _index, bool _value) public {
      nestedMapping[_addr][_index] = _value;
   }
   //removeとは、マッピングの値を削除する関数です。
   function remove(address _addr, uint _index) public {
      delete nestedMapping[_addr][_index];
   }


}