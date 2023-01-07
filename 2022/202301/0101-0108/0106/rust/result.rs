//Resultとは、OkとErrの2つの値を持つ列挙型である。
let x: Result<i32, &str> = Ok(-3);
assert_eq!(x.is_ok(), true);

let x: Result<i32, &str> = Err("Some error message");
assert_eq!(x.is_ok(), false);

//is_some_andとは、Resultの値がOkであるかを判定する機能のこと
//featureとは、Rustの機能を有効化する機能のこと
#![feature(is_some_and)]
use std::io::{Error, ErrorKind};

let x: Result<u32, Error> = Err(Error::new(ErrorKind::NotFound, "!"));
assert_eq!(x.is_err_and(|x| x.kind() == ErrorKind::NotFound), true);

let x: Result<u32, Error> = Err(Error::new(ErrorKind::PermissionDenied, "!"));
assert_eq!(x.is_err_and(|x| x.kind() == ErrorKind::NotFound), false);

let x: Result<u32, Error> = Ok(123);
assert_eq!(x.is_err_and(|x| x.kind() == ErrorKind::NotFound), false);

//
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.ok(), Some(2));

let x: Result<u32, &str> = Err("Nothing here");
assert_eq!(x.ok(), None);

//
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.as_ref(), Ok(&2));

let x: Result<u32, &str> = Err("Error");
assert_eq!(x.as_ref(), Err(&"Error"));

let line = "1\n2\n3\n4\n";

for num in line.lines() {
    match num.parse::<i32>().map(|i| i * 2) {
        Ok(n) => println!("{n}"),
        Err(..) => {}
    }
}

//map_errとは、ResultのErrの値を変換するためのメソッドのこと
let x: Result<u32, &str> = Ok(2);

//&strとは、文字列の参照のこと
let x: Result<_, &str> = Ok("foo");
assert_eq!(x.map_or(42, |v| v.len()), 3);

let x: Result<&str, _> = Err("bar");
assert_eq!(x.map_or(42, |v| v.len()), 42);

//D: FnOnceとは、関数の所有権を奪うことができる関数のこと
//D: FnMutとは、関数の可変参照を取ることができる関数のこと

//map_errとは、ResultのErrの値を変換するためのメソッドのこと
//format!とは、文字列をフォーマットするためのマクロのこと
fn stringify(x: u32) -> String { format!("error code: {x}") }

let x: Result<u32, u32> = Ok(2);
assert_eq!(x.map_err(stringify), Ok(2));

let x: Result<u32, u32> = Err(13);
assert_eq!(x.map_err(stringify), Err("error code: 13".to_string()));


//as_derefとは、Resultの値を参照に変換するためのメソッドのこと
let x: Result<String, u32> = Ok("hello".to_string());
let y: Result<&str, &u32> = Ok("hello");
assert_eq!(x.as_deref(), y);

let x: Result<String, u32> = Err(42);
let y: Result<&str, &u32> = Err(&42);
assert_eq!(x.as_deref(), y);

//Result<String, u32>とは、OkとErrの2つの値を持つ列挙型である。
let mut s = "HELLO".to_string();
let mut x: Result<String, u32> = Ok("hello".to_string());
let y: Result<&mut str, &mut u32> = Ok(&mut s);
assert_eq!(x.as_deref_mut().map(|x| { x.make_ascii_uppercase(); x }), y);

let mut i = 42;
let mut x: Result<String, u32> = Err(42);
let y: Result<&mut str, &mut u32> = Err(&mut i);
assert_eq!(x.as_deref_mut().map(|x| { x.make_ascii_uppercase(); x }), y);

//iter_mut()とは、Resultの値をイテレータに変換するためのメソッドのこと
let mut x: Result<u32, &str> = Ok(7);
match x.iter_mut().next() {
    Some(v) => *v = 40,
    None => {},
}
assert_eq!(x, Ok(40));

let mut x: Result<u32, &str> = Err("nothing!");
assert_eq!(x.iter_mut().next(), None);

//Optionとは、SomeとNoneの2つの値を持つ列挙型である。
let x: Option<u32> = Some(2);
assert_eq!(x.is_some(), true);

let x: Option<u32> = None;
assert_eq!(x.is_some(), false);

//is_some_andとは、Optionの値がSomeであるかを判定する機能のこと
//featureとは、Rustの機能を有効化する機能のこと
let x: Option<u32> = Some(2);
assert_eq!(x.is_none(), false);

let x: Option<u32> = None;
assert_eq!(x.is_none(), true);

//as_mutとは、Optionの値を可変参照に変換するためのメソッドのこと
let mut x = Some(2);
match x.as_mut() {
    Some(v) => *v = 42,
    None => {},
}
assert_eq!(x, Some(42));

#![feature(result_option_inspect)]

let v = vec![1, 2, 3, 4, 5];

// prints "got: 4"
let x: Option<&usize> = v.get(3).inspect(|x| println!("got: {x}"));

// prints nothing
let x: Option<&usize> = v.get(5).inspect(|x| println!("got: {x}"));

//lenとは、文字列の長さを取得するためのメソッドのこと
let x = Some("foo");
assert_eq!(x.map_or(42, |v| v.len()), 3);

let x: Option<&str> = None;
assert_eq!(x.map_or(42, |v| v.len()), 42);

//ok_orとは、Optionの値をResultに変換するためのメソッドのこと
let x = Some("foo");
assert_eq!(x.ok_or(0), Ok("foo"));

let x: Option<&str> = None;
assert_eq!(x.ok_or(0), Err(0));

//Option<String> とは、SomeとNoneの2つの値を持つ列挙型である。
//to_ownedとは、文字列を所有するためのメソッドのこと
let mut x: Option<String> = Some("hey".to_owned());
assert_eq!(x.as_deref_mut().map(|x| {
    x.make_ascii_uppercase();
    x
}), Some("HEY".to_owned().as_mut_str()));

