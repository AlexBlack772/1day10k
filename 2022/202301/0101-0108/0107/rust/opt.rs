//Option<T>とは、値が存在するかしないかを表す列挙型です。
pub enum Option<T> {
    None,
    Some(T),
}

//
let x: Option<u32> = Some(2);
assert_eq!(x.is_some(), true);

let x: Option<u32> = None;
assert_eq!(x.is_some(), false);

//is_some_andとは、Option<T>がSomeである場合に、クロージャを実行します。
#![feature(is_some_and)]

let x: Option<u32> = Some(2);
assert_eq!(x.is_some_and(|x| x > 1), true);

let x: Option<u32> = Some(0);
assert_eq!(x.is_some_and(|x| x > 1), false);

let x: Option<u32> = None;
assert_eq!(x.is_some_and(|x| x > 1), false);

//Option<u32>とは、値が存在するかしないかを表す列挙型です。
let x: Option<u32> = Some(2);
assert_eq!(x.is_none(), false);

let x: Option<u32> = None;
assert_eq!(x.is_none(), true);

let mut x = Some(2);
match x.as_mut() {
    Some(v) => *v = 42,
    None => {},
}
assert_eq!(x, Some(42));

//
let maybe_some_string = Some(String::from("Hello, World!"));
// `Option::map` takes self *by value*, consuming `maybe_some_string`
let maybe_some_len = maybe_some_string.map(|s| s.len());

assert_eq!(maybe_some_len, Some(13));

//result_option_inspectとは、Option<T>がSomeである場合に、クロージャを実行します。
#![feature(result_option_inspect)]

let v = vec![1, 2, 3, 4, 5];

// prints "got: 4"
let x: Option<&usize> = v.get(3).inspect(|x| println!("got: {x}"));

// prints nothing
let x: Option<&usize> = v.get(5).inspect(|x| println!("got: {x}"));

//map_or_else(||)とは、Option<T>がSomeである場合に、クロージャを実行します。
let k = 21;

let x = Some("foo");
assert_eq!(x.map_or_else(|| 2 * k, |v| v.len()), 3);

let x: Option<&str> = None;
assert_eq!(x.map_or_else(|| 2 * k, |v| v.len()), 42);

//ok_or()とは、Option<T>がSomeである場合に、クロージャを実行します。
let x = Some("foo");
assert_eq!(x.ok_or(0), Ok("foo"));

let x: Option<&str> = None;
assert_eq!(x.ok_or(0), Err(0));

//make_ascii_uppercase()
let x: Option<String> = Some("hey".to_owned());
assert_eq!(x.as_deref(), Some("hey"));

let x: Option<String> = None;
assert_eq!(x.as_deref(), None);

//as_deref_mut()とは、
let mut x: Option<String> = Some("hey".to_owned());
assert_eq!(x.as_deref_mut().map(|x| {
    x.make_ascii_uppercase();
    x
}), Some("HEY".to_owned().as_mut_str()));

//
let mut x = Some(4);
match x.iter_mut().next() {
    Some(v) => *v = 42,
    None => {},
}
assert_eq!(x, Some(42));

let mut x: Option<u32> = None;
assert_eq!(x.iter_mut().next(), None);

//and()とは、Option<T>がSomeである場合に、クロージャを実行します。
let x = Some(2);
let y: Option<&str> = None;
assert_eq!(x.and(y), None);

let x: Option<u32> = None;
let y = Some("foo");
assert_eq!(x.and(y), None);

let x = Some(2);
let y = Some("foo");
assert_eq!(x.and(y), Some("foo"));

let x: Option<u32> = None;
let y: Option<&str> = None;
assert_eq!(x.and(y), None);

//
fn sq_then_to_string(x: u32) -> Option<String> {
    x.checked_mul(x).map(|sq| sq.to_string())
}

assert_eq!(Some(2).and_then(sq_then_to_string), Some(4.to_string()));
assert_eq!(Some(1_000_000).and_then(sq_then_to_string), None); // overflowed!
assert_eq!(None.and_then(sq_then_to_string), None);

let arr_2d = [["A0", "A1"], ["B0", "B1"]];

let item_0_1 = arr_2d.get(0).and_then(|row| row.get(1));
assert_eq!(item_0_1, Some(&"A1"));

let item_2_0 = arr_2d.get(2).and_then(|row| row.get(0));
assert_eq!(item_2_0, None);

//
fn is_even(n: &i32) -> bool {
    n % 2 == 0
}

assert_eq!(None.filter(is_even), None);
assert_eq!(Some(3).filter(is_even), None);
assert_eq!(Some(4).filter(is_even), Some(4));

//
