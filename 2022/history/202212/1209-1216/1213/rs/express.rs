type block {
   txs: [tx]
   nonce : u64

}

struct tx {
   from: address
   to: address
   amount: u64
   signature: [u8]
}

struct address {
   bytes: [u8]
}

trait BlockChain {
   fn new() -> Self;
   fn add_block(&mut self, block: block) -> bool;
   fn get_balance(&self, address: address) -> u64;
   fn get_last_block(&self) -> block;
   fn get_block(&self, index: u64) -> block;
   fn get_block_count(&self) -> u64;
   fn get_block_hash(&self, index: u64) -> [u8];
   fn get_block_by_hash(&self, hash: [u8]) -> block;
   fn get_block_by_tx(&self, tx: tx) -> block;
   fn get_tx(&self, index: u64) -> tx;
}

struct BlockChainImpl {
   blocks: [block]
}

impl BlockChain for BlockChainImpl {
   fn new() -> Self {
      BlockChainImpl {
         blocks: []
      }
   }

   fn add_block(&mut self, block: block) -> bool {
      self.blocks.push(block);
      true
   }

   fn get_balance(&self, address: address) -> u64 {
      let mut balance = 0;
      for block in self.blocks {
         for tx in block.txs {
            if tx.to == address {
               balance += tx.amount;
            }
            if tx.from == address {
               balance -= tx.amount;
            }
         }
      }
      balance
   }

   fn get_last_block(&self) -> block {
      self.blocks[self.blocks.len() - 1]
   }

   fn get_block(&self, index: u64) -> block {
      self.blocks[index]
   }

   fn get_block_count(&self) -> u64 {
      self.blocks.len() as u64
   }

   fn get_block_hash(&self, index: u64) -> [u8] {
      let block = self.get_block(index);
      let mut hasher = Sha256::new();
      hasher.input(block);
      hasher.result()
   }

   fn get_block_by_hash(&self, hash: [u8]) -> block {
      for block in self.blocks {
         let mut hasher = Sha256::new();
         hasher.input(block);
         if hasher.result() == hash {
            return block;
         }
      }
      panic!("Block not found");
   }

   fn get_block_by_tx(&self, tx: tx) -> block {
      for block in self.blocks {
         for block_tx in block.txs {
            if block_tx == tx {
               return block;
            }
         }
      }
      panic!("Block not found");
   }

   fn get_tx(&self, index: u64) -> tx {
      let mut tx_index = 0;
      for block in self.blocks {
         for tx in block.txs {
            if tx_index == index {
               return tx;
            }
            tx_index += 1;
         }
      }
      panic!("Tx not found");
   }
}

fn main() {
   let mut blockchain = BlockChainImpl::new();
   let mut block = block {
      txs: [],
      nonce: 0
   };
   let tx = tx {
      from: address {
         bytes: [0; 32]
      },
      to: address {
         bytes: [1; 32]
      },
      amount: 100,
      signature: [0; 64]
   };
   block.txs.push(tx);
   blockchain.add_block(block);
   println!("Balance: {}", blockchain.get_balance(address {
      bytes: [1; 32]
   }));
}

