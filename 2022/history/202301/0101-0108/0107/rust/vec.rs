let mut vec = Vec::new();
vec.push(1);
vec.push(2);

assert_eq!(vec.len(), 2);
assert_eq!(vec[0], 1);

assert_eq!(vec.pop(), Some(2));
assert_eq!(vec.len(), 1);

vec[0] = 7;
assert_eq!(vec[0], 7);

vec.extend([1, 2, 3].iter().copied());

for x in &vec {
    println!("{x}");
}
assert_eq!(vec, [7, 1, 2, 3]);

//Vec::with_capacity()とは、Vecの容量をあらかじめ確保しておくことができる。
let vec = vec![0; 5];
assert_eq!(vec, [0, 0, 0, 0, 0]);

// The following is equivalent, but potentially slower:
let mut vec = Vec::with_capacity(5);
vec.resize(5, 0);
assert_eq!(vec, [0, 0, 0, 0, 0]);

//read_slice()とは、スライスを読み込む関数。
fn read_slice(slice: &[usize]) {
    // ...
}

let v = vec![0, 1];
read_slice(&v);

// ... and that's all!
// you can also do it like this:
let u: &[usize] = &v;
// or like this:
let u: &[_] = &v;

//vec.capacity()とは、Vecの容量を返す関数。
let mut vec = Vec::with_capacity(10);

// The vector contains no items, even though it has capacity for more
assert_eq!(vec.len(), 0);
assert!(vec.capacity() >= 10);

// These are all done without reallocating...
for i in 0..10 {
    vec.push(i);
}
assert_eq!(vec.len(), 10);
assert!(vec.capacity() >= 10);

// ...but this may make the vector reallocate
vec.push(11);
assert_eq!(vec.len(), 11);
assert!(vec.capacity() >= 11);

// A vector of a zero-sized type will always over-allocate, since no
// allocation is necessary
let vec_units = Vec::<()>::with_capacity(10);
assert_eq!(vec_units.capacity(), usize::MAX);

//mem::ManuallyDropとは、メモリを手動で解放することができる。
use std::ptr;
use std::mem;

let v = vec![1, 2, 3];

// Prevent running `v`'s destructor so we are in complete control
// of the allocation.
let mut v = mem::ManuallyDrop::new(v);

// Pull out the various important pieces of information about `v`
let p = v.as_mut_ptr();
let len = v.len();
let cap = v.capacity();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_raw_parts(p, len, cap);
    assert_eq!(rebuilt, [4, 5, 6]);
}

//allocator_apiとは、アロケータを作成することができる。
#![feature(allocator_api)]

use std::alloc::System;

let mut vec = Vec::with_capacity_in(10, System);

// The vector contains no items, even though it has capacity for more
assert_eq!(vec.len(), 0);
assert_eq!(vec.capacity(), 10);

// These are all done without reallocating...
for i in 0..10 {
    vec.push(i);
}
assert_eq!(vec.len(), 10);
assert_eq!(vec.capacity(), 10);

// ...but this may make the vector reallocate
vec.push(11);
assert_eq!(vec.len(), 11);
assert!(vec.capacity() >= 11);

// A vector of a zero-sized type will always over-allocate, since no
// allocation is necessary
let vec_units = Vec::<(), System>::with_capacity_in(10, System);
assert_eq!(vec_units.capacity(), usize::MAX);

//std::alloc::Systemとは、システムのデフォルトのアロケータを使用することができる。
#![feature(allocator_api)]

use std::alloc::System;

use std::ptr;
use std::mem;

let mut v = Vec::with_capacity_in(3, System);
v.push(1);
v.push(2);
v.push(3);

// Prevent running `v`'s destructor so we are in complete control
// of the allocation.
let mut v = mem::ManuallyDrop::new(v);

// Pull out the various important pieces of information about `v`
let p = v.as_mut_ptr();
let len = v.len();
let cap = v.capacity();
let alloc = v.allocator();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_raw_parts_in(p, len, cap, alloc.clone());
    assert_eq!(rebuilt, [4, 5, 6]);
}

//std::allocとは、アロケータを作成することができる。
use std::alloc::{alloc, Layout};

fn main() {
    let layout = Layout::array::<u32>(16).expect("overflow cannot happen");
    let vec = unsafe {
        let mem = alloc(layout).cast::<u32>();
        if mem.is_null() {
            return;
        }

        mem.write(1_000_000);

        Vec::from_raw_parts(mem, 1, 16)
    };

    assert_eq!(vec, &[1_000_000]);
    assert_eq!(vec.capacity(), 16);
}

//Vec::from_raw_parts()とは、Vecを作成することができる。
#![feature(vec_into_raw_parts)]
let v: Vec<i32> = vec![-1, 0, 1];

let (ptr, len, cap) = v.into_raw_parts();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr as *mut u32;

    Vec::from_raw_parts(ptr, len, cap)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);

//vec_into_raw_partsとは、Vecを作成することができる。
#![feature(allocator_api, vec_into_raw_parts)]

use std::alloc::System;

let mut v: Vec<i32, System> = Vec::new_in(System);
v.push(-1);
v.push(0);
v.push(1);

let (ptr, len, cap, alloc) = v.into_raw_parts_with_alloc();

let rebuilt = unsafe {
    // We can now make changes to the components, such as
    // transmuting the raw pointer to a compatible type.
    let ptr = ptr as *mut u32;

    Vec::from_raw_parts_in(ptr, len, cap, alloc)
};
assert_eq!(rebuilt, [4294967295, 0, 1]);

//std::collections::TryReserveErrorとは、メモリを確保することができない場合にエラーを返すことができる。
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
    let mut output = Vec::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}

//
use std::collections::TryReserveError;

fn process_data(data: &[u32]) -> Result<Vec<u32>, TryReserveError> {
    let mut output = Vec::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve_exact(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.extend(data.iter().map(|&val| {
        val * 2 + 5 // very complicated
    }));

    Ok(output)
}

//vec.truncate(2)とは、Vecの長さを2にすることができる。
let mut vec = vec![1, 2, 3, 4, 5];
vec.truncate(2);
assert_eq!(vec, [1, 2]);

//unwrap()とは、値がNoneの場合にpanicを起こすことができる。
use std::io::{self, Write};
let buffer = vec![1, 2, 3, 5, 8];
io::sink().write(buffer.as_slice()).unwrap();

//io::sink()とは、何もしないWriteを返すことができる。
use std::io::{self, Write};
let buffer = vec![1, 2, 3, 5, 8];
io::sink().write(buffer.as_slice()).unwrap();

let x = vec![1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
    for i in 0..x.len() {
        assert_eq!(*x_ptr.add(i), 1 << i);
    }
}

//set_len()とは、Vecの長さを設定することができる。
// Allocate vector big enough for 4 elements.
let size = 4;
let mut x: Vec<i32> = Vec::with_capacity(size);
let x_ptr = x.as_mut_ptr();

// Initialize elements via raw pointer writes, then set length.
unsafe {
    for i in 0..size {
        *x_ptr.add(i) = i as i32;
    }
    x.set_len(size);
}
assert_eq!(&*x, &[0, 1, 2, 3]);

//vec.retain(|_|)とは、Vecの要素を削除することができる。
let mut vec = vec![1, 2, 3, 4, 5];
let keep = [false, true, true, false, true];
let mut iter = keep.iter();
vec.retain(|_| *iter.next().unwrap());
assert_eq!(vec, [2, 3, 5]);

//
let mut vec = vec![1, 2, 3, 4];
vec.retain_mut(|x| if *x <= 3 {
    *x += 1;
    true
} else {
    false
});
assert_eq!(vec, [2, 3, 4]);