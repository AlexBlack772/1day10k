if (typeof window === 'undefined') {
   var window = {};
}

function div(a, b) {
   return a / b;
}


function mul(a, b) {
   return a * b;
}

function add(a, b) {
   return a + b;
   console.log(a,b)
}

try {
   console.log('test');
}catch (e){
   console.log(e);
}

function sub(a, b) {

   return a - b;
}

function mod(a, b) {

   return a % b;
}

class blockchain{
   constructor(){
      this.blockchain = [];
   }
   addBlock(block){
      this.blockchain.push(block);
   }
   getBlock(index){
      return this.blockchain[index];
   }
   getLatestBlock(){
      return this.blockchain[this.blockchain.length - 1];
   }
   getBlockCount(){
      return this.blockchain.length;
   }
}

class block{
   constructor(index, prevHash, timestamp, data, hash){
      this.index = index;
      this.prevHash = prevHash.toString();
      this.timestamp = timestamp;
      this.data = data;
      this.hash = hash.toString();
   }
}

class transaction
{
   constructor(fromAddress, toAddress, amount){
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.amount = amount;
   }
}


class wallet{
   constructor(){
      this.privateKey = window.crypto.getRandomValues(new Uint8Array(32));
      this.publicKey = window.crypto.subtle.exportKey("jwk", this.privateKey);
   }
   getPrivateKey(){
      return this.privateKey;
   }
   getPublicKey(){
      return this.publicKey;
   }
}

