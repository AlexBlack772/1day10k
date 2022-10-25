pragma solidity ^0.8.13;

contract DataLocations {
   uint[] public arr;
   mapping(uint => address) public myMap;
   struct MyStruct {
      uint foo;
   }
   MyStruct public myStruct;
   
   function f(uint[] memory _arr, mapping(uint => address) storage _myMap, MyStruct calldata _myStruct) public {
      _arr[7];
      _myMap[17];
      _myStruct.foo;
      arr.push(2);
      myMap[uint(keccak256("abc"))] = msg.sender;
      myStruct.foo = 2;
   }

   function _f(uint[] memory _arr, mapping(uint => address) storage _myMap, MyStruct calldata _myStruct) private {
      _arr[7];
      _myMap[17];
      _myStruct.foo;
      arr.push(2);
      myMap[uint(keccak256("abc"))] = msg.sender;
      myStruct.foo = 2;
   }

   function g() public {
      _f(arr, myMap, myStruct);
   }

   function h() public {
      _f(arr, myMap, myStruct);
   }
   
}