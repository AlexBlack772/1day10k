pragma solidity ^0.8.13;

contract VendingMachine {
    uint public price1 = 100;
    uint public price2 = 120;
    address public customer;

    mapping (address => uint) public balances;

    event Buy(address indexed _from, uint _price);
    event Bonus(address indexed _from);

    function buy() public payable {
         require(msg.value == price1);
         balances[msg.sender] -= price1;

         emit Buy(msg.sender, price1);
    }

    function bounsPlusOne() public payable {
         require(msg.value == price2);
        
         emit Bonus(msg.sender);
    }

    function repay() public payable {
        require(msg.sender == customer);
        balances[msg.sender] += msg.value;
    }


    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

}
