pragma solidity ^0.8.17;

contract MultiSigWallet {

   event Deposit(address indexed sender, uint amount, uint balance);
   event SubmitTransaction(address indexed owner, uint indexed txIndex, address indexed to, uint value, bytes data);

   event ConfirmTransaction(address indexed owner, uint indexed txIndex);
   event RevokeConfirmation(address indexed owner, uint indexed txIndex);
   event ExecuteTransaction(address indexed owner, uint indexed txIndex);

   address[] public owners;
   mapping(address => bool) public isOwner;
   uint public numConfirmationsRequired;

   struct Transaction {
         address to;
         uint value;
         bytes data;
         bool executed;
         uint numConfirmations;
   }

   mapping(uint => mapping(address => bool)) public isConfirmed;

   Transaction[] public transactions;

   modifier onlyOwner() {
         require(isOwner[msg.sender], "not owner");
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

   modifier notConfirmed(uint _txIndex) {
         require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
         _;
   }

   constructor(address[] memory _owners, uint _numConfirmationsRequired) {
         require(_owners.length > 0, "owners required");
         require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length, "invalid number of required confirmations");

         for (uint i = 0; i < _owners.length; i++) {
               address owner = _owners[i];
               require(owner != address(0), "invalid owner");
               require(!isOwner[owner], "owner not unique");

               isOwner[owner] = true;
               owners.push(owner);
         }

         numConfirmationsRequired = _numConfirmationsRequired;
   }

   receive () external payable {
         emit Deposit(msg.sender, msg.value, address(this).balance);
   }

   function submitTransaction(address _to, uint _value, bytes memory _data) external onlyOwner {
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

   function executeTransaction( uint _txIndex) public  onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
         Transaction storage transaction = transactions[_txIndex];

         require(transaction.numConfirmations >= numConfirmationsRequired, "cannot execute tx");

         transaction.executed = true;
         (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
         require(success, "tx failed");

         emit ExecuteTransaction(msg.sender, _txIndex);
   }

   function revokeConfitmation(uint _txIndex) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
         Transaction storage transaction = transactions[_txIndex];
         require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

         isConfirmed[_txIndex][msg.sender] = false;
         transaction.numConfirmations -= 1;

         emit RevokeConfirmation(msg.sender, _txIndex);
   }

   function getOwners() public view returns (address[] memory) {
         return owners;
   }

   function getTransaction(uint _txIndex) public view txExists(_txIndex) 
   returns (address to, uint value, bytes memory data, bool executed, uint numConfirmations) {
         Transaction storage transaction = transactions[_txIndex];

         return (transaction.to, transaction.value, transaction.data, transaction.executed, transaction.numConfirmations);
   }

}

contract TestUniswapLiquidlity {
   address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

}

interface IERC20 {
   function transfer(address, uint) external returns (bool);
   function transferFrom(address, address, uint) external returns (bool);
}

contract CrowdFund {
   event Launch(
      uint id,
      address indexed creator,
      uint goal,
      uint32 startAt,
      uint32 endAt
   );

   event Cancel(uint id);
   event Pledge(uint indexed id, address indexed pledger, uint amount);
   event Unpledge(uint indexed id, address indexed caller, uint amount);
   event Claim(uint id);
   event Refund(uint id, address indexed caller, uint amount);

   struct Campaign {
         address creator;
         uint goal;
         uint32 startAt;
         uint32 endAt;
         uint pledged;
         bool claimed;
   }

   Campaign[] public campaigns;

   


}


contract MultiCall {
      function multicall(
      address[] calldata targets,
      bytes[] calldata data
      ) external view returns (bytes[] memory) {
            require(targets.length == data.length, "MultiCall: targets and data length mismatch");

            bytes[] memory results = new bytes[](targets.length);

            for (uint i = 0; i < targets.length; i++) {
                  (bool success, bytes memory result) = targets[i].staticcall(data[i]);
                  require(success, "MultiCall: staticcall failed");
                  results[i] = result;
            }

            return results;
      }

}

contract MultiDelegatecall {
      error DelefatecallFailed();

      function multiDelegatecall(
            bytes[] memory data
      ) external payable returns (bytes[] memory results) {
            results = new bytes[](data.length);

            for (uint i = 0; i < data.length; i++) {
                  (bool success, bytes memory result) = address(this).delegatecall(data[i]);
                  if (!success) {
                        revert DelefatecallFailed();
                  }
                  results[i] = result;
            }
      }
}

contract Helper {
      function getEthBalance(address _addr) external view returns (uint) {
            return _addr.balance;
      }

      function getERC20Balance(address _token, address _addr) external view returns (uint) {
            return IERC20(_token).balanceOf(_addr);
      }
}

contract TimeLock {
      error 
}