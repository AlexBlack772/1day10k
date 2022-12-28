pragma solidity ^0.8.13;

contract Array {
   uint[] public arr;
   uint[] public arr2 = [1, 2, 3];

   uint[10] public myFixedSizeArr;

   function get(uint i) public view returns (uint) {
       return arr[i];
   }

   function getArr() public view returns (uint[] memory) {
       return arr;
   }

   function push(uint i) public {
       arr.push(i);
   }

   function pop() public {
       arr.pop();
   }

   function getLength() public view returns (uint) {
       return arr.length;
   }

   function remove(uint index) public {
       delete arr[index];
   }

   function examples() public {
       arr.push(1);
       arr.push(2);
       arr.push(3);
       arr.push(4);
       arr.push(5);

       // [1, 2, 3, 4, 5]

       arr.pop();
       // [1, 2, 3, 4]

       delete arr[0];
       // [0, 2, 3, 4]

       arr.push(99);
       // [0, 2, 3, 4, 99]

       arr[0] = 123;
       // [123, 2, 3, 4, 99]
   }
   


}