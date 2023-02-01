//Allocatorとは、メモリの確保と解放を行うためのインターフェースを提供するトレイトです。
pub struct Box<T, A = Global>(_, _)
where
    A: Allocator,
    T: ?Sized;

//new_uninitとは、初期化されていないBox<T>を作る
#![feature(new_uninit)]

let mut five = Box::<u32>::new_uninit();

let five = unsafe {
    // Deferred initialization:
    five.as_mut_ptr().write(5);

    five.assume_init()
};

assert_eq!(*five, 5)

//Box::<u32>とは、u32型へのボックス
#![feature(allocator_api, new_uninit)]

let mut five = Box::<u32>::try_new_uninit()?;

let five = unsafe {
    // Deferred initialization:
    five.as_mut_ptr().write(5);

    five.assume_init()
};

assert_eq!(*five, 5);

//Boxとは、ヒープ上に確保された値へのポインタ
#![feature(allocator_api, new_uninit)]

let zero = Box::<u32>::try_new_zeroed()?;
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0);

//allocator_apiとは、メモリの確保と解放を行うためのインターフェースを提供するトレイト
#![feature(allocator_api)]

use std::alloc::System;

let five = Box::new_in(5, System);

//new_uninitとは、初期化されていないBox<T>を作る
#![feature(allocator_api, new_uninit)]

use std::alloc::System;

let mut five = Box::<u32, _>::new_uninit_in(System);

let five = unsafe {
    // Deferred initialization:
    five.as_mut_ptr().write(5);

    five.assume_init()
};

assert_eq!(*five, 5)

//
use std::alloc::{alloc, Layout};

unsafe {
    let ptr = alloc(Layout::new::<i32>()) as *mut i32;
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `ptr`, though for this
    // simple example `*ptr = 5` would have worked as well.
    ptr.write(5);
    let x = Box::from_raw(ptr);
}

let x = Box::new(String::from("Hello"));
let ptr = Box::into_raw(x);
let x = unsafe { Box::from_raw(ptr) };

use std::alloc::{dealloc, Layout};
use std::ptr;

let x = Box::new(String::from("Hello"));
let p = Box::into_raw(x);
unsafe {
    ptr::drop_in_place(p);
    dealloc(p as *mut u8, Layout::new::<String>());
}

//
#![feature(allocator_api)]

use std::alloc::{Allocator, Layout, System};
use std::ptr::{self, NonNull};

let x = Box::new_in(String::from("Hello"), System);
let (ptr, alloc) = Box::into_raw_with_allocator(x);
unsafe {
    ptr::drop_in_place(ptr);
    let non_null = NonNull::new_unchecked(ptr);
    alloc.deallocate(non_null.cast(), Layout::new::<String>());
}