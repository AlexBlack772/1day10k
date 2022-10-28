pragma solidity ^0.8.13;

//MultiSigWalletとは、マルチシグウォレットのことです。
contract MultiSigWallet {
   //Depositとは、預金のことです。
   event Deposit(address indexed sender, uint amount, uint balance);
   //SubmitTransactionとは、トランザクションを送信することです。
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
   //ConfirmTransactionとは、トランザクションを確認することです。
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
   //RevokeConfirmationとは、トランザクションの確認を取り消すことです。
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
   //ExecuteTransactionとは、トランザクションを実行することです。
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;

    //Transactionとは、トランザクションのことです。
      struct Transaction {
         address to;
         uint value;
         bytes data;
         bool executed;
         uint numConfirmations;
      }

      mapping(uint => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;

    //onlyOwnerとは、コントラクトのオーナーのみが実行できる修飾子です。
      modifier onlyOwner() {
         require(isOwner[msg.sender], "not owner");
         _;
      }
      //txExistsとは、トランザクションが存在するかどうかを確認する修飾子です。
      modifier txExists(uint txIndex) {
         require(txIndex < transactions.length, "tx does not exist");
         _;
      }
      //notExecutedとは、トランザクションが実行されていないかどうかを確認する修飾子です。
      modifier notExecuted(uint txIndex) {
         require(!transactions[txIndex].executed, "tx already executed");
         _;
      }
      //notConfirmedとは、トランザクションが確認されていないかどうかを確認する修飾子です。
      modifier notConfirmed(uint txIndex) {
         require(!isConfirmed[txIndex][msg.sender], "tx already confirmed");
         _;
      }
      //constructorとは、コンストラクタのことです。
      constructor(address[] memory _owners, uint _numConfirmationsRequired) {
         require(
            _owners.length > 0,
            "owners required"
         );
         require(
            _numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
         );

         for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
         }

         numConfirmationsRequired = _numConfirmationsRequired;
      }
      //receiveとは、コントラクトに送金されたときに実行される関数です。
      receive() external payable {
         emit Deposit(msg.sender, msg.value, address(this).balance);
      }

      //submitTransactionとは、トランザクションを送信する関数です。
      function submitTransaction(address to, uint value, bytes memory data)
         public
         onlyOwner
      {
         uint txIndex = transactions.length;
         transactions.push(Transaction({
            to: to,
            value: value,
            data: data,
            executed: false,
            numConfirmations: 0
         }));

         emit SubmitTransaction(msg.sender, txIndex, to, value, data);
      }
      //confirmTransactionとは、トランザクションを確認する関数です。
      function confirmTransaction(uint txIndex)
         public
         onlyOwner
         txExists(txIndex)
         notExecuted(txIndex)
         notConfirmed(txIndex)
      {
         Transaction storage transaction = transactions[txIndex];
         transaction.numConfirmations += 1;
         isConfirmed[txIndex][msg.sender] = true;

         emit ConfirmTransaction(msg.sender, txIndex);
      }
      //executeTransactionとは、トランザクションを実行する関数です。
      function executeTransaction(uint txIndex)
         public
         onlyOwner
         txExists(txIndex)
         notExecuted(txIndex)
      {
         Transaction storage transaction = transactions[txIndex];
         require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
         );

         transaction.executed = true;
         (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
         require(success, "tx failed");

         emit ExecuteTransaction(msg.sender, txIndex);
      }
      //revokeConfirmationとは、トランザクションの確認を取り消す関数です。
      function revokeConfirmation(uint txIndex)
         public
         onlyOwner
         txExists(txIndex)
         notExecuted(txIndex)
         notConfirmed(txIndex)
      {
         Transaction storage transaction = transactions[txIndex];
         transaction.numConfirmations -= 1;
         isConfirmed[txIndex][msg.sender] = false;

         emit RevokeConfirmation(msg.sender, txIndex);
      }
      //getOwnersとは、オーナーの配列を取得する関数です。
      function getOwners()
         public
         view
         returns (address[] memory)
      {
         return owners;
      }
      //getTransactionCountとは、トランザクションの数を取得する関数です。
      function getTransactionCount()
         public
         view
         returns (uint)
      {
         return transactions.length;
      }
      //getTransactionとは、トランザクションを取得する関数です。
      function getTransaction(uint txIndex)
         public
         view
         txExists(txIndex)
         returns (address to, uint value, bytes memory data, bool executed, uint numConfirmations)
      {
         Transaction storage transaction = transactions[txIndex];

         return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
         );
      }
      
}