//provider.getCode("registrar.firefly.eth")とは、
await provider.getCode("registrar.firefly.eth");

// provider.getCode()は、
await provider.getCode("registrar.firefly.eth");

//provider.getBlockWithTransactions( block )とは、
provider.getBlockWithTransactions(block)

//contract.attach( addressOrName ) とは、
contract.attach(addressOrName)

//contract.deployed() とは、
contract.connect(providerOrSigner) 

Contract.isIndexed(value) 

//contract.queryFilter( event [ , fromBlockOrBlockHash [ , toBlock ] ) とは、
contract.queryFilter(event[ , fromBlockOrBlockHash[ , toBlock] ) 

//contract.listenerCount( [ event ] )
contract.listenerCount([event])

//contract.listeners( event )
contract.listeners(event)

contract.off(event, listener)

contract.on(event, listener) 

erc20.deposit()

contract.functions.withdraw()

contract.functions.tranfer()

erc721.safeTransferFrom(from, to, tokenId)

contract

alchemy.getBalance(addressOrName, blockTag)

metamask.getCode(addressOrName, blockTag)

ownerContract.getBalance

new ethers.Metamask()


wallet.sendTransaction(transaction)

wallet.encrypt(password)

wallet.decrypt(json, password)

// Create a wallet instance from a mnemonic...
mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...or from a private key
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// The address as a Promise per the Signer API
await walletMnemonic.getAddress()
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// A Wallet address is also available synchronously
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// The wallet mnemonic
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: "m/44'/60'/0'/0/0",
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Note: A wallet created with a private key does not
//       have a mnemonic (the derivation prevents it)
walletPrivateKey.mnemonic
// null

// Signing a message
await walletMnemonic.signMessage("Hello World")
// '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c'

tx = {
   to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
   value: utils.parseEther("1.0")
}

// Signing a transaction
await walletMnemonic.signTransaction(tx)
// '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc'

// The connect method returns a new instance of the
// Wallet connected to a provider
wallet = walletMnemonic.connect(provider)

// Querying the network
await wallet.getBalance();
// { BigNumber: "42" }
await wallet.getTransactionCount();
// 2

await wallet.sendTransaction(tx)

address = "0x8ba1f109551bD432803012645Ac136ddd64DBA72"
signer = new ethers.VoidSigner(address, provider)

// The DAI token contract
abi = [
   "function balanceOf(address) view returns (uint)",
   "function transfer(address, uint) returns (bool)"
]
contract = new ethers.Contract("dai.tokens.ethers.eth", abi, signer)

// Get the number of tokens for this account
tokens = await contract.balanceOf(signer.getAddress())
// { BigNumber: "6026189439794538201631" }

//
// Pre-flight (check for revert) on DAI from the signer
//
// Note: We do not have the private key at this point, this
//       simply allows us to check what would happen if we
//       did. This can be useful to check before prompting
//       a request in the UI
//

// This will pass since the token balance is available
await contract.callStatic.transfer("donations.ethers.eth", tokens)
// true

// This will fail since it is greater than the token balance
await contract.callStatic.transfer("donations.ethers.eth", tokens.add(1))
// [Error: call revert exception; VM Exception while processing transaction: reverted with reason string "Dai/insufficient-balance" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ]] {
//   address: 'dai.tokens.ethers.eth',
//   args: [
//     'donations.ethers.eth',
//     { BigNumber: "6026189439794538201632" }
//   ],
//   code: 'CALL_EXCEPTION',
//   data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184461692f696e73756666696369656e742d62616c616e63650000000000000000',
//   errorArgs: [
//     'Dai/insufficient-balance'
//   ],
//   errorName: 'Error',
//   errorSignature: 'Error(string)',
//   method: 'transfer(address,uint256)',
//   reason: 'Dai/insufficient-balance',
//   transaction: {
//     data: '0xa9059cbb000000000000000000000000643aa0a61eadcc9cc202d1915d942d35d005400c000000000000000000000000000000000000000000000146ae2da75f83adc220',
//     from: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//     to: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
//   }
// }

//
new ethers.providers.AlchemyProvider()

// Connect to mainnet (homestead)
provider = new AlchemyProvider();

// Connect to the goerli testnet
// (see EtherscanProvider above for other network examples)
provider = new AlchemyProvider("goerli");

// Connect to mainnet with an API key (these are equivalent)
provider = new AlchemyProvider(null, apiKey);
provider = new AlchemyProvider("homestead", apiKey);

// Connect to the Alchemy WebSocket endpoints with a WebSocketProvider
provider = AlchemyProvider.getWebSocketProvider()

await provider.getBlock(100004)
// {
//   _difficulty: { BigNumber: "3849295379889" },
//   difficulty: 3849295379889,
//   extraData: '0x476574682f76312e302e312d39383130306634372f6c696e75782f676f312e34',
//   gasLimit: { BigNumber: "3141592" },
//   gasUsed: { BigNumber: "21000" },
//   hash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
//   miner: '0x909755D480A27911cB7EeeB5edB918fae50883c0',
//   nonce: '0x1a455280001cc3f8',
//   number: 100004,
//   parentHash: '0x73d88d376f6b4d232d70dc950d9515fad3b5aa241937e362fdbfd74d1c901781',
//   timestamp: 1439799168,
//   transactions: [
//     '0x6f12399cc2cb42bed5b267899b08a847552e8c42a64f5eb128c1bcbd1974fb0c'
//   ]
// }

provider.on(eventName, listener) 

provider.on("block", (blockNumber) => {
   // Emitted on every block change
})


provider.once(txHash, (transaction) => {
   // Emitted when the transaction has been mined
})


// This filter could also be generated with the Contract or
// Interface API. If address is not specified, any address
// matches and if topics is not specified, any log matches
filter = {
   address: "dai.tokens.ethers.eth",
   topics: [
      utils.id("Transfer(address,address,uint256)")
   ]
}
provider.on(filter, (log, event) => {
   // Emitted whenever a DAI token transfer occurs
})


// Notice this is an array of topic-sets and is identical to
// using a filter with no address (i.e. match any address)
topicSets = [
   utils.id("Transfer(address,address,uint256)"),
   null,
   [
      hexZeroPad(myAddress, 32),
      hexZeroPad(myOtherAddress, 32)
   ]
]
provider.on(topicSets, (log, event) => {
   // Emitted any token is sent TO either address
})


provider.on("pending", (tx) => {
   // Emitted when any new pending transaction is noticed
});


provider.on("error", (tx) => {
   // Emitted when any error occurs
});

base64.decode("EjQ=");

ethers.utils.getAddress(address) 

ethers.utils.getAddress("0x8ba1f109")

//ethers.utils.toUtf8Bytes( text [ , form = current ] )
ethers.utils.toUtf8Bytes(text[ , form = current])

ethers.utils.UnicodeNormalizationForm.NFC

const bytecode = "0x608060405234801561001057600080fd5b506040516103bc3803806103bc83398101604081905261002f9161007c565b60405181815233906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a333600090815260208190526040902055610094565b60006020828403121561008d578081fd5b5051919050565b610319806100a36000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063313ce5671461005157806370a082311461006557806395d89b411461009c578063a9059cbb146100c5575b600080fd5b604051601281526020015b60405180910390f35b61008e610073366004610201565b6001600160a01b031660009081526020819052604090205490565b60405190815260200161005c565b604080518082018252600781526626bcaa37b5b2b760c91b6020820152905161005c919061024b565b6100d86100d3366004610222565b6100e8565b604051901515815260200161005c565b3360009081526020819052604081205482111561014b5760405162461bcd60e51b815260206004820152601a60248201527f696e73756666696369656e7420746f6b656e2062616c616e6365000000000000604482015260640160405180910390fd5b336000908152602081905260408120805484929061016a9084906102b6565b90915550506001600160a01b0383166000908152602081905260408120805484929061019790849061029e565b90915550506040518281526001600160a01b0384169033907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a350600192915050565b80356001600160a01b03811681146101fc57600080fd5b919050565b600060208284031215610212578081fd5b61021b826101e5565b9392505050565b60008060408385031215610234578081fd5b61023d836101e5565b946020939093013593505050565b6000602080835283518082850152825b818110156102775785810183015185820160400152820161025b565b818111156102885783604083870101525b50601f01601f1916929092016040019392505050565b600082198211156102b1576102b16102cd565b500190565b6000828210156102c8576102c86102cd565b500390565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220d80384ce584e101c5b92e4ee9b7871262285070dbcd2d71f99601f0f4fcecd2364736f6c63430008040033";

// A Human-Readable ABI; we only need to specify relevant fragments,
// in the case of deployment this means the constructor
const abi = [
   "constructor(uint totalSupply)"
];

const factory = new ethers.ContractFactory(abi, bytecode, signer)

// Deploy, setting total supply to 100 tokens (assigned to the deployer)
const contract = await factory.deploy(parseUnits("100"));

// The contract is not currentl live on the network yet, however
// its address is ready for us
contract.address
// '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B'

// Wait until the contract has been deployed before interacting
// with it; returns the receipt for the deployemnt transaction
await contract.deployTransaction.wait();
// {
//   blockHash: '0xcbab6ab38dbdba4a54ea39d173c2f66ed5b3523a025606cf6c6f48dbb1e9fc69',
//   blockNumber: 23,
//   byzantium: true,
//   confirmations: 1,
//   contractAddress: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//   cumulativeGasUsed: { BigNumber: "250842" },
//   effectiveGasPrice: { BigNumber: "1549195017" },
//   events: [
//     {
//       address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//       blockHash: '0xcbab6ab38dbdba4a54ea39d173c2f66ed5b3523a025606cf6c6f48dbb1e9fc69',
//       blockNumber: 23,
//       data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
//       getBlock: [Function (anonymous)],
//       getTransaction: [Function (anonymous)],
//       getTransactionReceipt: [Function (anonymous)],
//       logIndex: 0,
//       removeListener: [Function (anonymous)],
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x0000000000000000000000000000000000000000000000000000000000000000',
//         '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1'
//       ],
//       transactionHash: '0xb83dcaec034c9b53efedfeb498cdd49bcc669f45d7d17278e92dd4580e9b6aaa',
//       transactionIndex: 0
//     }
//   ],
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   gasUsed: { BigNumber: "250842" },
//   logs: [
//     {
//       address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//       blockHash: '0xcbab6ab38dbdba4a54ea39d173c2f66ed5b3523a025606cf6c6f48dbb1e9fc69',
//       blockNumber: 23,
//       data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
//       logIndex: 0,
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x0000000000000000000000000000000000000000000000000000000000000000',
//         '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1'
//       ],
//       transactionHash: '0xb83dcaec034c9b53efedfeb498cdd49bcc669f45d7d17278e92dd4580e9b6aaa',
//       transactionIndex: 0
//     }
//   ],
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008001000000000000000000000000400000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000002000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000020000000000000000000',
//   status: 1,
//   to: null,
//   transactionHash: '0xb83dcaec034c9b53efedfeb498cdd49bcc669f45d7d17278e92dd4580e9b6aaa',
//   transactionIndex: 0,
//   type: 2
// }

// Before...
formatUnits(await erc20_rw.balanceOf(signer.getAddress()));
// '100.0'

// Transfer 1.23 tokens to the ENS name "ricmoo.eth"
tx = await erc20_rw.transfer("ricmoo.eth", parseUnits("1.23"));
// {
//   accessList: [],
//   chainId: 1337,
//   confirmations: 0,
//   data: '0xa9059cbb0000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca0000000000000000000000000000000000000000000000001111d67bb1bb0000',
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   gasLimit: { BigNumber: "51558" },
//   gasPrice: null,
//   hash: '0xa2f3801c0d10f1c21a3d858814023702d9532ea1ae000342cb025a1c1747cec4',
//   maxFeePerGas: { BigNumber: "1598390034" },
//   maxPriorityFeePerGas: { BigNumber: "1500000000" },
//   nonce: 2,
//   r: '0xcbf78dfbcd816b0979f75850a24882cb74c4981f2d8a4f8bab2f5b2eef36c8bc',
//   s: '0x1434a139510210aa4b97c99143d78e8fc2becce14ee44b92c6e18416773beee4',
//   to: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//   type: 2,
//   v: 1,
//   value: { BigNumber: "0" },
//   wait: [Function (anonymous)]
// }

// Wait for the transaction to be mined...
await tx.wait();
// {
//   blockHash: '0x36a5f7913d2c9e5d75a9b0b58acff3e3cf4c13ad2bb4f97afa73ff08684b1971',
//   blockNumber: 24,
//   byzantium: true,
//   confirmations: 1,
//   contractAddress: null,
//   cumulativeGasUsed: { BigNumber: "51558" },
//   effectiveGasPrice: { BigNumber: "1543307950" },
//   events: [
//     {
//       address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//       args: [
//         '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//         '0x5555763613a12D8F3e73be831DFf8598089d3dCa',
//         { BigNumber: "1230000000000000000" },
//         amount: { BigNumber: "1230000000000000000" },
//         from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//         to: '0x5555763613a12D8F3e73be831DFf8598089d3dCa'
//       ],
//       blockHash: '0x36a5f7913d2c9e5d75a9b0b58acff3e3cf4c13ad2bb4f97afa73ff08684b1971',
//       blockNumber: 24,
//       data: '0x0000000000000000000000000000000000000000000000001111d67bb1bb0000',
//       decode: [Function (anonymous)],
//       event: 'Transfer',
//       eventSignature: 'Transfer(address,address,uint256)',
//       getBlock: [Function (anonymous)],
//       getTransaction: [Function (anonymous)],
//       getTransactionReceipt: [Function (anonymous)],
//       logIndex: 0,
//       removeListener: [Function (anonymous)],
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1',
//         '0x0000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca'
//       ],
//       transactionHash: '0xa2f3801c0d10f1c21a3d858814023702d9532ea1ae000342cb025a1c1747cec4',
//       transactionIndex: 0
//     }
//   ],
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   gasUsed: { BigNumber: "51558" },
//   logs: [
//     {
//       address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//       blockHash: '0x36a5f7913d2c9e5d75a9b0b58acff3e3cf4c13ad2bb4f97afa73ff08684b1971',
//       blockNumber: 24,
//       data: '0x0000000000000000000000000000000000000000000000001111d67bb1bb0000',
//       logIndex: 0,
//       topics: [
//         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//         '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1',
//         '0x0000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca'
//       ],
//       transactionHash: '0xa2f3801c0d10f1c21a3d858814023702d9532ea1ae000342cb025a1c1747cec4',
//       transactionIndex: 0
//     }
//   ],
//   logsBloom: '0x00000000000000000800000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008001000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000001000000000200000000000000000020000000000000000000',
//   status: 1,
//   to: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//   transactionHash: '0xa2f3801c0d10f1c21a3d858814023702d9532ea1ae000342cb025a1c1747cec4',
//   transactionIndex: 0,
//   type: 2
// }

// After!
formatUnits(await erc20_rw.balanceOf(signer.getAddress()));
// '98.77'

formatUnits(await erc20_rw.balanceOf("ricmoo.eth"));
// '1.23'

//
// The signer has enough tokens to send, so true is returned
await erc20_rw.callStatic.transfer("ricmoo.eth", parseUnits("1.23"));
// true

// A random address does not have enough tokens to
// send, in which case the contract throws an error
erc20_random = erc20_rw.connect(randomWallet);
await erc20_random.callStatic.transfer("ricmoo.eth", parseUnits("1.23"));
// [Error: call revert exception; VM Exception while processing transaction: reverted with reason string "insufficient token balance" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ]] {
//   address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//   args: [
//     'ricmoo.eth',
//     { BigNumber: "1230000000000000000" }
//   ],
//   code: 'CALL_EXCEPTION',
//   data: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001a696e73756666696369656e7420746f6b656e2062616c616e6365000000000000',
//   errorArgs: [
//     'insufficient token balance'
//   ],
//   errorName: 'Error',
//   errorSignature: 'Error(string)',
//   method: 'transfer(address,uint256)',
//   reason: 'insufficient token balance',
//   transaction: {
//     data: '0xa9059cbb0000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca0000000000000000000000000000000000000000000000001111d67bb1bb0000',
//     from: '0xc3074eC5F22F52D7654C89E486bfdF7D2C5dEB3F',
//     to: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B'
//   }
// }

//
filterFrom = erc20.filters.Transfer(signer.address);
// {
//   address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1'
//   ]
// }

// Search for transfers *from* me in the last 10 blocks
logsFrom = await erc20.queryFilter(filterFrom, -10, "latest");
// [
//   {
//     address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//     args: [
//       '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//       '0x5555763613a12D8F3e73be831DFf8598089d3dCa',
//       { BigNumber: "1230000000000000000" },
//       amount: { BigNumber: "1230000000000000000" },
//       from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//       to: '0x5555763613a12D8F3e73be831DFf8598089d3dCa'
//     ],
//     blockHash: '0x36a5f7913d2c9e5d75a9b0b58acff3e3cf4c13ad2bb4f97afa73ff08684b1971',
//     blockNumber: 24,
//     data: '0x0000000000000000000000000000000000000000000000001111d67bb1bb0000',
//     decode: [Function (anonymous)],
//     event: 'Transfer',
//     eventSignature: 'Transfer(address,address,uint256)',
//     getBlock: [Function (anonymous)],
//     getTransaction: [Function (anonymous)],
//     getTransactionReceipt: [Function (anonymous)],
//     logIndex: 0,
//     removeListener: [Function (anonymous)],
//     removed: false,
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1',
//       '0x0000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca'
//     ],
//     transactionHash: '0xa2f3801c0d10f1c21a3d858814023702d9532ea1ae000342cb025a1c1747cec4',
//     transactionIndex: 0
//   }
// ]

// Note that the args providees the details of the event, each
// parameters is available positionally, and since our ABI
// included parameter names also by name
logsFrom[0].args
// [
//   '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   '0x5555763613a12D8F3e73be831DFf8598089d3dCa',
//   { BigNumber: "1230000000000000000" },
//   amount: { BigNumber: "1230000000000000000" },
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   to: '0x5555763613a12D8F3e73be831DFf8598089d3dCa'
// ]

filterTo = erc20.filters.Transfer(null, signer.address);
// {
//   address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     null,
//     '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1'
//   ]
// }

// Search for transfers *to* me in the last 10 blocks
// Note: the contract transferred totalSupply tokens to us
//       when it was deployed in its constructor
logsTo = await erc20.queryFilter(filterTo, -10, "latest");
// [
//   {
//     address: '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B',
//     args: [
//       '0x0000000000000000000000000000000000000000',
//       '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//       { BigNumber: "100000000000000000000" },
//       amount: { BigNumber: "100000000000000000000" },
//       from: '0x0000000000000000000000000000000000000000',
//       to: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1'
//     ],
//     blockHash: '0xcbab6ab38dbdba4a54ea39d173c2f66ed5b3523a025606cf6c6f48dbb1e9fc69',
//     blockNumber: 23,
//     data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
//     decode: [Function (anonymous)],
//     event: 'Transfer',
//     eventSignature: 'Transfer(address,address,uint256)',
//     getBlock: [Function (anonymous)],
//     getTransaction: [Function (anonymous)],
//     getTransactionReceipt: [Function (anonymous)],
//     logIndex: 0,
//     removeListener: [Function (anonymous)],
//     removed: false,
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x0000000000000000000000000000000000000000000000000000000000000000',
//       '0x0000000000000000000000004342bf02bde4a21da695e8e82d3d79e85f3dfad1'
//     ],
//     transactionHash: '0xb83dcaec034c9b53efedfeb498cdd49bcc669f45d7d17278e92dd4580e9b6aaa',
//     transactionIndex: 0
//   }
// ]

// Note that the args providees the details of the event, each
// parameters is available positionally, and since our ABI
// included parameter names also by name
logsTo[0].args
// [
//   '0x0000000000000000000000000000000000000000',
//   '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   { BigNumber: "100000000000000000000" },
//   amount: { BigNumber: "100000000000000000000" },
//   from: '0x0000000000000000000000000000000000000000',
//   to: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1'
// ]

//
new ethers.ContractFactory()

contractFactory.attach(address)

contractFactory.getDeployTransaction(...args[ , overrides]) 

contractFactory.deploy(...args[ , overrides])

// If your contract constructor requires parameters, the ABI
// must include the constructor
const abi = [
   "constructor(address owner, uint256 initialValue)",
   "function value() view returns (uint)"
];

// The factory we use for deploying contracts
factory = new ContractFactory(abi, bytecode, signer)

// Deploy an instance of the contract
contract = await factory.deploy("ricmoo.eth", 42);

// The address is available immediately, but the contract
// is NOT deployed yet
contract.address
// '0x1Bfd68a1B13688D3DF2374880e0DFb622b3fcE56'

// The transaction that the signer sent to deploy
contract.deployTransaction
// {
//   accessList: [],
//   chainId: 1337,
//   confirmations: 0,
//   data: '0x608060405234801561001057600080fd5b5060405161012e38038061012e8339818101604052604081101561003357600080fd5b81019080805190602001909291908051906020019092919050505081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060008190555050506088806100a66000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633fa4f24514602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b6000805490509056fea2646970667358221220926465385af0e8706644e1ff3db7161af699dc063beaadd55405f2ccd6478d7564736f6c634300070400330000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca000000000000000000000000000000000000000000000000000000000000002a',
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   gasLimit: { BigNumber: "129862" },
//   gasPrice: null,
//   hash: '0x791c51fac15376b47a2ec86a0ae40bbff653e61cf0c4d8a7c221b090a9ae3e7a',
//   maxFeePerGas: { BigNumber: "1628039444" },
//   maxPriorityFeePerGas: { BigNumber: "1500000000" },
//   nonce: 0,
//   r: '0x153fdd61aa308c388294f277eeeba1b51ace10d94f56997fa66a91fe45a4a37e',
//   s: '0x528a9aee2f1ff81e2b11526c9ce3a266780ba1b68558eef7d35886ef48be6304',
//   to: null,
//   type: 2,
//   v: 0,
//   value: { BigNumber: "0" },
//   wait: [Function (anonymous)]
// }

// Wait until the transaction is mined (i.e. contract is deployed)
//  - returns the receipt
//  - throws on failure (the reciept is on the error)
await contract.deployTransaction.wait()
// {
//   blockHash: '0x8bfc8e41cb384c1d8eded72358dfacd78fd8588e62ab370ea75b4a177c53e1d0',
//   blockNumber: 22,
//   byzantium: true,
//   confirmations: 1,
//   contractAddress: '0x1Bfd68a1B13688D3DF2374880e0DFb622b3fcE56',
//   cumulativeGasUsed: { BigNumber: "129862" },
//   effectiveGasPrice: { BigNumber: "1556045891" },
//   events: [],
//   from: '0x4342bf02BDe4A21Da695E8e82D3d79E85F3dFAD1',
//   gasUsed: { BigNumber: "129862" },
//   logs: [],
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   status: 1,
//   to: null,
//   transactionHash: '0x791c51fac15376b47a2ec86a0ae40bbff653e61cf0c4d8a7c221b090a9ae3e7a',
//   transactionIndex: 0,
//   type: 2
// }

// Now the contract is safe to interact with
await contract.value()
// { BigNumber: "42" }

//

