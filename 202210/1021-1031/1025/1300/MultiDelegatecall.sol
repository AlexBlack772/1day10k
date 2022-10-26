pragma solidity ^0.8.13;

contract MultiDelegatecall {
   error DelegatecallFailed();

   function multiDelegatecall(bytes[] memory data) public {
      for (uint i = 0; i < data.length; i++) {
         (bool success, ) = address(this).delegatecall(data[i]);
         if (!success) {
            revert DelegatecallFailed();
         }
      }
   }
   
   address public owner;
   uint public x = 10;
   bool public locked;
   
   constructor() {
      owner = msg.sender;
   }
   
   modifier onlyOwner() {
      require(msg.sender == owner, "You are not the owner");
      _;
   }
   
   modifier validAddress(address _addr) {
      require(_addr != address(0), "Invalid address");
      _;
   }
   
   function changeOwner(address _newOwner) public onlyOwner {
      owner = _newOwner;
   }
   
   modifier noReentrancy() {
      require(!locked, "Reentrancy is not allowed");
      locked = true;
      _;
      locked = false;
   }
   
   function increment(uint _n) public onlyOwner {
      x += _n;
   }
   
   function decrement(uint _n) public onlyOwner {
      x -= _n;
   }
   
   function getX() public view returns (uint) {
      return x;
   }
   
   function delegatecall(address _addr, bytes memory _data) public onlyOwner validAddress(_addr) noReentrancy {
      (bool success, ) = _addr.delegatecall(_data);
      require(success, "delegatecall failed");
   }
   
   function call(address _addr, bytes memory _data) public onlyOwner validAddress(_addr) noReentrancy {
      (bool success, ) = _addr.call(_data);
      require(success, "call failed");
   }
   
   function callcode(address _addr, bytes memory _data) public onlyOwner validAddress(_addr) noReentrancy {
      (bool success, ) = _addr.callcode(_data);
      require(success, "callcode failed");
   }
   
   function staticcall(address _addr, bytes memory _data) public onlyOwner validAddress(_addr) noReentrancy {
      (bool success, ) = _addr.staticcall(_data);
      require(success, "staticcall failed");
   }
   
   function delegatecallWithValue(address _addr, bytes memory _data, uint _value) public payable onlyOwner validAddress(_addr) noReentrancy {
      (bool success, ) = _addr.delegatecall{value: _value}(_data);
      require(success, "delegatecall failed");
   }
   
   function callWithValue(address _addr, bytes memory _data, uint _value) public payable onlyOwner