//vec!とは、Vec<T>型の値を作るマクロ
// slicing a Vec
let vec = vec![1, 2, 3];
let int_slice = &vec[..];
// coercing an array to a slice
let str_slice: &[&str] = &["one", "two", "three"];

//
let mut x = [1, 2, 3];
let x = &mut x[..]; // Take a full slice of `x`.
x[1] = 7;
assert_eq!(x, &[1, 7, 3]);

//&[i32]とは、i32型のスライスへの参照
let numbers: &[i32] = &[0, 1, 2];
for n in numbers {
    println!("{n} is a number!");
}

//Box::<[u32]>::とは、u32型のスライスへのボックス
#![feature(new_uninit)]

let mut values = Box::<[u32]>::new_uninit_slice(3);

let values = unsafe {
    // Deferred initialization:
    values[0].as_mut_ptr().write(1);
    values[1].as_mut_ptr().write(2);
    values[2].as_mut_ptr().write(3);

    values.assume_init()
};

assert_eq!(*values, [1, 2, 3])

//unsafeとは、unsafeなコードを書くためのキーワード
#![feature(new_uninit)]

let values = Box::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])

//new_uninitとは、初期化されていない値を作る
#![feature(allocator_api, new_uninit)]

let mut values = Box::<[u32]>::try_new_uninit_slice(3)?;
let values = unsafe {
    // Deferred initialization:
    values[0].as_mut_ptr().write(1);
    values[1].as_mut_ptr().write(2);
    values[2].as_mut_ptr().write(3);
    values.assume_init()
};

assert_eq!(*values, [1, 2, 3]);

//assume_init()とは、初期化されていない値を初期化する
#![feature(allocator_api, new_uninit)]

use std::alloc::System;

let values = Box::<[u32], _>::new_zeroed_slice_in(3, System);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])

//#!とは、モジュールの先頭に書くことで、モジュールの先頭に書かれた属性をモジュール全体に適用する
#![feature(new_uninit)]

let mut values = Box::<[u32]>::new_uninit_slice(3);

let values = unsafe {
    // Deferred initialization:
    values[0].as_mut_ptr().write(1);
    values[1].as_mut_ptr().write(2);
    values[2].as_mut_ptr().write(3);

    values.assume_init()
};

assert_eq!(*values, [1, 2, 3])

//INFINITYとは、無限大を表す
#![feature(sort_floats)]
let mut v = [2.6, -5e-8, f32::NAN, 8.29, f32::INFINITY, -1.0, 0.0, -f32::INFINITY, -0.0];

v.sort_floats();
let sorted = [-f32::INFINITY, -1.0, -5e-8, -0.0, 0.0, 2.6, 8.29, f32::INFINITY, f32::NAN];
assert_eq!(&v[..8], &sorted[..8]);
assert!(v[8].is_nan());

//
let x = &mut [0, 1, 2];

if let Some(first) = x.first_mut() {
    *first = 5;
}
assert_eq!(x, &[5, 1, 2]);

//
let x = &[0, 1, 2];

if let Some((last, elements)) = x.split_last() {
    assert_eq!(last, &2);
    assert_eq!(elements, &[0, 1]);
}

//
let x = &mut [0, 1, 2];

if let Some((last, elements)) = x.split_last_mut() {
    *last = 3;
    elements[0] = 4;
    elements[1] = 5;
}
assert_eq!(x, &[4, 5, 3]);

//Some()とは、Some(T)型の値を作る
let x = &mut [0, 1, 2];

if let Some(last) = x.last_mut() {
    *last = 10;
}
assert_eq!(x, &[0, 1, 10]);


//SliceIndexとは、スライスのインデックスを表すトレイト
pub fn get<I>(&self, index: I) -> Option<&<I as SliceIndex<[T]>>::Output>
where
    I: SliceIndex<[T]>,

//
pub const fn as_ptr(&self) -> *const T {
    self.ptr.as_ptr()
}