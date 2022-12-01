pragma solidity ^0.8.13;

contract BiDirectionalPaymentChannel {
   //ecdsaとは、標準的なECDSA署名を行う関数
   using ECDSA for bytes32;

    event ChallengeExit(address indexed sender, uint nonce);
    event Withdraw(address indexed to, uint amount);

    address payable[2] public users;
    mapping(address => bool) public isUser;

    mapping(address => uint) public balances;

    uint public challengePeriod;
    uint public expiresAt;
    uint public nonce;

    //checkBalancesとは、チャネルの残高をチェックする関数
      function checkBalances() public view returns (uint, uint) {
         return (balances[users[0]], balances[users[1]]);
      }

      //コンストラクタとは、コントラクトの初期化を行う関数
      constructor(address payable[2] memory _users, uint _challengePeriod) {
         users = _users;
         isUser[users[0]] = true;
         isUser[users[1]] = true;
         challengePeriod = _challengePeriod;
         expiresAt = block.timestamp + challengePeriod;
      }

      //verifyとは、署名を検証する関数
      function verify(
         address _user,
         uint _nonce,
         uint _amount,
         bytes memory _signature
      ) public view returns (bool) {
         bytes32 message = keccak256(abi.encodePacked(_user, _nonce, _amount));
         return message.toEthSignedMessageHash().recover(_signature) == _user;
      }

      //checkSignaturesとは、署名を検証する関数
      modifier checkSignatures(
         address _user1,
         uint _nonce1,
         uint _amount1,
         bytes memory _signature1,
         address _user2,
         uint _nonce2,
         uint _amount2,
         bytes memory _signature2
      ) {
         require(
            verify(_user1, _nonce1, _amount1, _signature1) &&
               verify(_user2, _nonce2, _amount2, _signature2),
            "Invalid signatures"
         );
         _;
      }

      //onlyUserとは、ユーザーのみが実行できる関数
      modifier onlyUser() {
         require(isUser[msg.sender], "Not a user");
         _;
      }

      //challengeExitとは、チャネルを終了する関数
      function challengeExit(
         address _user1,
         uint _nonce1,
         uint _amount1,
         bytes memory _signature1,
         address _user2,
         uint _nonce2,
         uint _amount2,
         bytes memory _signature2
      )
         public
         checkSignatures(
            _user1,
            _nonce1,
            _amount1,
            _signature1,
            _user2,
            _nonce2,
            _amount2,
            _signature2
         )
      {
         require(
            _nonce1 > nonce || _nonce2 > nonce,
            "Nonce must be greater than the current nonce"
         );
         require(
            _amount1 <= balances[_user1] && _amount2 <= balances[_user2],
            "Amount must be less than or equal to the current balance"
         );
         require(
            _user1 == users[0] && _user2 == users[1] ||
               _user1 == users[1] && _user2 == users[0],
            "Invalid users"
         );
         nonce = _nonce1 > _nonce2 ? _nonce1 : _nonce2;
         balances[_user1] = _amount1;
         balances[_user2] = _amount2;
         expiresAt = block.timestamp + challengePeriod;
         emit ChallengeExit(msg.sender, nonce);
      }

      //withdrawとは、チャネルから出金する関数
      function withdraw(uint _amount) public onlyUser {
         require(
            block.timestamp > expiresAt,
            "Challenge period has not yet expired"
         );
         require(
            balances[msg.sender] >= _amount,
            "Amount must be less than or equal to the current balance"
         );
         balances[msg.sender] -= _amount;
         payable(msg.sender).transfer(_amount);
         emit Withdraw(msg.sender, _amount);
      }

}

