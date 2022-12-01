pragma solidity ^0.8.13;

//MultiDelegatecallとは、複数のコントラクトをデリゲートコールするコントラクト
contract MultiDelegatecall {
   //MultiDelegatecallとは、複数のコントラクトをデリゲートコールする関数
   function multiDelegatecall(address[] memory targets, bytes[] memory data) public {
      for (uint i = 0; i < targets.length; i++) {
         (bool success, ) = targets[i].delegatecall(data[i]);
         require(success);
      }
   }
}

contract TestMultiDelegatecall is MultiDelegatecall {

   //Logとは、ログを出力するイベント
   event Log(string message);

   //

}