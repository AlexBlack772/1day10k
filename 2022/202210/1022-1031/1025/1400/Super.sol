pragma solidity ^0.8.13;

contract A {
   event Log(string message);

   function foo() public {
      emit Log("A.foo");
   }

   function bar() public {
      emit Log("A.bar");
   }
}

contract B is A {
   function foo() public override {
      emit Log("B.foo");
   }

   function bar() public virtual {
      emit Log("B.bar");
   }
}

contract C is A {
   function foo() public override {
      emit Log("C.foo");
   }

   function bar() public virtual {
      emit Log("C.bar");
   }
}

contract D is B, C {
   function foo() public override(B, C) {
      emit Log("D.foo");
   }

   function bar() public override(B, C) {
      emit Log("D.bar");
   }
}

