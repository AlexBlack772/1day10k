pragma solidity ^0.8.13;

contract Foo {
   address public owner;

   constructor() {
       require(msg.sender != address(0), "Foo: zero address");
       assert(msg.sender != address(0));

   }

   function myFunc() public {
       require(msg.sender != address(0), "Foo: zero address");
       assert(msg.sender != address(0));
   }

}

contract Bar {
   event Log(string message);
   event LogBytes(bytes message);

   Foo public foo;

   constructor() {
       foo = new Foo();
   }

   
}