use std::http::Request;
use std::http::Response;

type address {
      name: String,
      age: u32,
      address: String,
}

let mut uint dara = 0;
let 

fn
type 
trait
struct
enum
mod
use
impl
if
else
match
loop
while

for (let i = 0; i < array.length; i++) {
      const element = array[i];    
}

match {
      Some(x) => println!("x is {}", x),
      None => println!("x is nothing"),
}

match {
      op01 => plus
      op02 => minus
}

while (true) {
      console.log("Hello, world!");
}

for (let i = 0; i < 10; i++) {
      console.log(i);
}

for (let i = 0; i < 10; i++) {
      if (i === 5) {
            break;
      }
      console.log(i);
}

break
continue
match test {
      Some(x) => println!("x is {}", x),
      None => println!("x is nothing"),
      Some(y) => println!("y is {}", y),
}

let mut uint dara = 0;
let mut &str name = "yokin";
let mut &str address = "Tokyo";

let &'a mut str name = "yokin";
let &'a mut str address = "Tokyo";

impl 
#[derive(Debug)]
struct Person {
      name: String,
      age: u32,
      address: String,
}

#[cfg(test)]

#[test]

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

struct block<'a> {
      tx: bytes,
      prev_hash: bytes,
}

struct block_chain<'a> {
      blocks: Vec<block<'a>>,
}

impl block<'_> for {
      fn new(tx: bytes, prev_hash: bytes) -> block {
            block {
                  tx,
                  prev_hash,
            }
      }

      fn hash(&self) -> bytes {
            let mut hasher = Sha256::new();
            hasher.update(self.tx);
            hasher.update(self.prev_hash);
            hasher.finalize()
      }
}

trait block<'a> {
      fn new(tx: bytes, prev_hash: bytes) -> block<'a>;
      fn hash(&self) -> bytes;
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


bytes::from("hello")
Vec::new()
String::from("hello")
String::from("world")

//data type is bytes



enum test {
      op01,
      op02,
}

match test {
      op01 => plus
      op02 => minus
}

vec = Vec::new();
vec.push(1);

str = String::from("hello");
str.push("world");

hashmap = HashMap::new();
hashmap.insert("hello", "world");

fn test(str st1) -> Result {
      if st1 == "hello" {
            return Ok("world");
      } else {
            return Err("error");
      }
}

panic!("error");

struct block {
      tx: bytes,
      prev_hash: bytes,
      hash: bytes,
      nonce: u32,
}

let block1 = block {
      tx: bytes::from("hello"),
      prev_hash: bytes::from(""),
      hash: bytes::from(""),
      nonce: 0,
};


fn block_main(a: String) -> Block {
       Block {
            tx: bytes::from(a),
            prev_hash: bytes::from(""),
            hash: bytes::from(""),
            nonce: 0,
      };

      block.hash = block.hash();
      block
} 

fn err() {
      panic!("error");
}

struct block {
      tx: bytes,
      prev_hash: bytes,
      hash: bytes,
      nonce: u32,
}

enum Op{
      Op01,
      Op02,
}

fn operate(op: Op) -> Result {
      match op {
            Op::Op01 => Ok("plus"),
            Op::Op02 => Ok("minus"),
      }
}


enum Singou {
   Red,
   Blue,
   Green,
}

fn color(singou: Singou) -> Result {
      match singou {
            Singou::Red => Ok("red"),
            Singou::Blue => Ok("blue"),
            Singou::Green => Ok("green"),
      }
}

fn test1() {
   let sosuu = vec![2,3,5,7];
   for i in sosuu {
      println!("{}", i);
   }


}

fn test2() {
   let sosuu = vec![2,3,5,7];
   for i in sosuu {
      println!("{}", i);
   }
}

trait Block {
      fn new(tx: bytes, prev_hash: bytes) -> Block;
      fn hash(&self) -> bytes;
}

impl Block for block {
      fn new(tx: bytes, prev_hash: bytes) -> block {
            block {
                  tx,
                  prev_hash,
                  hash: bytes::from(""),
                  nonce: 0,
            }
      }

      fn hash(&self) -> bytes {
            let mut hasher = Sha256::new();
            hasher.update(self.tx);
            hasher.update(self.prev_hash);
            hasher.update(self.nonce.to_string());
            hasher.finalize()
      }
}

enum Syougakkou {
   Koutitsu,
   Siritsu
}

fn singaku (syougakkou: Syougakkou) -> Result {
      match syougakkou {
            Syougakkou::Koutitsu => Ok("koutitsu"),
            Syougakkou::Siritsu => Ok("siritsu"),
      }
}


#[cfg(test)]
mod tests {
   #[test]
   fn singaku(){
      let kourisu = Syougakkou::Koutitsu;
      assert_eq!(singaku(kourisu), Ok("koutitsu"));
   }
}


#[cfg(test)]
mod tests {
   #[test]
   fn singaku(){
      let kourisu = Syougakkou::Koutitsu;
      assert_eq!(singaku(kourisu), Ok("koutitsu"));
   }
}

struct block {
      tx: bytes,
      prev_hash: bytes,
      hash: bytes,
      nonce: u32,
}

fn a<>(a:String)

fn a(a:String, b:String) -> String {
      a + b
}

fn c<T>(a:T, b:T) -> T {
      a + b
}
%a = 1

*a = 1

&a = 1

fn a(a:u32) -> u32 {
      a + 1
}

a.address()

|a| a + 1

fn a(a:u32) -> u32 {
      a + 1
}

'a = 1

fn a(a:u32) -> u32 {
      a + 1
}

if let a -> b = c {
      a
}

if let a = b {
      a
}

if let Some(a) = b {
      a
}

if let Ok(a) = b {
      a
}

if let Err(a) = b {
      a
}
Box::new(1)

let a = Box::new(1);

impl Drop for a {
      fn drop(&mut self) {
            println!("drop");
      }
}

let a = Box::new(1);


struct temple<T> {
      a: T,
}

impl temple<T> {
      fn new(a: T) -> temple<T> {
            temple {
                  a,
            }
      }
}


struct temple<T, U> {
      a: T,
      b: U,
}

impl temple<T, U> {
      fn new(a: T, b: U) -> temple<T, U> {
            temple {
                  a,
                  b,
            }
      }
}

let closure = |num| num + 1;

let test_iter = test.iter()

for i in test_iter {
      println!("{}", closure(i));
}

pub trait Iterator {
      type Item;
      fn next(&mut self) -> Option<Self::Item>;
}

pub trait Iterator {
      type Item;
      fn next(&mut self) -> Option<Self::Item>;
      fn map<B, F>(self, f: F) -> Map<Self, F>
      where
            Self: Sized,
            F: FnMut(Self::Item) -> B,
      {
            Map { iter: self, f }
      }
}

pub struct Map<I, F> {
      iter: I,
      f: F,
}

let ter = a.iter()

Box::new(1)

Drop::drop(&mut a)

mod a {
      pub fn b() {
            println!("b");
      }
}

mod module {
      pub fn a() {
            println!("a");
      }
}

let mut hMap = HashMap::new();

hMap.insert("a", 1);
hMap.insert("b", 2);

for (key, value) in hMap {
      println!("{}: {}", key, value);
}

let a = &mut 1;

&lifetime a

&'a mut a

sleep(Duration::from_secs(1));

fn test() -> Result {
      let mut a = 1;
      let b = &mut a;
      *b = 2;
      Ok("test")
}

use std::thread;
use std::time::Duration;
println

RefCell<T> {
      value: T,
}

let a = RefCell::new(1);
fn test() -> Result {
      let mut a = 1;
      let b = &mut a;
      *b = 2;
      Ok("test")
}

let a =1;

let b = &mut a;

let c = &mut a;

impl tmpl<T> {
      fn new(a: T) -> tmpl<T> {
            tmpl {
                  a,
            }
      }
}

fn new(a: T) -> tmpl<T> {
      tmpl {
            a,
      }
}


match a {
      1 => println!("1"),
      2 => println!("2"),
      _ => println!("other"),
}

while let Some(a) = b {
      println!("{}", a);
}

fn a(a:u32) -> Result {
      Ok(a + 1)
}

fn a(a:u32) -> Drop {
      Ok(a + 1)
}

impl Drop for a {
      fn drop(&mut self) {
            println!("drop");
      }
}

let a = Box::new(1);

let a: Vec<u32> = vec![1, 2, 3];

let a = Vec::new();

let b = a.push(1);

async fn a() -> Result {
   await b();
   Ok("a")
}

as a

impl a as b {
      fn a() -> Result {
            Ok(1)
      }
}

loop {
      println!("a");
      break

}

continue -> break

let a = 1;

extern crate a;

use a::b;

use a::b::c;

for a in b {
      println!("{}", a);
}

for a in b {
      println!("{}", a);
}

ref a

let a = 1;

let ref b = a;

mod module;

fn main(){
      module::a();
}

use a as b;

use a::b as c;

loop {
   t = t + 1;
   if t == 2 {
      continue
   }
   if t == 10 {
      break;
   }
}

while t < 10 {
   t = t + 1;
   if t == 2 {
      continue
   }
   if t == 10 {
      break;
   }
}

macro_rules! a {
      ($a:expr) => {
            println!("{}", $a);
      }
}

fn a() -> Result {
      Ok(1)
}

a! {1}

let closure = |num| num + 1;

let tuple = (1, 2, 3);

let tuple2 = (a,1,2,3);

union a {
      a: u32,
      b: u32,
}

marcro_rules! b {
      ($a:expr) => {
            println!("{}", $a);
      }
}

const a: u32 = 1;

true
false
b'a'

r'a'

0xfff
0b1111
0o777
Vec<u32>::new()
char -> u32

str

let a = "a";

move || {
      println!("{}", a);
}

let a = 1;

self.a

static a: u32 = 1;

Self {
      a,
}

fn a() -> Self {
      Self {
            a,
      }
}

let a = 1;

super {
      a,
}

type a {
      a: u32,
}

let a = 1;\
where a: u32   

while a < 10 {
      a = a + 1;
}

impl a {
      fn a() -> Result {
            Ok(1)
      }
}

fn a() -> Result {
      Ok(1)
}

let a = 1;

let mut a = 1;

fn a<T>(a: T) -> Result {
      Ok(1)
}

struct a {
      a: u32,
}

type  a = u32;

enum a {
      a,
      b,
}

match a {
      a::a => println!("a"),
      a::b => println!("b"),
}

if a == 1 {
      println!("a");
} else if a == 2 {
      println!("b");
} else {
      println!("other");
}

loop {

   println!("a");
   continue:
      println!("a");
      break;

}

while a < 10 {
      println!("a");
      a = a + 1;
}

for a in b {
      println!("a");
}

let a = 1;

vec![1, 2, 3]

macro_rules! a {
      ($a:expr) => {
            println!("{}", $a);
      }
}

a! {1}

impl Drop for a {
      fn drop(&mut self) {
            println!("drop");
      }
}

trait a {
      fn a() -> Result {
            Ok(1)
      }
}

impl a for b {
      fn a() -> Result {
            Ok(1)
      }
}

trait a <T> {
      fn a() -> Result {
            Ok(1)
      }
}

impl a <T> for b {
      fn a() -> Result {
            Ok(1)
      }
}

println!("a");

[test]   
a = 1

fn a() -> Result {
      Ok(1)
}

assert_eq!(a, 1);

assert_ne!(a, 1);

assert!(a);

assert!(!a);

assert!(a, "a");

assert!(a, "a: {}", a);

mod module {
      fn a() -> Result {
            Ok(1)
      }
}

fn a() static -> Result {
      Ok(1)
}

mod module {
      fn a() static -> Result {
            Ok(1)
      }
}

fn a() -> Result {
      Ok(1)
}

mod module {
      fn a() -> Result {
            Ok(1)
      }
}

if a == 1 {
      println!("a");
} else if a == 2 {
      println!("b");
} else {
      println!("other");
}

loop {
      println!("a");
      continue;
      println!("a");
      break;
}

while a < 10 {
      println!("a");
      a = a + 1;
}

for a in b {
      println!("a");
}

let a = 1;

vec![1, 2, 3]

let a = 1;

pub fn a() -> Result {
      Ok(1)
}

pub mod module {
      fn a() -> Result {
            Ok(1)
      }
}

pub struct a {
      a: u32,
}


fn a() -> Result {
      Ok(1)
}


