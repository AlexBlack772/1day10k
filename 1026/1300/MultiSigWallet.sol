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

   
}