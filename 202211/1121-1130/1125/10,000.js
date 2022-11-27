//add function to the array
var arr = [];
arr.push(function () {
      console.log('Hello World 1');
}
);
//dictionary
var dic = {};
dic['key1'] = function () {
      console.log('Hello World 2');
}
//call function
arr[0]();
dic['key1']();
//arguments object
function foo() {
      console.log(arguments);
}
foo(1, 2, 3);
//arguments add function
function foo() {
      var args = Array.prototype.slice.call(arguments);
      args.push("bam");
      console.log(args);
}
foo("bar", "baz");
//create function
var add = new Function("first", "second", "return first + second");
console.log(add(1, 1));
//read function
function foo() {
      console.log(foo);
}
foo();
//update function
function foo() {
      console.log('Hello World');
}
foo();
foo = function () {
      console.log('Goodbye World');
}
foo();
//delete function
function foo() {
      console.log('Hello World');
}
foo();
delete foo;
foo();
//function expression
var foo = function () {
      console.log('Hello World');
}
foo();
//send function
function foo() {
      console.log('Hello World');
}
function bar(func) {
      func();
}
bar(foo);
//return function
function foo() {
      console.log('Hello World');
}
function bar() {
      return foo;
}
bar()();
//function constructor
var foo = new Function("console.log('Hello World')");
foo();
//function constructor with arguments
var foo = new Function("a", "b", "console.log(a + b)");
foo(1, 1);
//function constructor with return
var foo = new Function("a", "b", "return a + b");
console.log(foo(1, 1));
//blockchain is decentralized and distributed
//jsvascript err   
//try catch
try {
      console.log('Hello World');
      throw new Error('oops');
} catch (e) {


      console.log(e.message);
}
//prototype is a property of a function
//prototype is an object
// vim: set expandtab ts=4 sw=4 sts=4 tw=100:
//ethers.provider.getNetwork()
ethers.provider.getNetwork().then(function (network) {

      console.log(network);
}
);
//provoder.getBalance()
ethers.provider.getBalance('0x0000000000000000000000000000000000000000').then(function (balance) {
   
         console.log(balance);
}  
);

//ethers.provider.getGasPrice()
ethers.provider.getGasPrice().then(function (gasPrice) {
   
         console.log(gasPrice);
}
);

//provider.getCode() is the code of the contract
ethers.provider.getCode('0x0000000000000000000000000000000000000000').then(function (code) {
      
            console.log(code);
}
);

//provider.getTransactionCount() is the number of transactions
ethers.provider.getTransactionCount('0x0000000000000000000000000000000000000000').then(function (transactionCount) {

            console.log(transactionCount);
}
);
//provider.getBlock() is the block
ethers.provider.getBlock('0x0000000000000000000000000000000000000000').then(function (block) {
   