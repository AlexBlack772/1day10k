pragma solidity ^0.8.13;

contract BiDirectionalPaymentChannel {
   //ecdsaとは、標準的な暗号化アルゴリズムの一つ
   using ECDSA for bytes32;
   //challengeexitとは、チャレンジエグジット
   event ChallengeExit(address indexed _from, address indexed _to, uint256 _value);
   //Withdrawとは、引き出し
   event Withdraw(address indexed _from, address indexed _to, uint256 _value);

   address payable[2] public users;
    mapping(address => bool) public isUser;

    mapping(address => uint) public balances;

    uint public challengePeriod;
    uint public expiresAt;
    uint public nonce;

    //checkBlanceとは、残高を確認する
      modifier checkBalance(uint _value) {
         require(balances[msg.sender] >= _value, "Insufficient balance");
         _;
      }

      //constructorとは、コンストラクタ
      constructor(address payable[2] memory _users, uint _challengePeriod) {
         users = _users;
         challengePeriod = _challengePeriod;
         expiresAt = block.timestamp + challengePeriod;
         isUser[_users[0]] = true;
         isUser[_users[1]] = true;
      }

      //verify
      function verify(
         address _from,
         address _to,
         uint _value,
         uint _nonce,
         bytes memory _signature
      ) public view returns (bool) {
         require(_nonce > nonce, "Nonce is too low");
         require(_nonce == nonce + 1, "Nonce is too high");
         require(_value <= balances[_from], "Insufficient balance");
         require(block.timestamp < expiresAt, "Challenge period has expired");

         bytes32 message = prefixed(keccak256(abi.encodePacked(
            address(this),
            _from,
            _to,
            _value,
            _nonce
         )));

         return recoverSigner(message, _signature) == _from;
      }
      //checkSignaturesとは、署名を確認する
      modifier checkSignatures(
         address _from,
         address _to,
         uint _value,
         uint _nonce,
         bytes memory _signature1,
         bytes memory _signature2
      ) {
         require(verify(_from, _to, _value, _nonce, _signature1), "Invalid signature from user 1");
         require(verify(_to, _from, _value, _nonce, _signature2), "Invalid signature from user 2");
         _;
      }

      //onlyUsersとは、ユーザーのみ
      modifier onlyUsers() {
         require(isUser[msg.sender], "Not a user");
         _;
      }

      //challengeExitとは、チャレンジエグジット
      function challengeExit(
         address _from,
         address _to,
         uint _value,
         uint _nonce,
         bytes memory _signature1,
         bytes memory _signature2
      ) public onlyUsers checkSignatures(_from, _to, _value, _nonce, _signature1, _signature2) {
         balances[_from] -= _value;
         balances[_to] += _value;
         nonce = _nonce;
         expiresAt = block.timestamp + challengePeriod;

         emit ChallengeExit(_from, _to, _value);
      }
      //withdrawとは、引き出し
      function withdraw() public onlyUsers {
         require(block.timestamp >= expiresAt, "Challenge period has not expired");
         require(balances[msg.sender] > 0, "Insufficient balance");

         uint value = balances[msg.sender];
         balances[msg.sender] = 0;

         payable(msg.sender).transfer(value);

         emit Withdraw(msg.sender, address(0), value);
      }
      
}