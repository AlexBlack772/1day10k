pragma solidity ^0.8.13;

contract Foo {
   Bar bar;

   constructor(address _bar) {
      bar = Bar(_bar);
   }

   function callBar() public {
      bar.foo();
   }

}

contract Bar {
   event  Log(string message);

   function foo() public {}
}

contract Mal {
   event Log(string message);

   function foo() public {
      emit Log("foo");
   }
}