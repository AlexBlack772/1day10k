fn main(){
      let mut s = String::from("hello");
      change(&mut s);
      println!("{}", s);

      let mut i = Iter::new();
      i.next();
      println!("{}", i.value);

      let mut v = Vec::new();
      v.push(1);
      v.push(2);
      pritln!("{}", v[0]);

      let  mut hash = HashMap::new();
      hash.insert("a", 1);
      hash.update("a", 2);
      hash.delete("a");
      println!("{}", hash.get("a"));

      fn change(s: &mut String) -> Result<(), String> {
            s.push_str(" world");
            Ok(())
      }

      fn result() -> Result<(), String> {
            let mut s = String::from("hello");
            change(&mut s)?;
            println!("{}", s);
            Ok(())
      }

      fn option() -> Option<()> {
            let mut v = Vec::new();
            v.push(1);
            v.pop();
            println!("{}", v[0]);
            Some(())
      }

      let box1 = Box::new(1);
      let box2 = box1;
      println!("{}", box2);

      let a = &v;

      let ptr = &v as *const Vec<i32>;

      fn test(a:char, b:char) -> bool {
            a == b
      }

      fn test2(a:array) -> bool {
            a[0] == a[1]
      }

      async fn test3(a: &str) -> Result<(), String> {
            Ok(())
      }

   }
      match test3("hello").await {
            Ok(_) => println!("ok"),
            Err(_) => println!("err"),
      }

      enum Option<T> {
            Some(T),
            None,
      }

      enum Result<T, E> {
            Ok(T),
            Err(E),
      }

      for i in 0..10 {
            println!("{}", i);
      }

      for ii in 0..10 {
            println!("{}", ii);
      }

      let mut i = 0;
      while i < 10 {
            println!("{}", i);
            i += 1;
      }

      struct Iter {
            value: i32,
      }

      struct Vec<T> {
            data: T,
      }

      struct HashMap<K, V> {
            data: K,
            value: V,
      }

      struct Box<T> {
            data: T,
      }

      struct Option<T> {
            data: T,
      }

      struct Result<T, E> {
            data: T,
            err: E,
      }

      impl Iter2 for Iter {
            fn new() -> Self {
                  Iter {
                        value: 0,
                  }
            }

            fn next(&mut self) {
                  self.value += 1;
            }
      }
      
      impl Vec2<T> for Vec<T> {
            fn new() -> Self {
                  Vec {
                        data: T,
                  }
            }

            fn push(&mut self, data: T) {
                  self.data = data;
            }

            fn pop(&mut self) {
                  self.data = T;
            }
      }

      impl HashMap2<K,V> for HashMap<K,V> {
            fn new()->Self {
                  HashMap {
                        data: K,
                        value: V,
                  }
            }

            fn insert(&mut self, data: K, value: V) {
                  self.data = data;
                  self.value = value;
            }

            fn update(&mut self, data: K, value: V) {
                  self.data = data;
                  self.value = value;
            }

      }

      impl Box2<T> for Box<T> {
            fn new() -> Self {
                  Box {
                        data: T,
                  }
            }

            fn push(&mut self, data: T) {
                  self.data = data;
            }

      }

      impl Option2<T> for Option<T> {
            fn  new() -> Self {
                  Option {
                        data: T,
                  }
            }

            fn push(&mut self, data: T) {
                  self.data = data;
            }

            fn pop(&mut self) {
                  self.data ;
            }

      }

      impl Result2<T, E> for Result<T, E> {
            fn new() -> Self {
                  Result {
                        data: T,
                        err: E,
                  }
            }

            fn push(&mut self, data: T, err: E) {
                  self.data = data;
                  self.err = err;
            }
         }  


         fn alloc() -> *mut i32 {
               let mut i = 0;
               let mut ptr = 0;
               while i < 10 {
                     ptr = i;
                     i += 1;
               }
               ptr
         }

         let test2 = alloc().as_mut().unwrap();
         *test2 = 1;

         let asmut = test2.as_mut().unwrap();
         
         let asref = test2.as_ref().unwrap();
        
         fn test3(a: &str) -> Result<(), String> {
               Ok(())
               let mut a = |&a : &str| -> Result<(), String> {
                     Ok(())
               }
         }

         let test4 = test3("hello").await;

         struct test1 {
               a: i32,
               b: i32,
         }

         struct Bool {
               a: bool,
               b: bool,
         }

         impl Bool2 for Bool {
               fn new() -> Self {
                  let mut a = false;
               }

               if a == true {
                     a = false;
               } else {
                     a = true;
               }
         } 

         let mut a = Box2::push(1);

         struct alloc {
               a: i32,
               b: i32,
         }

         impl alloc2 for alloc {
               fn new() -> Self {
                     let mut a = 0;
                     let mut b = 0;
                     while a < 10 {
                           b = a;
                           a += 1;
                     }
                     alloc {
                           a: a,
                           b: b,
                     }
               }
         }


struct Box {
      data: i32,
}

impl Box2 for Box {
      fn new() -> Self {
            Box {
                  data: 0,
            }
      }

      fn push(&mut self, data: i32) {
            self.data = data;
      }

      fn pop(&mut self) {
            self.data = 0;
      }

      fn insert(&mut self, data: i32) {
            self.data = data;
      }

      fn update(&mut self, data: i32) {
            self.data = data;
      }

      panic!("error");
      println!("hello");

      todo!();

}

struct Vec {
      data: i32,
}

impl<T> Vec2 for Vec<T> {
   fn new() -> Self {
         Vec {
               data: 0,
         }
   }
}

#[cfg(test)]
mod tests {
      use super::*;

      #[test]
      fn it_works() {
            assert_eq!(2 + 2, 4);
      }
      #[test]
      fn it_works2() {
            assert_eq!(2 + 2, 4);
      }
}

#![feature(alloc)]
#![feature(alloc_error_handler)]
#![feature(allocator_api)]
#![feature(alloc_layout_extra)]

#[macro_use]

use std::collections::HashMap;
use std::collections::VecDeque;
use std::collections::LinkedList;
use std::collections::BinaryHeap;
use std::collections::BTreeMap;
use io::Read;
use io::Write;
use alloc::Allocator;
use cmp::Eq:
use cmp::PartialEq;
use fmt::Debug;
use fmt::Display;
use io::Write;
use marker::Copy;

use ops::Deref;
use ops::Drop;

use ops::FnMut;
use ops::FnOnce;
use ops::Fn;

use os::raw::c_void;
use ptr::NonNull;

use simd::Simd;

use str::FromStr;

use crate::lib::Iter;

assert_eq!(2 + 2, 4);
dbg!(2 + 2);
assert_ne!(2 + 2, 4);
debug_std!(2 + 2);
format!("hello");
env!("hello");
//env!とは、環境変数を取得するマクロ
include!("hello");
//include!とは、ファイルをインクルードするマクロ

format_args!("hello");
//format_args!とは、フォーマット文字列を作成するマクロ

format_args_nl!("hello");
//format_args_nl!とは、フォーマット文字列を作成するマクロ

file!();
//file!とは、ファイル名を取得するマクロ

eprint!("hello");
//eprint!とは、標準エラー出力に文字列を出力するマクロ

include_str!("hello");
//include_str!とは、ファイルをインクルードするマクロ

concat!("hello");
//concat!とは、文字列を連結するマクロ

concat_idents!("hello");
//concat_idents!とは、識別子を連結するマクロ

line!();
//line!とは、行番号を取得するマクロ

module_path!();
//module_path!とは、モジュールのパスを取得するマクロ

matches!("hello");
//matches!とは、パターンマッチを行うマクロ

print!("hello");
//print!とは、標準出力に文字列を出力するマクロ

stringify!("hello");
//stringify!とは、文字列を取得するマクロ

column!();
//column!とは、列番号を取得するマクロ

compile_error!("hello");
//compile_error!とは、コンパイルエラーを発生させるマクロ

try_format!("hello");
//try_format!とは、フォーマット文字列を作成するマクロ

vec!["hello"];
//vec!とは、ベクタを作成するマクロ

thread_local! {
      static FOO: Cell<u32> = Cell::new(1);
}

writeln!("hello");
//writeln!とは、標準出力に文字列を出力するマクロ

unreachable!("hello");
//unreachable!とは、コンパイルエラーを発生させるマクロ

unimplemented!("hello");
//unimplemented!とは、コンパイルエラーを発生させるマクロ

stringify!($($arg)*);
//stringify!とは、文字列を取得するマクロ

debug_assert!("hello");
//debug_assert!とは、デバッグ時にコンパイルエラーを発生させるマクロ

compile_error!("hello");
//compile_error!とは、コンパイルエラーを発生させるマクロ

column!();
//column!とは、列番号を取得するマクロ

SelfTy

struct Foo {
      data: i32,
}

impl Foo {
      fn new() -> Self {
            Foo {
                  data: 0,
            }
      }
}

struct Bar {
      data: i32,
}

impl Bar {
      fn new() -> Self {
            Bar {
                  data: 0,
            }
      }
}

clone!($($n:ident),+ => move |$($p:pat),*| $body:expr);
//clone!とは、クロージャを作成するマクロ

assert!("hello");
//assert!とは、コンパイルエラーを発生させるマクロ



