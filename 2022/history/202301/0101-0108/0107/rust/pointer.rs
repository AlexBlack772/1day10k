//
let my_num: i32 = 10;
let my_num_ptr: *const i32 = &my_num;
let mut my_speed: i32 = 88;
let my_speed_ptr: *mut i32 = &mut my_speed;

//into_raw()とは、Box<T>から*mut Tへの変換を行う。
let my_speed: Box<i32> = Box::new(88);
let my_speed: *mut i32 = Box::into_raw(my_speed);

// By taking ownership of the original `Box<T>` though
// we are obligated to put it together later to be destroyed.
unsafe {
    drop(Box::from_raw(my_speed));
}

//repcとは、*mut TからBox<T>への変換を行う。
#[derive(Debug, Default, Copy, Clone)]
#[repr(C, packed)]
struct S {
    aligned: u8,
    unaligned: u32,
}
let s = S::default();
let p = std::ptr::addr_of!(s.unaligned); // not allowed with coercion

//is_nullとは、*const Tや*mut Tがnullを指しているかどうかを判定する。
extern crate libc;

use std::mem;

unsafe {
    let my_num: *mut i32 = libc::malloc(mem::size_of::<i32>()) as *mut i32;
    if my_num.is_null() {
        panic!("failed to allocate memory");
    }
    libc::free(my_num as *mut libc::c_void);
}

//&10u8とは、u8型の値10を参照する。
let ptr: *const u8 = &10u8 as *const u8;

unsafe {
    let val_back = &*ptr;
    println!("We got back the value: {val_back}!");
}

#![feature(ptr_as_uninit)]

let ptr: *const u8 = &10u8 as *const u8;

unsafe {
    if let Some(val_back) = ptr.as_uninit_ref() {
        println!("We got back the value: {}!", val_back.assume_init());
    }
}

//*ptr.offsetとは、*const Tや*mut Tから*const Tや*mut Tへの変換を行う。
let s: &str = "123";
let ptr: *const u8 = s.as_ptr();

unsafe {
    println!("{}", *ptr.offset(1) as char);
    println!("{}", *ptr.offset(2) as char);
}

// Iterate using a raw pointer in increments of two elements
let data = [1u8, 2, 3, 4, 5];
let mut ptr: *const u8 = data.as_ptr();
let step = 2;
let end_rounded_up = ptr.wrapping_offset(6);

// This loop prints "1, 3, 5, "
while ptr != end_rounded_up {
    unsafe {
        print!("{}, ", *ptr);
    }
    ptr = ptr.wrapping_offset(step);
}

//
let a = [0; 5];
let ptr1: *const i32 = &a[1];
let ptr2: *const i32 = &a[3];
unsafe {
    assert_eq!(ptr2.offset_from(ptr1), 2);
    assert_eq!(ptr1.offset_from(ptr2), -2);
    assert_eq!(ptr1.offset(2), ptr2);
    assert_eq!(ptr2.offset(-2), ptr1);
}

#![feature(ptr_sub_ptr)]

let a = [0; 5];
let ptr1: *const i32 = &a[1];
let ptr2: *const i32 = &a[3];
unsafe {
    assert_eq!(ptr2.sub_ptr(ptr1), 2);
    assert_eq!(ptr1.add(2), ptr2);
    assert_eq!(ptr2.sub(2), ptr1);
    assert_eq!(ptr2.sub_ptr(ptr2), 0);
}

//
let s: &str = "123";
let ptr: *const u8 = s.as_ptr();

unsafe {
    println!("{}", *ptr.add(1) as char);
    println!("{}", *ptr.add(2) as char);
}

//
let s: &str = "123";

unsafe {
    let end: *const u8 = s.as_ptr().add(3);
    println!("{}", *end.sub(1) as char);
    println!("{}", *end.sub(2) as char);
}

// Iterate using a raw pointer in increments of two elements
let data = [1u8, 2, 3, 4, 5];
let mut ptr: *const u8 = data.as_ptr();
let step = 2;
let end_rounded_up = ptr.wrapping_add(6);

// This loop prints "1, 3, 5, "
while ptr != end_rounded_up {
    unsafe {
        print!("{}, ", *ptr);
    }
    ptr = ptr.wrapping_add(step);
}

// Iterate using a raw pointer in increments of two elements (backwards)
let data = [1u8, 2, 3, 4, 5];
let mut ptr: *const u8 = data.as_ptr();
let start_rounded_down = ptr.wrapping_sub(2);
ptr = ptr.wrapping_add(4);
let step = 2;
// This loop prints "5, 3, 1, "
while ptr != start_rounded_down {
    unsafe {
        print!("{}, ", *ptr);
    }
    ptr = ptr.wrapping_sub(step);
}

//std::mem::align_ofは、型Tのアライメントを返す。
use std::mem::align_of;

let x = [5_u8, 6, 7, 8, 9];
let ptr = x.as_ptr();
let offset = ptr.align_offset(align_of::<u16>());

if offset < x.len() - 1 {
    let u16_ptr = ptr.add(offset).cast::<u16>();
    assert!(*u16_ptr == u16::from_ne_bytes([5, 6]) || *u16_ptr == u16::from_ne_bytes([6, 7]));
} else {
    // while the pointer can be aligned via `offset`, it would point
    // outside the allocation
}

#![feature(slice_ptr_len)]

use std::ptr;

let slice: *const [i8] = ptr::slice_from_raw_parts(ptr::null(), 3);
assert_eq!(slice.len(), 3);

//
let ptr: *mut u8 = &mut 10u8 as *mut u8;

unsafe {
    if let Some(val_back) = ptr.as_ref() {
        println!("We got back the value: {val_back}!");
    }
}

//
let mut s = [1, 2, 3];
let ptr: *mut u32 = s.as_mut_ptr();

unsafe {
    println!("{}", *ptr.offset(1));
    println!("{}", *ptr.offset(2));
}