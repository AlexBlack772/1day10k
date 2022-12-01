pragma solidity ^0.5.10;

contract ContractWallet {
   uint256 public gracePeriodInterval;

   //userとは、ユーザーの情報を格納する構造体です。
   struct User {
        address userAddress;
        uint256 balance;
        //time after request for approval to move funds in which user can still move their money
        uint256 gracePeriod;
        address payable guardian;
        bool approvedToMove;
    }

    mapping(address => User) users;

      //constructorとは、コントラクトのコンストラクタです。
      constructor(uint256 gracePeriodIntervalInit) public {
        gracePeriodInterval = gracePeriodIntervalInit;
    }

     function() external payable {
        //check if user has an account else reject
        require(users[msg.sender].guardian != address(0));
        users[msg.sender].balance += msg.value;
    }

    //createUserとは、ユーザーを作成する関数です。
      function createUser(address payable guardian) public {
         require(users[msg.sender].guardian == address(0));
         users[msg.sender].guardian = guardian;
         users[msg.sender].userAddress = msg.sender;
      }

      //transferEtherとは、Etherを送金する関数です。
      function transferEther(address payable to, uint256 amount) public {
        require(users[msg.sender].balance >= amount);
        require(users[msg.sender].approvedToMove);
        users[msg.sender].balance -= amount;
        to.transfer(amount);

        //guardianRequestToMoveFundsとは、Etherの送金をガーディアンに依頼する関数です。
         function guardianRequestToMoveFunds(address payable to, uint256 amount) public {
               require(users[msg.sender].guardian == msg.sender);
               require(users[to].guardian != address(0));
               users[to].approvedToMove = true;
               users[to].gracePeriod = now + gracePeriodInterval;
         }

         //withdrawToGuardianとは、Etherをガーディアンに送金する関数です。
         function withdrawToGuardian(address payable to, uint256 amount) public {
               require(users[msg.sender].guardian == msg.sender);
               require(users[to].guardian != address(0));
               require(users[to].gracePeriod < now);
               users[to].balance -= amount;
               to.transfer(amount);
         }
      }


}