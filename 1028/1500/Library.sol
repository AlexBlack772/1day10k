pragma solidity ^0.8.13;

//Mathとは、数学のコントラクトです。
library Math {
   //sqrtとは、平方根を返す関数です。
   function sqrt(uint x) internal pure returns (uint y) {
      uint z = (x + 1) / 2;
      y = x;
      while (z < y) {
         y = z;
         z = (x / z + z) / 2;
      }
   }
}

//TestMathとは、Mathのテストコントラクトです。
contract TestMath {
   //sqrtとは、平方根を返す関数です。
   function sqrt(uint x) public pure returns (uint) {
      return Math.sqrt(x);
   }
}

//Arrayとは、配列のコントラクトです。
library Array {
   //removeとは、配列から要素を削除する関数です。
   function remove(uint[] storage array, uint index) internal {
      if (index >= array.length) return;
      for (uint i = index; i < array.length - 1; i++) {
         array[i] = array[i + 1];
      }
      array.pop();
   }

}

//TestArrayとは、Arrayのテストコントラクトです。
contract TestArray {
   //removeとは、配列から要素を削除する関数です。
   function remove(uint[] storage array, uint index) public {
      Array.remove(array, index);
   }
}
