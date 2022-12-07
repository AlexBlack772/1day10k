fn add(uint a, uint b) -> uint {
    a + b
}

fn main() {
    let a = 1u;
    let b = 2u;
    let c = add(a, b);
    println(c.to_str());
}

while (true) {
    println("Hello, world!");
}

if (true) {
    println("Hello, world!");
} else {
      println("Goodbye, world!");
}

let x = 1u;

const x = 1u;

#[test]
fn test_add() {
    assert add(1u, 2u) == 3u;
}

mod foo {
    fn bar() {
        println("Hello, world!");
    }
}

struct Point {
    x: int,
    y: int,
}

impl Point {
    fn new(x: int, y: int) -> Point {
        Point { x: x, y: y }
    }
}

enum Option<T> {
    Some(T),
    None,
}

fn main() {
    let x = Some(1);
    let y = None;
}

while (true) {
    println("Hello, world!");
}

loop {
   continue 'outer;
    println("Hello, world!");
    break 'outer;
}

if (true) {
    println("Hello, world!");
} else {
      println("Goodbye, world!");
}

let x = 1u;

impl block {
    fn foo() {
        println("Hello, world!");
    }
}

struct block {
    x: int,
    y: int,
}

trait block {
    fn foo();
}

trait block for int {
    fn foo();
}

impl block for int {
    fn foo() {
        println("Hello, world!");
    }
}

let x = 1u;

match x {
   x = 1 => println("one"),
   x =  2 => println("two"),
   x =  _ => println("other"),
}

mod foo {
    fn bar() {
        println("Hello, world!");
    }
}

struct Point {
    x: int,
    y: int,
}

let mut x = 1u;

pub fn foo() {
    println("Hello, world!");
}

ref x = 1u;

fn foo(x: &int) {
    println(x.to_str());

    return 1;
}

fn foo(x: &int) {
    println(x.to_str());

    return;
}

super foo() {
    println("Hello, world!");
}

use foo::bar;

use foo::bar as baz;

use foo::{bar, baz};

use foo::{bar, baz as quux};

self foo() {
    println("Hello, world!");
}

for a in 0..10 {
      println(a.to_str());
}

macro_rules! foo {
    () => (println("Hello, world!"));
}

macro_rules! foo {
    ($x:expr) => (println($x.to_str()));
}

macro_rules! foo {
    ($x:expr) => (println($x.to_str()));
    ($x:expr, $y:expr) => (println($x.to_str() + $y.to_str()));
}

fn foo()  static {
    println("Hello, world!");
}  

struct Point {
    x: int,
    y: int,
}

fn foo() unsafe {
    println("Hello, world!");
}

unsafe fn foo() {
    println("Hello, world!");
}

extern fn foo()  {
    println("Hello, world!");
}

type Foo = int;

type test {
      x: int,
      y: int,
}

fn foo() -> String {
    println("Hello, world!");
}

enum Option<T> {
    Some(T),
    None,
}


[#derive(Show)]

struct Point {
    x: int,
    y: int,
}

[derive(Show)]

[test(serialize,deserialize,parti)]

Box::new(1)

Box<T> {
    data: T,
}

impl Drop for Box<T> {
    fn drop(&self) {
        unsafe {
            let _: T = ptr::read(&self.data);
        }
    }
}

type Foo = int;

Rc<T> {
    data: T,
    strong: uint,
    weak: uint,
}

Ref<T> {
    data: T,
    strong: uint,
    weak: uint,
}

fn foo() -> String {
    println("Hello, world!");
}

enum Option<T> {
    Some(T),
    None,
}

#[derive(Show)]

#[test(serialize,deserialize,parti)]

&x
impl a<T> for b<T> {
    fn foo() {
        println("Hello, world!");
    }
}

<a'c> fn foo() {
    println("Hello, world!");
}

#[cfg(test)]
fn foo() {
    println("Hello, world!");
}

#[cfg(test, target_os = "linux")]

fn foo() {
    println("Hello, world!");
}

#[macro_export]
macro_rules! foo {
    () => (println("Hello, world!"));
}

#[macro_use]
extern crate foo;

#[macro_use(foo)]
extern crate foo;

#[derive(Show)]

thread::scoped(|| {
    println("Hello, world!");
});

|a, b| a + b

let x = |a, b| a + b;

let x = |a, b| {
    a + b
};

let x = |a, b| -> int {
    a + b
};

let v1 = vec![1, 2, 3];

let v1_iter = v1.iter();

for val in v1_iter {
    println(val.to_str());
}

pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}

impl Iterator for Vec<T> {
    type Item = T;
    fn next(&mut self) -> Option<T> {
        if self.len() == 0 {
            None
        } else {
            Some(self.shift())
        }
    }
}

let v1 = vec![1, 2, 3];

#[attribute = "foo"]

#[attribute(key = "value")]

#[allow(non_snake_case)]


#![crate_type = "lib"]

#![crate_type = "bin"]

#[cfg]

fn foo<T>(x: T) -> T {
    x
}

macro_rules! foo {
    () => (println("Hello, world!"));
}

struct Point {
    x: int,
    y: int,
}

trait Foo {
    fn foo(&self);
}

impl Foo for Point {
    fn foo(&self) {
        println("Hello, world!");
    }
}

struct Point {
    x: int,
    y: int,
}

fn new(x: int, y: int) -> Point {
    Point {
        x: x,
        y: y,
    }
}

#[derive(Show)]

#[derive(Debug)]

#[derive(Eq, PartialEq,Ord, PartialOrd,Clone,Hash)]

#[derive(Copy,Clone,Hash,Default,Debug)]

use std::fmt;

#[derive(Debug)]

struct Droppable {
      name: &'static str,
}

impl Drop for Droppable {
      fn drop(&mut self) {
            println!("> Dropping {}", self.name);
      }
}

fn main() {
      let _a = Droppable { name: "a" };
      {
            let _b = Droppable { name: "b" };
            let _c = Droppable { name: "c" };
            println!("Exiting block");
      }
      println!("Exiting main");
}

struct Fibonacci {
      curr: uint,
      next: uint,
}

impl Clone for Fibonacci {
      fn clone(&self) -> Fibonacci {
            *self
      }
}

impl Iterator<uint> for Fibonacci {
      fn next(&mut self) -> Option<uint> {
            let new_next = self.curr + self.next;
            self.curr = self.next;
            self.next = new_next;
            Some(self.curr)
      }
}

trait Iterator<T> {
      fn next(&mut self) -> Option<T>;
}

macro_rules! vec {
      ($($x:expr),*) => ({
            let mut temp_vec = Vec::new();
            $(
                  temp_vec.push($x);
            )*
            temp_vec
      })
}

macro_rules! vec {
      ($($x:expr),*) => ({
            let mut temp_vec = Vec::new();
            $(
                  temp_vec.push($x);
            )*
            temp_vec
      })
}

fn main() {
      let v = vec![1, 2, 3];
      println!("{}", v);
}

macro_rules! vec {
      ($($x:expr),*) => ({
            let mut temp_vec = Vec::new();
            $(
                  temp_vec.push($x);
            )*
            temp_vec
      })
}

mod test {
      macro_rules! vec {
            ($($x:expr),*) => ({
                  let mut temp_vec = Vec::new();
                  $(
                        temp_vec.push($x);
                  )*
                  temp_vec
            })
      }

}

macro_rules! calculate {
      (eval $e:expr) => {{
            {
                  let val: usize = $e; // Force types to be integers
                  println!("{} = {}", stringify!{$e}, val);
            }
      }}
}

macro_rules! calculate {
      (eval $e:expr) => {{
            {
                  let val: usize = $e; // Force types to be integers
                  println!("{} = {}", stringify!{$e}, val);
            }
      }}
}

//option
fn test(test:Option<&str>){
    match test{
        Some(test) => println!("test is {}",test),
        None => println!("test is none"),
    }
}

//result
fn test(test:Result<&str,&str>){
    match test{
        Ok(test) => println!("test is {}",test),
        Err(test) => println!("test is {}",test),
    }
}

//?
fn test(test:Option<&str,&str>)->Option<&str>{
    let test = test?;
    println!("test is {}",test);
}

#![feature(try_from)]

@try_from
fn test(test:Option<&str>)->Option<&str>{
    let test = test?;
    println!("test is {}",test);
}

#![allow(unused_variables)]

mod test{
    pub fn test(){
        let test = "test";
    }
}

mod test{
    pub fn test(){
        let test = "test";
    }
}

let test = "test";

const TEST:&str = "test";

impl Test{
    pub fn test(){
        let test = "test";
    }
}

fn test(){
    let test = "test";
}

#[allow(dead_code)]

#[allow(unused_variables)]

#[allow(unused_imports)]

fn test(){
    let test = "test";
}

#[allow(dead_code)]

fn test(){
    let test = "test";
}

const Language: &'static str = "Rust";

const THRESHOLD: i32 = 10;

#[derive(PartialEq, Debug,Eq,Hash)]

Some(1)
Ok(1)
Err(1)

let test = Some(1);

Rc<T>

Rc::new(1)

use std::rc::Rc;
use std::cell::RefCell;
static mut TEST:Option<Rc<RefCell<i32>>> = None;

fn test(){
    unsafe{
        TEST = Some(Rc::new(RefCell::new(1)));
    }
}

fn test(){
    let test = Rc::new(RefCell::new(1));
}

use std::path::Path;
let path = Path::new("test");

use std::error::Error;
use std::fs::File;
use std::io::prelude::*;

fn main() {
    let mut f = match File::open("test.txt") {
        Err(why) => panic!("couldn't open: {}", why.description()),
        Ok(file) => file,
    };

    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Err(why) => panic!("couldn't read: {}", why.description()),
        Ok(_) => print!("test.txt contains:

{}", s),
    }

    // `file` goes out of scope, and the "hello.txt" file gets closed
}

use std::process::Command;
fn main() {
    let output = Command::new("ls")
                         .arg("-l")
                         .arg("-a")
                         .output()
                         .unwrap_or_else(|e| {
                             panic!("failed to execute process: {}", e)
                         });

    if output.status.success() {
        let s = String::from_utf8_lossy(&output.stdout);
        println!("ls succeeded and stdout was:

{}", s);
    } else {
        let s = String::from_utf8_lossy(&output.stderr);
        println!("ls failed and stderr was:

{}", s);
    }
}

use std::process::Command;
fn main() {
    let output = Command::new("ls")
                         .arg("-l")
                         .arg("-a")
                         .output()
                         .unwrap_or_else(|e| {
                             panic!("failed to execute process: {}", e)
                         });

    if output.status.success() {
        let s = String::from_utf8_lossy(&output.stdout);
        println!("ls succeeded and stdout was:

{}", s);
    } else {
        let s = String::from_utf8_lossy(&output.stderr);
        println!("ls failed and stderr was:

{}", s);
    }
}

use std::process::Command;
fn main() {
    let output = Command::new("ls")
                         .arg("-l")
                         .arg("-a")
                         .output()
                         .unwrap_or_else(|e| {
                             panic!("failed to execute process: {}", e)
                         });

    if output.status.success() {
        let s = String::from_utf8_lossy(&output.stdout);
        println!("ls succeeded and stdout was:

{}", s);
    } else {
        let s = String::from_utf8_lossy(&output.stderr);
        println!("ls failed and stderr was:

{}", s);
    }
}

use std::env;
use std::process::Command;

Command,new
new()
arg()
output()
status()
stdout()
stderr()
spawn()
stdin()
stdout()

#[derive(Debug)]
struct Test{
    test:u32,
}

mod test{
    pub fn test(){
        let test = Test{
            test:1,
        };
        println!("{:?}",test);
    }
}

pub fn divide(dividend: i32, divisor: i32) -> i32 {
    if divisor == 0 {
        panic!("divide by zero");
    } else {
        dividend / divisor
    }
}

fn main() {
    let v = vec![1, 2, 3];

    v[99];
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn test() {
        let v = vec![1, 2, 3];

        v[99];
    }

    #[test]
    #[ignore]
      fn test() {
         let v = vec![1, 2, 3];
   
         v[99];
      }

}


use std::fs::File;
use std::io::prelude::*;
use std::slice::Iter;

fn main() {
    let mut f = File::open("test.txt").expect("file not found");
    let mut s = String::new();
    f.read_to_string(&mut s).expect("something went wrong reading the file");
    println!("test.txt contains:

{}", s);
}

let raw_ptr = &mut 5 as *mut i32;

let mut num = 5;

let pinter = some_vec.as_mut_ptr();

match File::open("test.txt") {
    Ok(file) => file,
    Err(error) => panic!("There was a problem opening the file: {:?}", error),
}

let f = File::open("test.txt").unwrap();

let f = File::open("test.txt").expect("Failed to open test.txt");

