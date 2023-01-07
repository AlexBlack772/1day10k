//Vec<T>とは、T型の要素を格納する可変長配列のことです。
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

//
let vec = vec![0; 5];
assert_eq!(vec, [0, 0, 0, 0, 0]);

// The following is equivalent, but potentially slower:
let mut vec = Vec::with_capacity(5);
vec.resize(5, 0);
assert_eq!(vec, [0, 0, 0, 0, 0]);

//
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

while let Some(top) = stack.pop() {
    // Prints 3, 2, 1
    println!("{top}");
}

//
let mut vec: Vec<i32> = Vec::new();

//
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

//
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

//
#![feature(allocator_api)]

use std::alloc::{AllocError, Allocator, Global, Layout};

fn main() {
    let layout = Layout::array::<u32>(16).expect("overflow cannot happen");

    let vec = unsafe {
        let mem = match Global.allocate(layout) {
            Ok(mem) => mem.cast::<u32>().as_ptr(),
            Err(AllocError) => return,
        };

        mem.write(1_000_000);

        Vec::from_raw_parts_in(mem, 1, 16, Global)
    };

    assert_eq!(vec, &[1_000_000]);
    assert_eq!(vec.capacity(), 16);
}

//
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

//std::alloc::Systemは、システムのデフォルトのアロケータを表します。
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

//
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

//
pub fn get_dictionary(&self) -> Option<Vec<u8>> {
    // Per the FFI method's docs, "32768 bytes is always enough".
    let mut dict = Vec::with_capacity(32_768);
    let mut dict_length = 0;
    // SAFETY: When `deflateGetDictionary` returns `Z_OK`, it holds that:
    // 1. `dict_length` elements were initialized.
    // 2. `dict_length` <= the capacity (32_768)
    // which makes `set_len` safe to call.
    unsafe {
        // Make the FFI call...
        let r = deflateGetDictionary(self.strm, dict.as_mut_ptr(), &mut dict_length);
        if r == Z_OK {
            // ...and update the length to what was initialized.
            dict.set_len(dict_length);
            Some(dict)
        } else {
            None
        }
    }
}

//
let mut vec = vec![1, 2, 3];
vec.resize_with(5, Default::default);
assert_eq!(vec, [1, 2, 3, 0, 0]);

let mut vec = vec![];
let mut p = 1;
vec.resize_with(4, || { p *= 2; p });
assert_eq!(vec, [2, 4, 8, 16]);

//
#![feature(vec_split_at_spare)]

let mut v = vec![1, 1, 2];

// Reserve additional space big enough for 10 elements.
v.reserve(10);

let (init, uninit) = v.split_at_spare_mut();
let sum = init.iter().copied().sum::<u32>();

// Fill in the next 4 elements.
uninit[0].write(sum);
uninit[1].write(sum * 2);
uninit[2].write(sum * 3);
uninit[3].write(sum * 4);

// Mark the 4 elements of the vector as being initialized.
unsafe {
    let len = v.len();
    v.set_len(len + 4);
}

assert_eq!(&v, &[1, 1, 2, 4, 8, 12, 16]);

//
