class chain {
      constructor() {
         this.chain = [];
         this.difficulty = 4;
         this.pendingTransactions = [];
         this.miningReward = 100;
         this.createGenesisBlock();
      }
      createGenesisBlock() {
         this.chain.push(new block(0, "01/01/2017", "Genesis block", "0"));
      }
      getLatestBlock() {
         return this.chain[this.chain.length - 1];
      }
      minePendingTransactions(miningRewardAddress) {
         let block = new block(Date.now(), this.pendingTransactions);
         block.mineBlock(this.difficulty);
         console.log("Block successfully mined!");
         this.chain.push(block);
         this.pendingTransactions = [
               new transaction(null, miningRewardAddress, this.miningReward)
         ];
      }
      createTransaction(transaction) {
         this.pendingTransactions.push(transaction);
      }
   getBalanceOfAddress(address) {
      let balance = 0;
      for (const block of this.chain) {
      }
   }
}

class transaction {
   constructor(fromAddress, toAddress, amount) {
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.amount = amount;
   }
}

class block {
   constructor(timestamp, transactions, previousHash = "") {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce = 0;
   }
   calculateHash() {
      return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
   }
   mineBlock(difficulty) {
      while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
         this.nonce++;
         this.hash = this.calculateHash();
      }
      console.log("Block mined: " + this.hash);
   }
}

class address {
   constructor(address) {
      this.address = address;
   }
}

class blockchain {
   constructor() {
      this.chain = [];
      this.difficulty = 4;
      this.pendingTransactions = [];
      this.miningReward = 100;
      this.createGenesisBlock();
   }
   createGenesisBlock() {
      this.chain.push(new block(0, "01/01/2017", "Genesis block", "0"));
   }
   getLatestBlock() {
      return this.chain[this.chain.length - 1];
   }
   minePendingTransactions(miningRewardAddress) {
      let block = new block(Date.now(), this.pendingTransactions);
      block.mineBlock(this.difficulty);
      console.log("Block successfully mined!");
      this.chain.push(block);
      this.pendingTransactions = [
            new transaction(null, miningRewardAddress, this.miningReward)
      ];
   }
   createTransaction(transaction) {
      this.pendingTransactions.push(transaction);
   }
   
}