pragma solidity ^0.8.13;

//MultiSigWalletとは、マルチシグウォレット
contract MultiSigWallet {
   event Deposit(address indexed sender, uint amount, uint balance);
   //SubmitTransactionとは、トランザクションを送信する
   event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    //ConfirmTransactionとは、トランザクションを確認する
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    //RevokeConfirmationとは、確認を取り消す
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    //ExecuteTransactionとは、トランザクションを実行する
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    address[] public owners;
    //isOwnerのマッピング
    mapping(address => bool) public isOwner;
    uint public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;

    //onlyOwnerとは、ウォレットオーナーのみ
      modifier onlyOwner() {
         require(isOwner[msg.sender], "!owner");
         _;
      }

      //txExistsとは、トランザクションが存在する
      modifier txExists(uint _txIndex) {
         require(_txIndex < transactions.length, "tx does not exist");
         _;
      }

      //notExecutedとは、実行されていない
      modifier notExecuted(uint _txIndex) {
         require(!transactions[_txIndex].executed, "tx executed");
         _;
      }

      //notConfirmedとは、確認されていない
      modifier notConfirmed(uint _txIndex) {
         require(!isConfirmed[_txIndex][msg.sender], "tx confirmed");
         _;
      }

      //constructorとは、コンストラクタ
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
      //receiveとは、受け取る
      receive() external payable {
         emit Deposit(msg.sender, msg.value, address(this).balance);
      }

      //submitTransactionとは、トランザクションを送信する
      function submitTransaction(address _to, uint _value, bytes memory _data)
         public
         onlyOwner
      {
         uint txIndex = transactions.length;

         transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
         }));

         emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
      }

      //confirmTransactionとは、トランザクションを確認する
      function confirmTransaction(uint _txIndex)
         public
         onlyOwner
         txExists(_txIndex)
         notExecuted(_txIndex)
         notConfirmed(_txIndex)
      {
         Transaction storage transaction = transactions[_txIndex];
         transaction.numConfirmations += 1;
         isConfirmed[_txIndex][msg.sender] = true;

         emit ConfirmTransaction(msg.sender, _txIndex);
      }

      //executeTransactionとは、トランザクションを実行する
      function executeTransaction(uint _txIndex)
         public
         onlyOwner
         txExists(_txIndex)
         notExecuted(_txIndex)
      {
         Transaction storage transaction = transactions[_txIndex];

         require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
         );

         transaction.executed = true;

         (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
         require(success, "tx failed");

         emit ExecuteTransaction(msg.sender, _txIndex);
      }
      
      //revokeConfirmationとは、確認を取り消す
      function revokeConfirmation(uint _txIndex)
         public
         onlyOwner
         txExists(_txIndex)
         notExecuted(_txIndex)
         notConfirmed(_txIndex)
      {
         Transaction storage transaction = transactions[_txIndex];
         transaction.numConfirmations -= 1;
         isConfirmed[_txIndex][msg.sender] = false;

         emit RevokeConfirmation(msg.sender, _txIndex);
      }

      //getOwnersとは、オーナーを取得する
      function getOwners()
         external
         view
         returns (address[] memory)
      {
         return owners;
      }

      //getTransactionCountとは、トランザクションの数を取得する

      function getTransactionCount(bool _pending, bool _executed)
         external
         view
         returns (uint)
      {
         uint count = 0;
         for (uint i = 0; i < transactions.length; i++) {
            if (_pending && !transactions[i].executed
               || _executed && transactions[i].executed) {
               count += 1;
            }
         }
         return count;
      }

      //getTransactionとは、トランザクションを取得する
      function getTransaction(uint _txIndex)
         external
         view
         txExists(_txIndex)
         returns (address to, uint value, bytes memory data, bool executed, uint numConfirmations)
      {
         Transaction storage transaction = transactions[_txIndex];

         return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
         );
      }
}