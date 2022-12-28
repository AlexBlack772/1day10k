pragma solidity ^0.8.13;

contract BiDirectionalPaymentChannel {
   using ECDSA for bytes32;

    event ChallengeExit(address indexed sender, uint nonce);
    event Withdraw(address indexed to, uint amount);

    address payable[2] public users;
    mapping(address => bool) public isUser;

    mapping(address => uint) public balances;

    uint public challengePeriod;
    uint public expiresAt;
    uint public nonce;

    //checkBalancesとは、残高をチェックする関数
    modifier checkBalances() {
        require(balances[users[0]] + balances[users[1]] == address(this).balance, "Balances do not match");
        _;
    }

    //constuctorとは、コントラクトをデプロイする際に呼び出される関数
      constructor(address payable[2] memory _users, uint _challengePeriod) {
         require(_users[0] != _users[1], "Users must be different");
         require(_challengePeriod > 0, "Challenge period must be greater than 0");
   
         users = _users;
         isUser[_users[0]] = true;
         isUser[_users[1]] = true;
   
         challengePeriod = _challengePeriod;
         expiresAt = block.timestamp + challengePeriod;
      }

      //verifyとは、署名を検証する関数
      function verify(
         address _user,
         uint _amount,
         uint _nonce,
         bytes memory _signature
      ) public view returns (bool) {
         require(isUser[_user], "User is not part of the channel");
         require(_nonce > nonce, "Nonce must be greater than current nonce");
         require(_amount <= address(this).balance, "Amount must be less than or equal to the channel balance");
   
         bytes32 message = keccak256(abi.encodePacked(_user, _amount, _nonce));
         return _user == message.toEthSignedMessageHash().recover(_signature);
      }

      //checkSignaturesとは、署名をチェックする関数
      modifier checkSignatures(
         address _user1,
         uint _amount1,
         uint _nonce1,
         bytes memory _signature1,
         address _user2,
         uint _amount2,
         uint _nonce2,
         bytes memory _signature2
      ) {
         require(
            verify(_user1, _amount1, _nonce1, _signature1) && verify(_user2, _amount2, _nonce2, _signature2),
            "Signatures are invalid"
         );
         _;
      }

      //onlyUsersとは、ユーザーのみが呼び出せる関数
      modifier onlyUsers() {
         require(isUser[msg.sender], "Only users can call this function");
         _;
      }

      //challengeExitとは、チャレンジを行う関数
      function challengeExit(
         address _user1,
         uint _amount1,
         uint _nonce1,
         bytes memory _signature1,
         address _user2,
         uint _amount2,
         uint _nonce2,
         bytes memory _signature2
      ) public onlyUsers checkSignatures(_user1, _amount1, _nonce1, _signature1, _user2, _amount2, _nonce2, _signature2) {
         require(_amount1 + _amount2 == address(this).balance, "Amounts do not match the channel balance");
         require(_nonce1 != _nonce2, "Nonces must be different");
   
         nonce = _nonce1 > _nonce2 ? _nonce1 : _nonce2;
         expiresAt = block.timestamp + challengePeriod;
   
         balances[_user1] = _amount1;
         balances[_user2] = _amount2;
   
         emit ChallengeExit(msg.sender, nonce);
      }
      //Withdrawとは、チャレンジを行う関数
      function withdraw(address payable _to) public onlyUsers checkBalances {
         require(block.timestamp > expiresAt, "Challenge period has not expired");
         require(balances[msg.sender] > 0, "Balance is 0");
   
         uint amount = balances[msg.sender];
         balances[msg.sender] = 0;
   
         _to.transfer(amount);
   
         emit Withdraw(_to, amount);
      }
      


}