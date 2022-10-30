pragma solidity ^0.8.10;

//AccessRestrictionとは、アクセス制限を行うためのコントラクトです。
contract AccessRestriction {
   address public owner = msg.sender;
    uint public lastOwnerChange = now;

    //onlyByとは、アドレスが一致するかどうかを確認するための関数です。
      modifier onlyBy(address _account) {
         require(
               msg.sender == _account,
               "Sender not authorized."
         );
         _;
      }

      //onlyAfterとは、時間が一致するかどうかを確認するための関数です。
      modifier onlyAfter(uint _time) {
         require(
               now >= _time,
               "Function cannot be called at this time."
         );
         _;
      }

      //costsとは、コストを確認するための関数です。
      modifier costs(uint _amount) {
         require(
               msg.value >= _amount,
               "Not enough Ether provided."
         );
         _;
      }

      //changeOwnerとは、オーナーを変更するための関数です。
      function changeOwner(address _newOwner) public onlyBy(owner) costs(100 ether) {
         owner = _newOwner;
         lastOwnerChange = now;
      }

      //buyContractとは、コントラクトを購入するための関数です。
      function buyContract() public payable onlyAfter(lastOwnerChange + 1 weeks) costs(1 ether) {
         // do something
      }
      
}