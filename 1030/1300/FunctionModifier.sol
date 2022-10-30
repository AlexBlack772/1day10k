pragma solidity ^0.8.13;

//FunctionModifierとは、関数修飾子
contract FunctionModifier {
   address public owner;
    uint public x = 10;
    bool public locked;

    //constructorとは、コンストラクタ
      constructor() {
         owner = msg.sender;
      }

      //onlyOwnerとは、オーナーのみ
      modifier onlyOwner() {
         if (msg.sender != owner) {
            revert NotOwnerError();
         }
         _;
      }

      //vaildAddressとは、有効なアドレス
      modifier validAddress(address addr) {
         if (addr == address(0)) {
            revert InvalidAddressError();
         }
         _;
      }

      //changeOwnerとは、オーナーを変更する
      function changeOwner(address newOwner)
         public
         onlyOwner
         validAddress(newOwner)
      {
         owner = newOwner;
      }

      //noReentrancyとは、再入防止
      modifier noReentrancy() {
         if (locked) {
            revert ReentrancyError();
         }
         locked = true;
         _;
         locked = false;
      }

      //decrementとは、減算する
      function decrement(uint amount)
         public
         noReentrancy
      {
         require(x >= amount);
         x -= amount;
      }

      

}