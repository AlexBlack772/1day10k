//AsRefとは、参照を返すメソッドを実装するトレイト
//BorrowMutとは、可変な参照を返すメソッドを実装するトレイト
let mut array: [i32; 3] = [0; 3];

array[1] = 1;
array[2] = 2;

assert_eq!([1, 2], &array[1..]);

// This loop prints: 0 1 2
for x in array {
    print!("{x} ");
}

//
fn move_away(_: String) { /* Do interesting things. */ }

let [john, roa] = ["John".to_string(), "Roa".to_string()];
move_away(john);
move_away(roa);

//

let array: [i32; 3] = [0; 3];

// This creates a slice iterator, producing references to each value.
for item in array.into_iter().enumerate() {
    let (i, x): (usize, &i32) = item;
    println!("array[{i}] = {x}");
}

// The `array_into_iter` lint suggests this change for future compatibility:
for item in array.iter().enumerate() {
    let (i, x): (usize, &i32) = item;
    println!("array[{i}] = {x}");
}

// You can explicitly iterate an array by value using `IntoIterator::into_iter`
for item in IntoIterator::into_iter(array).enumerate() {
    let (i, x): (usize, i32) = item;
    println!("array[{i}] = {x}");
}

//

let array: [i32; 3] = [0; 3];

// This iterates by reference:
for item in array.iter() {
    let x: &i32 = item;
    println!("{x}");
}

// This iterates by value:
for item in IntoIterator::into_iter(array) {
    let x: i32 = item;
    println!("{x}");
}

// This iterates by value:
for item in array {
    let x: i32 = item;
    println!("{x}");
}

// IntoIter can also start a chain.
// This iterates by value:
for item in IntoIterator::into_iter(array).enumerate() {
    let (i, x): (usize, i32) = item;
    println!("array[{i}] = {x}");
}

//
#![feature(maybe_uninit_uninit_array_transpose)]

let data = [MaybeUninit::<u8>::uninit(); 1000];
let data: MaybeUninit<[u8; 1000]> = data.transpose();

//
let x = [1, 2, 3];
let y = x.map(|v| v + 1);
assert_eq!(y, [2, 3, 4]);

let x = [1, 2, 3];
let mut temp = 0;
let y = x.map(|v| { temp += 1; v * temp });
assert_eq!(y, [1, 4, 9]);

let x = ["Ferris", "Bueller's", "Day", "Off"];
let y = x.map(|v| v.len());
assert_eq!(y, [6, 9, 3, 3]);

//array_try_mapとは、配列の要素を変換する際に、失敗した場合にNoneを返す
#![feature(array_try_map)]
let a = ["1", "2", "3"];
let b = a.try_map(|v| v.parse::<u32>()).unwrap().map(|v| v + 1);
assert_eq!(b, [2, 3, 4]);

let a = ["1", "2a", "3"];
let b = a.try_map(|v| v.parse::<u32>());
assert!(b.is_err());

use std::num::NonZeroU32;
let z = [1, 2, 0, 3, 4];
assert_eq!(z.try_map(NonZeroU32::new), None);
let a = [1, 2, 3];
let b = a.try_map(NonZeroU32::new);
let c = b.map(|x| x.map(NonZeroU32::get));
assert_eq!(c, Some(a));

//array_zipとは、配列の要素をペアにして返す
#![feature(array_zip)]
let x = [1, 2, 3];
let y = [4, 5, 6];
let z = x.zip(y);
assert_eq!(z, [(1, 4), (2, 5), (3, 6)]);

//array_methodsとは、配列の要素を参照にして返す
#![feature(array_methods)]

let floats = [3.1, 2.7, -1.0];
let float_refs: [&f64; 3] = floats.each_ref();
assert_eq!(float_refs, [&3.1, &2.7, &-1.0]);

#![feature(array_methods)]

let strings = ["Ferris".to_string(), "♥".to_string(), "Rust".to_string()];
let is_ascii = strings.each_ref().map(|s| s.is_ascii());
assert_eq!(is_ascii, [true, false, true]);

// We can still access the original array: it has not been moved.
assert_eq!(strings.len(), 3);

//split_arrayとは、配列を指定したインデックスで分割する
#![feature(split_array)]

let v = [1, 2, 3, 4, 5, 6];

{
   let (left, right) = v.split_array_ref::<0>();
   assert_eq!(left, &[]);
   assert_eq!(right, &[1, 2, 3, 4, 5, 6]);
}

{
    let (left, right) = v.split_array_ref::<2>();
    assert_eq!(left, &[1, 2]);
    assert_eq!(right, &[3, 4, 5, 6]);
}

{
    let (left, right) = v.split_array_ref::<6>();
    assert_eq!(left, &[1, 2, 3, 4, 5, 6]);
    assert_eq!(right, &[]);
}

//&mutとは、可変参照
#![feature(split_array)]

let mut v = [1, 0, 3, 0, 5, 6];
let (left, right) = v.split_array_mut::<2>();
assert_eq!(left, &mut [1, 0][..]);
assert_eq!(right, &mut [3, 0, 5, 6]);
left[1] = 2;
right[1] = 4;
assert_eq!(v, [1, 2, 3, 4, 5, 6]);

//rsplit_array_mutとは、配列を指定したインデックスで分割する
#![feature(split_array)]

let mut v = [1, 0, 3, 0, 5, 6];
let (left, right) = v.rsplit_array_mut::<4>();
assert_eq!(left, &mut [1, 0]);
assert_eq!(right, &mut [3, 0, 5, 6][..]);
left[1] = 2;
right[1] = 4;
assert_eq!(v, [1, 2, 3, 4, 5, 6]);

