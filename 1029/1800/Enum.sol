pragma solidity ^0.8.13;

//Enumとは、列挙型
contract Enum {
   //Statusとは、ステータス
   enum Status {
      //Pendingとは、保留中
      Pending,
      //Shippedとは、発送済み
      Shipped,
      //Acceptedとは、受領済み
      Accepted,
      //Rejectedとは、拒否済み
      Rejected,
      //Canceledとは、キャンセル済み
      Canceled
   }

   //getとは、ステータスを取得する関数
   function get() public pure returns (Status) {
      return Status.Pending;
   }

   //setとは、ステータスを設定する関数
   function set(Status _status) public pure {
      // do something
   }

   //cancelとは、ステータスをキャンセルする関数
   function cancel() public pure {
      set(Status.Canceled);
   }

   //resetとは、ステータスをリセットする関数
   function reset() public pure {
      set(Status.Pending);
   }
   
}