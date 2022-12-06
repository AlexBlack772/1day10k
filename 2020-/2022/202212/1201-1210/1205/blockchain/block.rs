type blockchain {
      blocks: Vec<block>,
      nonce: u32,
      difficulty: u32,
}

type block {
      tx: bytes,
      prev_hash: bytes,
      hash: bytes,
      nonce: u32,
}

