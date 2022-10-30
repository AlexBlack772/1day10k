pragma solidity ^0.8.13;

//Math 
library Math {
   //sqrtとは、平方根を求める関数
   function sqrt(uint x) internal pure returns (uint y) {
      uint z = (x + 1) / 2;
      y = x;
      while (z < y) {
         y = z;
         z = (x / z + z) / 2;
      }
   }
   
}

//TestMathとは、Mathのテストコントラクト
contract TestMath {
   //test_sqrtとは、sqrtのテスト関数
   function test_sqrt(uint x) public pure returns (uint) {
      return Math.sqrt(x);
   }
}


//Array

library Array {
   //removeとは、配列から指定した要素を削除する関数
   function remove(uint[] storage array, uint index) public {
      if (index >= array.length) return;
      for (uint i = index; i < array.length - 1; i++) {
         array[i] = array[i + 1];
      }
      array.pop();
   }

}

//TestArrayとは、Arrayのテストコントラクト
contract TestArray {
   uint[] public array;
   //test_removeとは、removeのテスト関数
   function test_remove(uint index) public {
      Array.remove(array, index);
   }
}
