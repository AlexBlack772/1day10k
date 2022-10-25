pragma solidity ^0.8.13;

library Math {

   function sqrt(uint x) internal pure returns (uint y) {
      uint z = (x + 1) / 2;
      y = x;
      while (z < y) {
         y = z;
         z = (x / z + z) / 2;
      }
   }
   
}

contract TestMath {
   using Math for uint;
   
   function testSqrt(uint x) public pure returns (uint) {
      return x.sqrt();
   }
   
}

library Array {
   function remove(uint[] storage arr, uint index) public {
      if (index >= arr.length) return;
      
      for (uint i = index; i < arr.length - 1; i++) {
         arr[i] = arr[i + 1];
      }
      arr.pop();
   }
}

contract TestArray {
   using Array for uint[];
   
   uint[] public arr;
   
   function testRemove(uint index) public {
      arr.remove(index);
   }
   
   function getLength() public view returns (uint) {
      return arr.length;
   }
   
}
