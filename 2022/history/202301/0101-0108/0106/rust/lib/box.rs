//Allocatorとは、メモリの確保と解放を行うためのインターフェースを提供するトレイトです。
pub struct Box<T, A = Global>(_, _)
where
    A: Allocator,
    T: ?Sized;

//assume_init()とは、Box<T>の中身を初期化していない場合に、初期化されていると仮定して値を取り出すメソッドです。
#![feature(new_uninit)]

let mut five = Box::<u32>::new_uninit();

let five = unsafe {
    // Deferred initialization:
    five.as_mut_ptr().write(5);

    five.assume_init()
};

assert_eq!(*five, 5)

//new_zeroed()とは、Box<T>の中身をゼロで初期化するメソッドです。
#![feature(new_uninit)]

let zero = Box::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)

//allocator_apiとは、メモリの確保と解放を行うためのインターフェースを提供するトレイトです。
#![feature(allocator_api, new_uninit)]

let mut five = Box::<u32>::try_new_uninit()?;

let five = unsafe {
    // Deferred initialization:
    five.as_mut_ptr().write(5);

    five.assume_init()
};

assert_eq!(*five, 5);

//new_uninit()とは、Box<T>の中身を初期化していない場合に、初期化されていると仮定して値を取り出すメソッドです。
#![feature(allocator_api, new_uninit)]

let zero = Box::<u32>::try_new_zeroed()?;
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0);

//std::alloc::Systemとは、システムのデフォルトのアロケータを表す構造体です。
#![feature(allocator_api)]

use std::alloc::System;

let five = Box::new_in(5, System);

//allocとは、アロケータを表す構造体です。
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
#![feature(allocator_api, new_uninit)]

use std::alloc::System;

let mut five = Box::<u32, _>::try_new_uninit_in(System)?;

let five = unsafe {
    // Deferred initialization:
    five.as_mut_ptr().write(5);

    five.assume_init()
};

assert_eq!(*five, 5);

//box_into_innerとは、Box<T>からTを取り出すメソッドです。
#![feature(box_into_inner)]

let c = Box::new(5);

assert_eq!(Box::into_inner(c), 5);

//
#![feature(new_uninit)]

let values = Box::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])

//new_uninit_slice_inとは、Box<[T]>の中身を初期化していない場合に、初期化されていると仮定して値を取り出すメソッドです。
#![feature(allocator_api, new_uninit)]

use std::alloc::System;

let mut values = Box::<[u32], _>::new_uninit_slice_in(3, System);

let values = unsafe {
    // Deferred initialization:
    values[0].as_mut_ptr().write(1);
    values[1].as_mut_ptr().write(2);
    values[2].as_mut_ptr().write(3);

    values.assume_init()
};

assert_eq!(*values, [1, 2, 3])

//allocとは、アロケータを表す構造体です。
use std::alloc::{alloc, Layout};

unsafe {
    let ptr = alloc(Layout::new::<i32>()) as *mut i32;
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `ptr`, though for this
    // simple example `*ptr = 5` would have worked as well.
    ptr.write(5);
    let x = Box::from_raw(ptr);
}

//Systemとは、システムのデフォルトのアロケータを表す構造体です。
#![feature(allocator_api, slice_ptr_get)]

use std::alloc::{Allocator, Layout, System};

unsafe {
    let ptr = System.allocate(Layout::new::<i32>())?.as_mut_ptr() as *mut i32;
    // In general .write is required to avoid attempting to destruct
    // the (uninitialized) previous contents of `ptr`, though for this
    // simple example `*ptr = 5` would have worked as well.
    ptr.write(5);
    let x = Box::from_raw_in(ptr, System);
}