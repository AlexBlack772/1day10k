struct block {
   tx: bytes,
   prev_hash: bytes,
   nonce: u32,

}

struct tx {
   inputut: Vec<tx_in>,
   output: Vec<tx_out>,
      
}

struct blockchain {
   blocks: Vec<block>,
   nonce: u32,
   difficulty: u32,

}


fn pow(block: block) -> block {
   let mut block = block;
   let mut nonce = 0;
   let mut hash = sha256::hash(&block);
   while !hash.starts_with("0000") {
      nonce += 1;
      hash = sha256::hash(&block);
   }
   block.nonce = nonce;
   block
}


impl block {
   fn new(tx: bytes, prev_hash: bytes) -> block {
      block {
         tx: tx,
         prev_hash: prev_hash,
         nonce: 0,
      }
   }
}

trait hashable {
   fn hash(&self) -> bytes;
}

impl hashable for block {
   fn hash(&self) -> bytes {
      let mut hasher = sha256::Hasher::new();
      hasher.write(&self.tx);
      hasher.write(&self.prev_hash);
      hasher.write(&self.nonce.to_string().as_bytes());
      hasher.finish()
   }
}

fn pow (block: block) -> block {
   let mut block = block;
   let mut nonce = 0;
   let mut hash = block.hash();
   while !hash.starts_with("0000") {
      nonce += 1;
      hash = block.hash();
   }
   block.nonce = nonce;
   block
}


