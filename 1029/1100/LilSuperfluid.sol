pragma solidity ^0.8.10;

//LilSuperfluidとは、SuperfluidのようなNFTマーケットプレイスを作るためのコントラクトです。

contract LilSuperfluid {
   //Unauthorizedとは、権限がないときに発生します。
	error Unauthorized();

	/// StreamNotFoundとは、ストリームが見つからなかったときに発生します。
	error StreamNotFound();

	/// StreamStillActiveとは、ストリームがまだアクティブなときに発生します。
	error StreamStillActive();

	///  StreamCreatedとは、ストリームが作成されたときに発生します。
	event StreamCreated(Stream stream);

	///
	event StreamRefueled(uint256 indexed streamId, uint256 amount);

	/// 
	event FundsWithdrawn(uint256 indexed streamId, uint256 amount);

	/// 
	event ExcessWithdrawn(uint256 indexed streamId, uint256 amount);

   event StreamDetailsUpdated(
		uint256 indexed streamId,
		uint256 paymentPerBlock,
		Timeframe timeframe
	);

   //
   struct Stream {
		address sender;
		address recipient;
		ERC20 token;
		uint256 balance;
		uint256 withdrawnBalance;
		uint256 paymentPerBlock;
		Timeframe timeframe;
	}

   //Timeframeとは、時間の単位を表します。
   struct Timeframe {
		uint256 startBlock;
		uint256 stopBlock;
	}

   constructor() payable {
		domainSeparator = keccak256(
			abi.encode(
				keccak256(
					'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
				),
				keccak256(bytes('LilSuperfluid')),
				keccak256(bytes('1')),
				block.chainid,
				address(this)
			)
		);
	}

   //streamToとは、

}