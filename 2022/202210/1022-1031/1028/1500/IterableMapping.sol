pragma solidity ^0.8.13;

//IterableMappingとは、イテラブルマッピングのコントラクトです。
library IterableMapping {
   //Mapとは、マップの構造体です。
   struct Map {
       //keyとは、キーの配列です。
       KeyFlag[] keys;
       //valuesとは、値のマップです。
       mapping(uint => Value) values;
       //sizeとは、サイズの変数です。
       uint size;
   }

   //getとは、値を取得する関数です。
   function get(Map storage map, uint key) internal view returns (uint) {
       return map.values[key].value;
   }

   //getKeyAtIndexとは、キーを取得する関数です。
   function getKeyAtIndex(Map storage map, uint index) internal view returns (uint) {
       return map.keys[index].key;
   }

   //sizeとは、サイズを取得する関数です。
   function size(Map storage map) internal view returns (uint) {
       return map.size;
   }

   //setとは、値を設定する関数です。
   function set(Map storage map, uint key, uint val) internal {
       if (map.values[key].keyIndex > 0) {
           map.values[key].value = val;
       } else {
           map.values[key] = Value({
               value: val,
               keyIndex: map.keys.length
           });
           map.keys.push(KeyFlag({
               key: key,
               deleted: false
           }));
           map.size++;
       }
   }
   //removeとは、値を削除する関数です。
   function remove(Map storage map, uint key) internal {
       if (map.values[key].keyIndex == 0) {
           return;
       }

       map.values[key].value = 0;
       map.values[key].keyIndex = 0;
       map.keys[map.values[key].keyIndex].deleted = true;
       map.size --;
   }

   
}

//TestIterableMapとは、イテラブルマッピングのテストコントラクトです
contract TestIterableMap {
   //mapとは、マップの変数です。
   IterableMapping.Map private map;

   
}
