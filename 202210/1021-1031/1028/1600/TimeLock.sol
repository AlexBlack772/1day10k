pragma solidity ^0.8.13;

//TimeLockとは、トークンをロックするためのコントラクトです。
contract TimeLock {
   //NotOwnerErrorとは、オーナーでない場合に発生するエラーです。
   error NotOwnerError();
   //AlreadyQueuedErrorとは、すでにキューに入っている場合に発生するエラーです。
    error AlreadyQueuedError(bytes32 txId);
    //TimestampNotInRangeErrorとは、タイムスタンプが範囲外の場合に発生するエラーです。
    error TimestampNotInRangeError(uint blockTimestamp, uint timestamp);
    error NotQueuedError(bytes32 txId);
    //TimestampNotPassedErrorとは、タイムスタンプが過ぎていない場合に発生するエラーです。
    error TimestampNotPassedError(uint blockTimestmap, uint timestamp);
    error TimestampExpiredError(uint blockTimestamp, uint expiresAt);
    error TxFailedError();

    //Queueとは、トランザクションをキューに入れるための構造体です。
    event Queue(bytes32 txId, address to, uint value, bytes data, uint timestamp, uint expiresAt);
      //Executeとは、トランザクションを実行するための構造体です。
      event Execute(bytes32 txId, address to, uint value, bytes data, uint timestamp, uint expiresAt);
      //Cancelとは、トランザクションをキャンセルするための構造体です。
      event Cancel(bytes32 txId, address to, uint value, bytes data, uint timestamp, uint expiresAt);

      uint public constant MIN_DELAY = 10; 
    uint public constant MAX_DELAY = 1000; 
    uint public constant GRACE_PERIOD = 1000; 

    address public owner;

    mapping(bytes32 => bool) public queued;

    //constructorとは、

    //onlyOwnerとは、オーナーのみが実行できるようにする関数です。
      modifier onlyOwner() {
         if (msg.sender != owner) revert NotOwnerError();
         _;
      }
      //receiveとは、コントラクトに送金されたときに実行される関数です。
      receive() external payable {}
      //getTxIdとは、トランザクションIDを取得する関数です。
      function getTxId(address _to, uint _value, bytes memory _data, uint _timestamp, uint _expiresAt) public pure returns (bytes32) {
         return keccak256(abi.encodePacked(_to, _value, _data, _timestamp, _expiresAt));
      }
      //queueとは、トランザクションをキューに入れる関数です。
      function queue(address _to, uint _value, bytes memory _data, uint _timestamp, uint _expiresAt) public onlyOwner {
         bytes32 txId = getTxId(_to, _value, _data, _timestamp, _expiresAt);
         if (queued[txId]) revert AlreadyQueuedError(txId);
         if (_timestamp < block.timestamp + MIN_DELAY) revert TimestampNotInRangeError(block.timestamp, _timestamp);
         if (_timestamp > block.timestamp + MAX_DELAY) revert TimestampNotInRangeError(block.timestamp, _timestamp);
         queued[txId] = true;
         emit Queue(txId, _to, _value, _data, _timestamp, _expiresAt);
      }
      //executeとは、トランザクションを実行する関数です。
      function execute(address _to, uint _value, bytes memory _data, uint _timestamp, uint _expiresAt) public onlyOwner {
         bytes32 txId = getTxId(_to, _value, _data, _timestamp, _expiresAt);
         if (!queued[txId]) revert NotQueuedError(txId);
         if (_timestamp > block.timestamp) revert TimestampNotPassedError(block.timestamp, _timestamp);
         if (_expiresAt < block.timestamp) revert TimestampExpiredError(block.timestamp, _expiresAt);
         queued[txId] = false;
         (bool success, ) = _to.call{value: _value}(_data);
         if (!success) revert TxFailedError();
         emit Execute(txId, _to, _value, _data, _timestamp, _expiresAt);
      }
      //cancelとは、トランザクションをキャンセルする関数です。
      function cancel(address _to, uint _value, bytes memory _data, uint _timestamp, uint _expiresAt) public onlyOwner {
         bytes32 txId = getTxId(_to, _value, _data, _timestamp, _expiresAt);
         if (!queued[txId]) revert NotQueuedError(txId);
         if (_timestamp > block.timestamp + GRACE_PERIOD) revert TimestampExpiredError(block.timestamp, _timestamp);
         queued[txId] = false;
         emit Cancel(txId, _to, _value, _data, _timestamp, _expiresAt);
      }


}