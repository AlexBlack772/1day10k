pragma solidity 0.8.13;

contract BiDirectionalPaymentChannel {
   using ECDSA for bytes32;

    event ChallengeExit(address indexed sender, uint nonce);
    event Withdraw(address indexed to, uint amount);

    address payable[2] public users;
    mapping(address => bool) public isUser;

    mapping(address => uint) public balances;

    uint public challengePeriod;
    uint public expiresAt;
    uint public nonce

    //modifier checkBalance mean
    modifier checkBalances() {
      require(
            address(this).balance >= _balances[0] + _balances[1],
            "balance of contract must be >= to the total balance of users"
        );
        _;
    }

    //constructor 
    constructor(
     address payable[2] memory _users,
        uint _challengePeriod
    ) {
        require(
            _users[0] != _users[1],
            "users must be different"
        );
        users = _users;
        isUser[_users[0]] = true;
        isUser[_users[1]] = true;
        challengePeriod = _challengePeriod;
    }

    
}