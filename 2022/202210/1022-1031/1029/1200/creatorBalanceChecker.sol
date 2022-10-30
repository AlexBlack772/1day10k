pragma solidity ^0.8.10;

//creatorBalanceChecker とは、クリエイターの残高を確認するためのコントラクトです。
contract creatorBalanceChecker {
    //creatorとは、クリエイターのアドレスです。
    address public creator;
    
    //creatorBalanceとは、クリエイターの残高です。
    uint public creatorBalance;
    
    //creatorBalanceChecker()とは、
    function creatorBalanceChecker() public {
        creator = msg.sender;
        creatorBalance = msg.sender.balance;
    }

    //getContractAddressとは、コントラクトのアドレスを取得するための関数です。
      function getContractAddress() public view returns (address) {
         return address(this);
      }

      //getCreatorBalanceとは、クリエイターの残高を取得するための関数です。
      function getCreatorBalance() public view returns (uint) {
         return creatorBalance;
      }
      
}