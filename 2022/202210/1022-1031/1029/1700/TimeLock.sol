pragma solidity ^0.8.0;

// TimeLockとは、時間ロック
contract TimeLock {
   //NotOwnerErrorとは、オーナーではないエラー
   error NotOwnerError();
   //NotEnoughTimeErrorとは、時間が足りないエラー
    error AlreadyQueuedError(bytes32 txId);
    //TimestampNotInRangeErrorとは、タイムスタンプが範囲外のエラー
    error TimestampNotInRangeError(uint blockTimestamp, uint timestamp);
    //NotQueuedErrorとは、キューに入っていないエラー
    error NotQueuedError(bytes32 txId);
    //TimestampNotPassedErrorとは、タイムスタンプが過ぎていないエラー
    error TimestampNotPassedError(uint blockTimestmap, uint timestamp);

    error TimestampExpiredError(uint blockTimestamp, uint expiresAt);
    error TxFailedError();
  //ownerとは、オーナー
  address public owner;
  //lockedとは、ロック
  bool public locked;

   //Queueとは、キュー
   event Queue(
        bytes32 indexed txId,
        address indexed target,
        uint value,
        string func,
        bytes data,
        uint timestamp
    );
      //Executeとは、実行
    event Execute(
        bytes32 indexed txId,
        address indexed target,
        uint value,
        string func,
        bytes data,
        uint timestamp
    );
      //Cancelとは、キャンセル
    event Cancel(bytes32 indexed txId);
    uint public constant MIN_DELAY = 10; 
    uint public constant MAX_DELAY = 1000;
    uint public constant GRACE_PERIOD = 1000; 

    address public owner;
    // tx id => queued
    mapping(bytes32 => bool) public queued;

  //constructorとは、コンストラクタ
  constructor() {
    owner = msg.sender;
  }

  //onlyOwnerとは、オーナーのみ
   modifier onlyOwner() {
      if (msg.sender != owner) {
         revert NotOwnerError();
      }
      _;
   }
   //receiveとは、受信
   receive() external payable {
      if (locked) {
         revert NotOwnerError();
      }
   }

   //getTxIdとは、トランザクションIDを取得
   function getTxId(
      address target,
      uint value,
      string calldata func,
      bytes calldata data,
      uint timestamp
   ) public pure returns (bytes32) {
      return keccak256(abi.encode(target, value, func, data, timestamp));
   }

   //queueとは、キュー
   function queue(
      address target,
      uint value,
      string calldata func,
      bytes calldata data,
      uint timestamp
   ) external onlyOwner {
      bytes32 txId = getTxId(target, value, func, data, timestamp);
      if (queued[txId]) {
         revert AlreadyQueuedError(txId);
      }
      if (timestamp < block.timestamp + MIN_DELAY) {
         revert TimestampNotInRangeError(block.timestamp, timestamp);
      }
      if (timestamp > block.timestamp + MAX_DELAY) {
         revert TimestampNotInRangeError(block.timestamp, timestamp);
      }
      queued[txId] = true;
      emit Queue(txId, target, value, func, data, timestamp);
   }

   //executeとは、実行
   function execute(
      address target,
      uint value,
      string calldata func,
      bytes calldata data,
      uint timestamp
   ) external onlyOwner {
      bytes32 txId = getTxId(target, value, func, data, timestamp);
      if (!queued[txId]) {
         revert NotQueuedError(txId);
      }
      if (timestamp > block.timestamp) {
         revert TimestampNotPassedError(block.timestamp, timestamp);
      }
      delete queued[txId];
      (bool success, ) = target.call{value: value}(abi.encodePacked(func, data));
      if (!success) {
         revert TxFailedError();
      }
      emit Execute(txId, target, value, func, data, timestamp);
   }
   

  //lockとは、ロックする関数
  function lock() public {
    require(msg.sender == owner, "You are not the owner");
    locked = true;
  }

  //unlockとは、ロック解除する関数
  function unlock() public {
    require(msg.sender == owner, "You are not the owner");
    locked = false;
  }

  //transferOwnershipとは、オーナー権限を移譲する関数
  function transferOwnership(address newOwner) public {
    require(msg.sender == owner, "You are not the owner");
    owner = newOwner;
  }

  //withdrawとは、引き出す関数
  function withdraw() public {
    require(msg.sender == owner, "You are not the owner");
    require(!locked, "Contract is locked");
    payable(msg.sender).transfer(address(this).balance);
  }
}