pragma solidity ^0.8.13;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.5/contracts/utils/cryptography/ECDSA.sol";

contract BiDirectionalPaymentChannel {
   //ecdsaとは、標準的な電子署名の標準
   using ECDSA for bytes32;

   //challengeExitとは、チャレンジを終了する
    event ChallengeExit(address indexed sender, uint nonce);
    event Withdraw(address indexed to, uint amount);

    address payable[2] public users;
    mapping(address => bool) public isUser;

    mapping(address => uint) public balances;

    uint public challengePeriod;
    uint public expiresAt;
    uint public nonce;

    //checkBalancesとは、バランスをチェックする
      modifier checkBalances(uint amount0, uint amount1) {
         require(balances[users[0]] == amount0, "Invalid balance for user 0");
         require(balances[users[1]] == amount1, "Invalid balance for user 1");
         _;
      }

      constructor(address payable[2] memory _users, uint _challengePeriod)
         checkBalances(_balances) {
         users = _users;
         isUser[_users[0]] = true;
         isUser[_users[1]] = true;
         challengePeriod = _challengePeriod;
      }

      //verify
      function verify(
         address[2] memory _users,
         uint[2] memory _balances,
         uint _nonce,
         bytes memory _signature
      ) public view returns (bool) {
         bytes32 message = keccak256(abi.encodePacked(
            address(this),
            _users,
            _balances,
            _nonce
         ));
         return message.recover(_signature) == _users[0];
      }

      //checkSignaturesとは、署名をチェックする
      modifier checkSignatures(
         address[2] memory _users,
         uint[2] memory _balances,
         uint _nonce,
         bytes[2] memory _signatures
      ) {
         require(verify(_users, _balances, _nonce, _signatures[0]), "Invalid signature for user 0");
         require(verify(_users, _balances, _nonce, _signatures[1]), "Invalid signature for user 1");
         _;
      }

      //onlyUserとは、ユーザーのみ
      modifier onlyUser() {
         require(isUser[msg.sender], "Not a user");
         _;
      }

      //challengeExitとは、チャレンジを終了する
      function challengeExit(
         address[2] memory _users,
         uint[2] memory _balances,
         uint _nonce,
         bytes[2] memory _signatures
      ) public checkSignatures(_users, _balances, _nonce, _signatures) {
         require(_nonce > nonce, "Nonce must be greater than the current nonce");
         nonce = _nonce;
         balances[_users[0]] = _balances[0];
         balances[_users[1]] = _balances[1];
         expiresAt = block.timestamp + challengePeriod;
         emit ChallengeExit(msg.sender, _nonce);
      }

      //withdrawとは、引き出す
      function withdraw(uint amount) public onlyUser {
         require(block.timestamp > expiresAt, "Challenge period is not over");
         require(balances[msg.sender] >= amount, "Insufficient balance");
         balances[msg.sender] -= amount;
         payable(msg.sender).transfer(amount);
         emit Withdraw(msg.sender, amount);
      }

}