pragma solidity ^0.8.13;

//enumとは、列挙型のことです。
contract Enum {
   enum Status {
      Pending,
      Shipped,
      Accepted,
      Rejected,
      Canceled
   }

   Status public status;

   //getとは、列挙型の値を取得する関数です。
   function get() public view returns (Status) {
      return status;
   }

   //setとは、列挙型の値を設定する関数です。
   function set(Status _status) public {
      status = _status;
   }

   //cancelとは、列挙型の値をキャンセルする関数です。
   function cancel() public {
      status = Status.Canceled;
   }

   //resetとは、列挙型の値をリセットする関数です。
   function reset() public {
      delete status;
   }

}