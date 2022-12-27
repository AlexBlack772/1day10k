//ethers.js is a library for interacting with the Ethereum blockchain and its ecosystem.
//provider.getCode()
await provider.getCode(addressOrName);
//Returns the contract code at the given address.
//provider.getBlock()
await provider.getBlock(blockHashOrBlockTag);
//Returns a block object for the given block hash or block tag.
//provider.getBlockNumber()
await provider.getBlockNumber();
//Returns the current block number.
//provider.getGasPrice()
await provider.getGasPrice();
//Returns the current gas price.
//provider.getNetwork()
await provider.getNetwork();
//Returns the network that the provider is connected to.
//provider.getStorageAt()
await provider.getStorageAt(addressOrName, position, blockTag);
//Returns the value from storage at position for the given address in the given block.
//provider.getTransaction()
await provider.getTransaction(transactionHash);
//Returns a transaction object for the given transaction hash.
//provider.getTransactionCount()
await provider.getTransactionCount(addressOrName, blockTag);
//Returns the number of transactions sent from the given address.
//provider.getTransactionReceipt()
await provider.getTransactionReceipt(transactionHash);
//Returns a transaction receipt for the given transaction hash.
//provider.getUncle()
await provider.getUncle(blockHashOrBlockTag, uncleIndex);
//Returns an uncle object for the given block hash and uncle index position.
//provider.send()
await provider.send(method, params);
//Sends a JSON-RPC request to the node.
//provider.call()
await provider.call(transaction, blockTag);
//Calls a transaction without creating it first.
//provider.estimateGas()
await provider.estimateGas(transaction);
//Estimates the gas required to execute a transaction.
//provider.getLogs()
await provider.getLogs(filter);
//Returns an array of all logs matching filter.
//provider.resolveName()
await provider.resolveName(name);
//Resolves a name to an address.
//provider.lookupAddress()
await provider.lookupAddress(address);
//Looks up the reverse record for an address.
//provider.on()
provider.on(eventName, listener);
//Adds a listener for events.
//provider.once()
provider.once(eventName, listener);
//provider.getAvatar()
await provider.getAvatar(addressOrName);
//Returns the avatar URL for the given address.
//provider.getResolver()
await provider.getResolver(addressOrName);
//Returns the resolver contract for the given address.
//provider.resolveName()
await provider.resolveName(name);
//Resolves a name to an address.
//provider.lookupAddress()
await provider.lookupAddress(address);
//Looks up the reverse record for an address.
//resolver.getAddress()
await resolver.getAddress(nodeHash);
//Returns the address associated with the given node.
//resolver.getContent()
await resolver.getContent(nodeHash);
//Returns the content hash associated with the given node.
//resolver.getText()
await resolver.getText(nodeHash, key);
//Returns the text data associated with the given node and key.
//provider.getLogs()
await provider.getLogs(filter);
//Returns an array of all logs matching filter.
//provider.getNetwork()
await provider.getNetwork();
//Returns the network that the provider is connected to.
//provider.getBalance()
await provider.getBalance(addressOrName, blockTag);
//Returns the balance of the account of given address.
//provider.getGasPrice()
await provider.getGasPrice();
//Returns the current gas price.
//provider.getFeeDate()
await provider.getFeeData();
//Returns the current fee data.
//provider.getHistory()
await provider.getHistory(addressOrName, startBlock, endBlock);
//Returns the history of the account of given address.
//provider.getNetwork()
await provider.getNetwork();
//Returns the network that the provider is connected to.
//provider.ready()
await provider.ready;
//Returns a promise that resolves when the provider is ready.
//provider.call()
await provider.call(transaction, blockTag);
//Calls a transaction without creating it first.
//proveir.estimateGas()
await provider.estimateGas(transaction);
//Estimates the gas required to execute a transaction.
//provider.getTransaction()
await provider.getTransaction(transactionHash);
//Returns a transaction object for the given transaction hash.
//provider.getTransactionCount()