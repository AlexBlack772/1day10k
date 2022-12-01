pragma solidity ^0.8.13;

contract MultiSigWallet {
    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    event SubmitTransaction(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    address[] public owners;
    mapping (address => uint) isOwner;
   uint public numConfirmationsRequired;

   struct Transaction {
       address to;
       uint value;
       bytes data;
       bool executed;
       uint numConfirmations;
   }

   mapping (uint => Transaction) public transactions;

   Transaction[] public transactions;

   modifier onlyOwner() {
       require(isOwner[msg.sender] != 0, "not owner");
       _;
   }

   modifier txExists(uint _txIndex) {
       require(_txIndex < transactions.length, "tx does not exist");
       _;
   }

   modifier notExecuted(uint _txIndex) {
       require(!transactions[_txIndex].executed, "tx already executed");
       _;
   }

   modifier notConfirmed(uint _txIndex
    ) {
         require(transactions[_txIndex].confirmations[msg.sender] == 0, "tx already confirmed");
         _;
    }

    constructor(address[] memory _owners, uint _numConfirmationsRequired) {
        require(_owners.length > 0, "owners required");
        require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length, "invalid number of required confirmations");

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "invalid owner");
            require(isOwner[owner] == 0, "owner not unique");
            isOwner[owner] = 1;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(address _to, uint _value, bytes memory _data) public onlyOwner {
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

    function confirmTransaction(uint _txIndex) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) notConfirmed(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        transaction.confirmations[msg.sender] = 1;
        transaction.numConfirmations += 1;
        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(uint _txIndex) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        require(transaction.numConfirmations >= numConfirmationsRequired, "cannot execute tx");

        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "tx failed");
        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint _txIndex) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        require(transaction.confirmations[msg.sender] == 1, "tx not confirmed");

        transaction.confirmations[msg.sender] = 0;
        transaction.numConfirmations -= 1;
        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction() public view returns (uint) {
        return transactions.length;
    }

    
}