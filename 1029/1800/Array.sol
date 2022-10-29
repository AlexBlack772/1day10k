pragma solidity ^0.8.13;

//Arrayとは、配列を扱うコントラクト
contract Array {
   uint[] public arr;
    uint[] public arr2 = [1, 2, 3];
    
    uint[10] public myFixedSizeArr;

    //getとは、配列の要素を取得する関数
    function get(uint i) public view returns (uint) {
        return arr[i];
    }

    //getArrとは、配列を取得する関数
      function getArr() public view returns (uint[] memory) {
         return arr;
      }

      //pushとは、配列の末尾に要素を追加する関数
      function push(uint i) public {
         arr.push(i);
      }

      //popとは、配列の末尾の要素を削除する関数
      function pop() public {
         arr.pop();
      }

      //getLengthとは、配列の長さを取得する関数
      function getLength() public view returns (uint) {
         return arr.length;
      }

      //removeとは、配列の指定した要素を削除する関数
      function remove(uint index) public {
         delete arr[index];
      }

      //examplesとは、配列の例を示す関数
      function examples() public {
         uint[] memory a = new uint[](7);
         a[6] = 8;
         assert(a.length == 7);
         a[8]; // Out of bounds access does not throw.
         a.push(9);
         a.push(); // Can also be called without arguments.
         assert(a.length == 9);
         a.length = 2;
         assert(a.length == 2);
         a.length = 200;
         assert(a.length == 200);
         delete a[0];
         // Delete does not shift elements to the left, so the slot is not freed.
         // The following is needed to free the slot.
         a[0] = 0;
      }

      


}