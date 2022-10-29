pragma solidity ^0.8.13;

//Arrayとは、配列のことです。
contract Array {
   uint[] public arr;
    uint[] public arr2 = [1, 2, 3];
    
    uint[10] public myFixedSizeArr;

    //getとは、配列の値を取得する関数です。
      function get(uint i) public view returns (uint) {
         return arr[i];
      }

      //getArrとは、配列の値を取得する関数です。
      function getArr() public view returns (uint[] memory) {
         return arr;
      }

      //pushとは、配列の値を追加する関数です。
      function push(uint i) public {
         arr.push(i);
      }

      //popとは、配列の値を削除する関数です。
      function pop() public {
         arr.pop();
      }

      //lengthとは、配列の長さを取得する関数です。
      function length() public view returns (uint) {
         return arr.length;
      }

      //removeとは、配列の値を削除する関数です。
      function remove(uint index) public {
         delete arr[index];
      }

      //setとは、配列の値を設定する関数です。
      function set(uint index, uint val) public {
         arr[index] = val;
      }

      
}