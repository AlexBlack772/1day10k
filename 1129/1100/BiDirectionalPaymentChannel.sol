pragma solidity ^0.8.13;


import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol";

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

    modifier checkBlances(uint amount) {
        require(balances[msg.sender] >= amount, "Not enough balance");
        _;
    }
      
    constructor(address payable[2] memory _users, uint _challengePeriod) {
        require(_users[0] != _users[1], "Users must be different");
        users = _users;
        isUser[_users[0]] = true;
        isUser[_users[1]] = true;
        challengePeriod = _challengePeriod;
        expiresAt = block.timestamp + challengePeriod;
    }

    function verify (address user, uint amount, uint nonce, bytes memory signature) public view returns (bool) {
        bytes32 message = keccak256(abi.encodePacked(user, amount, nonce));
        return message.toEthSignedMessageHash().recover(signature) == user;
    }

    modifier checkSignature(address user, uint amount, uint nonce, bytes memory signature) {
        require(verify(user, amount, nonce, signature), "Invalid signature");
        _;
    }

    modifier onlyUser() {
        require(isUser[msg.sender], "Only users can call this function");
        _;
    }

    function challengeExit(address user, uint amount, uint nonce, bytes memory signature) public onlyUser checkSignature(user, amount, nonce, signature) {
        require(nonce > this.nonce, "Nonce must be greater than the current nonce");
        require(amount <= balances[user], "Amount must be less than or equal to the current balance");
        this.nonce = nonce;
        expiresAt = block.timestamp + challengePeriod;
        emit ChallengeExit(user, nonce);
    }

    function withdraw(address payable to, uint amount) public onlyUser checkBlances(amount) {
        require(block.timestamp > expiresAt, "Challenge period has not expired");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Withdraw(to, amount);
    }
    
}