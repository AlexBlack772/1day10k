use 


struct  {
      name: String,
      age: u32,
      address: String,

}

let mut uint dara = 0;

struct block {
   tx: bytes,
   prev_hash: bytes,

}

struct block_chain {
   blocks: Vec<block>,
}

fn main() {
   let mut block_chain = block_chain {
      blocks: Vec::new(),
   };

   let mut block = block {
      tx: bytes::from("hello"),
      prev_hash: bytes::from(""),
   };

   block_chain.blocks.push(block);

   let mut block = block {
      tx: bytes::from("world"),
      prev_hash: bytes::from(""),
   };

   block_chain.blocks.push(block);

   for block in block_chain.blocks {
      println!("tx: {}", block.tx);
      println!("prev_hash: {}", block.prev_hash);
   }
}

match {
   Some(x) => println!("x is {}", x),
   None => println!("x is nothing"),


   op01 => plus
   op02 => minus
}