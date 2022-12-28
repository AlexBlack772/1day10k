var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var ethers = require('ethers');
const url = 'http://localhost:8545';
var provider = new ethers.providers.JsonRpcProvider(url);

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

signature = await wallet.signMessage(message);

const singer = provider.getSinger();
const factory = new ethers.ContractFactory(abi, bytecode, signer);
const contract = await factory.deploy();
console.log(contract.address);

const contract = new ethers.Contract(contractAddress, abi, provider);
const tx = await contract.set(5);

const abi = [
   "function set(uint256 value)",
   "function get() view returns (uint256)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);
await provider.getBalance(contractAddress);

provider.getCode(contractAddress);

await provider.getCode(contractAddress);

provider.getStorageAt(contractAddress, 0);

const contract = new ethers.Contract(contractAddress, abi, provider);

provider.getTransactionCount(contractAddress);

provider.getBlockNumber();

provider.getBlock(0);

provider.getBlockWithTransactions(0);
await provider.getBlockWithTransactions(0);

provider.getGasPrice();

provider.getAvatar('0x1234567890123456789012345678901234567890');

provider.getResolver('0x1234567890123456789012345678901234567890');

provider.resolveName('ricmoo.firefly.eth');  
await provider.resolveName('ricmoo.firefly.eth');

provider.lookupAddress('0x1234567890123456789012345678901234567890');

resolver.name = 'ricmoo.firefly.eth';

resolver.address = '0x1234567890123456789012345678901234567890';

resolver.getText('url');

resolver.getContentHash();

provider.getLogs({
   fromBlock: 0,
   toBlock: 'latest',
   address: contractAddress,
   topics: [ethers.utils.id('Transfer(address,address,uint256)')]
});

provider.on('block', (blockNumber) => {
   console.log('BLOCK', blockNumber);
}

)

provider.on('pending', (transaction) => {
   console.log('PENDING', transaction);
})

provider.getFeeData();

