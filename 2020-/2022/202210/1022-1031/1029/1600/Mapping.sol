pragma solidity ^0.8.13;

//Mappingとは、マッピングを扱うコントラクト
contract Mapping {
   mapping(address => uint) public myMap;

   //getとは、マッピングの値を取得する関数
   function get(address _addr) public view returns (uint) {
      return myMap[_addr];
   }

   //setとは、マッピングの値を設定する関数
   function set(address _addr, uint _i) public {
      myMap[_addr] = _i;
   }

   //removeとは、マッピングの値を削除する関数
   function remove(address _addr) public {
      delete myMap[_addr];
   }

}

//NestedMappingとは、ネストされたマッピングを扱うコントラクト
contract NestedMapping {
   mapping(address => mapping(uint => bool)) public nestedMap;

   //getとは、ネストされたマッピングの値を取得する関数
   function get(address _addr1, uint _i) public view returns (bool) {
      return nestedMap[_addr1][_i];
   }

   //setとは、ネストされたマッピングの値を設定する関数
   function set(address _addr1, uint _i, bool _boo) public {
      nestedMap[_addr1][_i] = _boo;
   }

   //removeとは、ネストされたマッピングの値を削除する関数
   function remove(address _addr1, uint _i) public {
      delete nestedMap[_addr1][_i];
   }

}