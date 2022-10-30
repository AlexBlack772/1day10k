pragma solidity ^0.8.10;

//LilGnosisとは、Gnosisの子ドメインを管理するためのコントラクトです。
contract LilGnosis {
   error InvalidSignatures();

   //ExecutionFailedは、Gnosis Safeの実行が失敗したときに発生します。
	error ExecutionFailed();

	event QuorumUpdated(uint256 newQuorum);

	event Executed(address target, uint256 value, bytes payload);

	event SignerUpdated(address indexed signer, bool shouldTrust);

   //Signatureは、Gnosis Safeの署名を表します。
	struct Signature {
		uint8 v;
		bytes32 r;
		bytes32 s;
	}

	uint256 public nonce = 1;

	uint256 public quorum;
	
	bytes32 public immutable domainSeparator;

	mapping(address => bool) public isSigner;

   //QUORUM_HASHとは、Gnosis Safeのクオルムを表すハッシュ値です。
   bytes32 public constant QUORUM_HASH =
		keccak256('UpdateQuorum(uint256 newQuorum,uint256 nonce)');

	bytes32 public constant SIGNER_HASH =
		keccak256('UpdateSigner(address signer,bool shouldTrust,uint256 nonce)');

	//EXECUTE_HASHとは、Gnosis Safeの実行を行うためのハッシュ値です。
	bytes32 public constant EXECUTE_HASH =
		keccak256('Execute(address target,uint256 value,bytes payload,uint256 nonce)');
   
   constructor(
		string memory name,
		address[] memory signers,
		uint256 _quorum
	) payable {
		unchecked {
			for (uint256 i = 0; i < signers.length; i++) isSigner[signers[i]] = true;
		}

		quorum = _quorum;

		domainSeparator = keccak256(
			abi.encode(
				keccak256(
					'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
				),
				keccak256(bytes(name)),
				keccak256(bytes('1')),
				block.chainid,
				address(this)
			)
		);
	}

   //executeとは、Gnosis Safeの実行を行うための関数です。
   function execute(
      address target,
      uint256 value,
      bytes calldata payload,
      Signature[] calldata signatures
   ) external {
      unchecked {
         bytes32 hash = keccak256(
            abi.encodePacked(
               '\x19\x01',
               domainSeparator,
               keccak256(abi.encode(EXECUTE_HASH, target, value, keccak256(payload), nonce))
            )
         );

         uint256 count = 0;
         for (uint256 i = 0; i < signatures.length; i++) {
            address signer = ecrecover(hash, signatures[i].v, signatures[i].r, signatures[i].s);
            if (isSigner[signer]) count++;
         }

         if (count < quorum) revert InvalidSignatures();

         nonce++;

         (bool success, ) = target.call{value: value}(payload);
         if (!success) revert ExecutionFailed();

         emit Executed(target, value, payload);
      }
   }

   //setQuorumとは、Gnosis Safeのクオルムを設定するための関数です。
   function setQuorum(uint256 newQuorum, Signature[] calldata signatures) external {
      unchecked {
         bytes32 hash = keccak256(
            abi.encodePacked(
               '\x19\x01',
               domainSeparator,
               keccak256(abi.encode(QUORUM_HASH, newQuorum, nonce))
            )
         );

         uint256 count = 0;
         for (uint256 i = 0; i < signatures.length; i++) {
            address signer = ecrecover(hash, signatures[i].v, signatures[i].r, signatures[i].s);
            if (isSigner[signer]) count++;
         }

         if (count < quorum) revert InvalidSignatures();

         nonce++;

         quorum = newQuorum;

         emit QuorumUpdated(newQuorum);
      }
   }

   //setSingerとは、Gnosis Safeの署名者を設定するための関数です。
   function setSigner(address signer, bool shouldTrust, Signature[] calldata signatures) external {
      unchecked {
         bytes32 hash = keccak256(
            abi.encodePacked(
               '\x19\x01',
               domainSeparator,
               keccak256(abi.encode(SIGNER_HASH, signer, shouldTrust, nonce))
            )
         );

         uint256 count = 0;
         for (uint256 i = 0; i < signatures.length; i++) {
            address _signer = ecrecover(hash, signatures[i].v, signatures[i].r, signatures[i].s);
            if (isSigner[_signer]) count++;
         }

         if (count < quorum) revert InvalidSignatures();

         nonce++;

         isSigner[signer] = shouldTrust;

         emit SignerUpdated(signer, shouldTrust);
      }
   }

   //receiveとは、Gnosis Safeの受信を行うための関数です。
}