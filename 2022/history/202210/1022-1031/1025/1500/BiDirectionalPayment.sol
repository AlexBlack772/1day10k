pragma solidity ^0.8.13;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol";

contract BiDirectionalPaymentChannel {
   using ECDSA for bytes32;

   event ChallengeExit(address indexed sender, uint256 amount);
   event Withdraw(address indexed sender, uint256 amount);

   address public sender;
   mapping (address => uint256) public balances;
   mapping (address => uint256) public nonces;

   uint256 public challengePeriod;
   uint256 public expiresAt;
   uint256 public nonce;

   modifier checkBalance(uint256 amount) {
      require(balances[msg.sender] >= amount, "Insufficient balance");
      _;
   }

   constructor(address _sender, uint256 _challengePeriod) {
      sender = _sender;
      challengePeriod = _challengePeriod;
      expiresAt = block.timestamp + challengePeriod;
   }

   function verify(
      bytes[2] memory signatures,
      address _contract,
      address[2] memory _addresses,
      uint256[2] memory _amounts,
      uint256 _nonce
   ) public pure returns (bool) {
      bytes32 message = keccak256(abi.encodePacked(_contract, _addresses, _amounts, _nonce));
      return message.recover(signatures[0]) == _addresses[0] && message.recover(signatures[1]) == _addresses[1];
   }

   modifier checkSignature(
      bytes[2] memory signatures,
      address[2] memory _addresses,
      uint256[2] memory _amounts,
      uint256 _nonce
   ) {
      require(verify(signatures, address(this), _addresses, _amounts, _nonce), "Invalid signature");
      _;
   }

   modifier onlyUser() {
      require(msg.sender == sender || msg.sender == address(this), "Only user");
      _;

   }

   function challengeExit(
      uint[2] memory _balances,
      uint _nonce,
      bytes[2] memory signatures
   ) public onlyUser checkSignature(signatures, [sender, address(this)], _balances, _nonce)
    {
      require(_nonce > nonce, "Nonce too low");
      require(_balances[0] <= balances[sender], "Invalid balance");
      require(_balances[1] <= balances[address(this)], "Invalid balance");

      balances[sender] = _balances[0];
      balances[address(this)] = _balances[1];
      nonce = _nonce;
      expiresAt = block.timestamp + challengePeriod;

      emit ChallengeExit(msg.sender, balances[msg.sender]);
    }

   function withdraw() public checkBalance(balances[msg.sender]) {
      require(block.timestamp > expiresAt, "Challenge period not over");
      uint256 amount = balances[msg.sender];
      balances[msg.sender] = 0;
      payable(msg.sender).transfer(amount);
      emit Withdraw(msg.sender, amount);
   }
}
