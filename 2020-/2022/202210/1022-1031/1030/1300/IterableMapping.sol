pragma solidity ^0.8.13;

//IterableMappingとは、イテラブルマッピング
library IterableMapping {

   //Mapとは、イテラブルマッピング
   struct Map {
      address[] keys;
      mapping(address => uint) values;
      mapping(address => uint) indexOf;
      mapping(address => bool) inserted;
   }

   //getとは、値を取得する関数
   function get(Map storage map, address key) public view returns (uint) {
      return map.values[key];
   }

   //getKeyAtIndexとは、インデックスからキーを取得する関数
   function getKeyAtIndex(Map storage map, uint index) public view returns (address) {
      return map.keys[index];
   }

   //sizeとは、サイズを取得する関数
   function size(Map storage map) public view returns (uint) {
      return map.keys.length;
   }
   
   //setとは、値を設定する関数
   function set(Map storage map, address key, uint val) public {
      if (map.inserted[key]) {
         map.values[key] = val;
      } else {
         map.inserted[key] = true;
         map.values[key] = val;
         map.indexOf[key] = map.keys.length;
         map.keys.push(key);
      }
   }

   //removeとは、値を削除する関数
   function remove(Map storage map, address key) public {
      if (!map.inserted[key]) {
         return;
      }

      delete map.inserted[key];
      delete map.values[key];

      uint index = map.indexOf[key];
      uint lastIndex = map.keys.length - 1;
      address lastKey = map.keys[lastIndex];

      map.indexOf[lastKey] = index;
      delete map.indexOf[key];

      map.keys[index] = lastKey;
      map.keys.pop();
   }

}

contract TestIterableMap {
    using IterableMapping for IterableMapping.Map;

    IterableMapping.Map private map;

    //testIterableMapとは、イテラブルマッピングをテストする関数
      function testIterableMap() public {
         map.set(0x0000000000000000000000000000000000000001, 1);
         map.set(0x0000000000000000000000000000000000000002, 2);
         map.set(0x0000000000000000000000000000000000000003, 3);
   
         assert(map.size() == 3);
         assert(map.get(0x0000000000000000000000000000000000000001) == 1);
         assert(map.get(0x0000000000000000000000000000000000000002) == 2);
         assert(map.get(0x0000000000000000000000000000000000000003) == 3);
   
         assert(map.getKeyAtIndex(0) == 0x0000000000000000000000000000000000000001);
         assert(map.getKeyAtIndex(1) == 0x0000000000000000000000000000000000000002);
         assert(map.getKeyAtIndex(2) == 0x0000000000000000000000000000000000000003);
   
         map.remove(0x0000000000000000000000000000000000000001);
   
         assert(map.size() == 2);
         assert(map.get(0x0000000000000000000000000000000000000001) == 0);
         assert(map.get(0x0000000000000000000000000000000000000002) == 2);
         assert(map.get(0x0000000000000000000000000000000000000003) == 3);
   
         assert(map.getKeyAtIndex(0) == 0x0000000000000000000000000000000000000003);
         assert(map.getKeyAtIndex(1) == 0x0000000000000000000000000000000000000002);
      }
      
}