//Result<>とは、エラー処理のための型で、Ok()とErr()の2つの列挙子を持つ。
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}

//is_ok()とは、Result<>がOk()である場合に、trueを返します。
let x: Result<i32, &str> = Ok(-3);
assert_eq!(x.is_ok(), true);

let x: Result<i32, &str> = Err("Some error message");
assert_eq!(x.is_ok(), false);

//is_err()とは、Result<>がErr()である場合に、trueを返します。
let x: Result<i32, &str> = Ok(-3);
assert_eq!(x.is_err(), false);

let x: Result<i32, &str> = Err("Some error message");
assert_eq!(x.is_err(), true);

//&strとは、文字列のスライスを表す型です。
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.ok(), Some(2));

let x: Result<u32, &str> = Err("Nothing here");
assert_eq!(x.ok(), None);

//err()とは、Result<>がErr()である場合に、Err()の値を返します。
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.err(), None);

let x: Result<u32, &str> = Err("Nothing here");
assert_eq!(x.err(), Some("Nothing here"));

//as_ref()とは、Result<>の参照を返します。
let x: Result<u32, &str> = Ok(2);
assert_eq!(x.as_ref(), Ok(&2));

let x: Result<u32, &str> = Err("Error");
assert_eq!(x.as_ref(), Err(&"Error"));

//as_mut()とは、Result<>の可変参照を返します。
fn mutate(r: &mut Result<i32, i32>) {
    match r.as_mut() {
        Ok(v) => *v = 42,
        Err(e) => *e = 0,
    }
}

let mut x: Result<i32, i32> = Ok(2);
mutate(&mut x);
assert_eq!(x.unwrap(), 42);

let mut x: Result<i32, i32> = Err(13);
mutate(&mut x);
assert_eq!(x.unwrap_err(), 0);

//parse::<i32>()とは、文字列をi32型に変換します。
let line = "1\n2\n3\n4\n";

for num in line.lines() {
    match num.parse::<i32>().map(|i| i * 2) {
        Ok(n) => println!("{n}"),
        Err(..) => {}
    }
}

//map_or_else(|e|)とは、Result<>がOk()である場合に、Ok()の値を、Err()である場合に、Err()の値を返します。
let k = 21;

let x : Result<_, &str> = Ok("foo");
assert_eq!(x.map_or_else(|e| k * 2, |v| v.len()), 3);

let x : Result<&str, _> = Err("bar");
assert_eq!(x.map_or_else(|e| k * 2, |v| v.len()), 42);

//map_err()とは、Result<>がErr()である場合に、Err()の値を変換します。
fn stringify(x: u32) -> String { format!("error code: {x}") }

let x: Result<u32, u32> = Ok(2);
assert_eq!(x.map_err(stringify), Ok(2));

let x: Result<u32, u32> = Err(13);
assert_eq!(x.map_err(stringify), Err("error code: 13".to_string()));

//result_option_inspectとは、Result<>がErr()である場合に、Err()の値を出力します。
#![feature(result_option_inspect)]

use std::{fs, io};

fn read() -> io::Result<String> {
    fs::read_to_string("address.txt")
        .inspect_err(|e| eprintln!("failed to read file: {e}"))
}

let x: Result<String, u32> = Ok("hello".to_string());
let y: Result<&str, &u32> = Ok("hello");
assert_eq!(x.as_deref(), y);

let x: Result<String, u32> = Err(42);
let y: Result<&str, &u32> = Err(&42);
assert_eq!(x.as_deref(), y);

//as_deref_mut()とは、
let mut s = "HELLO".to_string();
let mut x: Result<String, u32> = Ok("hello".to_string());
let y: Result<&mut str, &mut u32> = Ok(&mut s);
assert_eq!(x.as_deref_mut().map(|x| { x.make_ascii_uppercase(); x }), y);

let mut i = 42;
let mut x: Result<String, u32> = Err(42);
let y: Result<&mut str, &mut u32> = Err(&mut i);
assert_eq!(x.as_deref_mut().map(|x| { x.make_ascii_uppercase(); x }), y);

//
let x: Result<u32, &str> = Ok(7);
assert_eq!(x.iter().next(), Some(&7));

let x: Result<u32, &str> = Err("nothing!");
assert_eq!(x.iter().next(), None);

//iter_mut()
let mut x: Result<u32, &str> = Ok(7);
match x.iter_mut().next() {
    Some(v) => *v = 40,
    None => {},
}
assert_eq!(x, Ok(40));

let mut x: Result<u32, &str> = Err("nothing!");
assert_eq!(x.iter_mut().next(), None);

//
let good_year_from_input = "1909";
let bad_year_from_input = "190blarg";
let good_year = good_year_from_input.parse().unwrap_or_default();
let bad_year = bad_year_from_input.parse().unwrap_or_default();

assert_eq!(1909, good_year);
assert_eq!(0, bad_year);

//
let x: Result<u32, &str> = Err("emergency failure");
assert_eq!(x.unwrap_err(), "emergency failure");

//
fn only_bad_news() -> Result<!, String> {
    Err("Oops, it failed".into())
}

let error: String = only_bad_news().into_err();
println!("{error}");

//
let x: Result<u32, &str> = Ok(2);
let y: Result<&str, &str> = Err("late error");
assert_eq!(x.and(y), Err("late error"));

let x: Result<u32, &str> = Err("early error");
let y: Result<&str, &str> = Ok("foo");
assert_eq!(x.and(y), Err("early error"));

let x: Result<u32, &str> = Err("not a 2");
let y: Result<&str, &str> = Err("late error");
assert_eq!(x.and(y), Err("not a 2"));

let x: Result<u32, &str> = Ok(2);
let y: Result<&str, &str> = Ok("different result type");
assert_eq!(x.and(y), Ok("different result type"));

//
fn sq_then_to_string(x: u32) -> Result<String, &'static str> {
    x.checked_mul(x).map(|sq| sq.to_string()).ok_or("overflowed")
}

assert_eq!(Ok(2).and_then(sq_then_to_string), Ok(4.to_string()));
assert_eq!(Ok(1_000_000).and_then(sq_then_to_string), Err("overflowed"));
assert_eq!(Err("not a number").and_then(sq_then_to_string), Err("not a number"));

