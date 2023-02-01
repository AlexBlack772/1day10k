//
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

//
#![feature(allocator_api, new_uninit)]

let values = Box::<[u32]>::try_new_zeroed_slice(3)?;
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0]);

//allocator_apiとは、アロケータを実装するためのAPIのこと
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

//new_uninitとは、初期化されていない値を作成するためのAPIのこと
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

//sort_floatsとは、浮動小数点数をソートするためのAPIのこと
#![feature(sort_floats)]
let mut v = [2.6, -5e-8, f32::NAN, 8.29, f32::INFINITY, -1.0, 0.0, -f32::INFINITY, -0.0];

v.sort_floats();
let sorted = [-f32::INFINITY, -1.0, -5e-8, -0.0, 0.0, 2.6, 8.29, f32::INFINITY, f32::NAN];
assert_eq!(&v[..8], &sorted[..8]);
assert!(v[8].is_nan());

//&mutとは、可変な参照のこと
let x = &mut [0, 1, 2];

if let Some(first) = x.first_mut() {
    *first = 5;
}
assert_eq!(x, &[5, 1, 2]);

//assert_eq!とは、値が等しいかどうかを確認するためのAPIのこと
let x = &[0, 1, 2];

if let Some((last, elements)) = x.split_last() {
    assert_eq!(last, &2);
    assert_eq!(elements, &[0, 1]);
}

//*とは、参照を参照外しするための演算子のこと
let x = &mut [0, 1, 2];

if let Some((last, elements)) = x.split_last_mut() {
    *last = 3;
    elements[0] = 4;
    elements[1] = 5;
}
assert_eq!(x, &[4, 5, 3]);

//
let x = &mut [0, 1, 2];

if let Some(elem) = x.get_mut(1) {
    *elem = 42;
}
assert_eq!(x, &[0, 42, 2]);

//unsafeとは、安全ではないコードを書くためのキーワードのこと
let x = &mut [1, 2, 4];
let x_ptr = x.as_mut_ptr();

unsafe {
    for i in 0..x.len() {
        *x_ptr.add(i) += 2;
    }
}
assert_eq!(x, &[3, 4, 6]);

//as_ptr_rangeとは、ポインタの範囲を取得するためのAPIのこと
let a = [1, 2, 3];
let x = &a[1] as *const _;
let y = &5 as *const _;

assert!(a.as_ptr_range().contains(&x));
assert!(!a.as_ptr_range().contains(&y));

//swap_uncheckedとは、スライスの要素を入れ替えるためのAPIのこと
#![feature(slice_swap_unchecked)]

let mut v = ["a", "b", "c", "d"];
// SAFETY: we know that 1 and 3 are both indices of the slice
unsafe { v.swap_unchecked(1, 3) };
assert!(v == ["a", "d", "c", "b"]);

//AsRefとは、参照を取得するためのトレイトのこと
use std::path::Path;

fn foo<P: AsRef<Path>>(path: P) {
    println!("{:?}", path.as_ref());
}

//BorrowMut<T>とは、可変な参照を取得するためのトレイトのこと
use std::borrow::BorrowMut;

fn foo<T: BorrowMut<[i32]>>(x: T) {
    let mut y = x.borrow_mut();
    y[0] = 42;
}

//concatとは、文字列を連結するためのAPIのこと
let s = "foo".to_string();

//PartialEqとは、等価性を比較するためのトレイトのこと
impl<A, B, const N: usize> PartialEq<&[B]> for [A; N]
where
    A: PartialEq<B>,

//PartialOrdとは、順序を比較するためのトレイトのこと
impl<A, B, const N: usize> PartialOrd<&[B]> for [A; N]
where
    A: PartialOrd<B>,
{
      fn partial_cmp(&self, other: &&[B]) -> Option<Ordering> {
         PartialOrd::partial_cmp(&&self[..], other)
      }
   }

//PartialOrdとは、順序を比較するためのトレイトのこと
impl<A, B, const N: usize> PartialOrd<[B; N]> for [A; N]
where
    A: PartialOrd<B>,
{
    fn partial_cmp(&self, other: &[B; N]) -> Option<Ordering> {
        PartialOrd::partial_cmp(&&self[..], &&other[..])
    }
}

//usizeとは、符号なし整数のこと
fn add_one(x: usize) -> usize {
    x + 1
}

let ptr: fn(usize) -> usize = add_one;
assert_eq!(ptr(5), 6);

let clos: fn(usize) -> usize = |x| x + 5;
assert_eq!(clos(5), 10);

//
use std::mem;

fn bar(x: i32) {}

let not_bar_ptr = bar; // `not_bar_ptr` is zero-sized, uniquely identifying `bar`
assert_eq!(mem::size_of_val(&not_bar_ptr), 0);

let bar_ptr: fn(i32) = not_bar_ptr; // force coercion to function pointer
assert_eq!(mem::size_of_val(&bar_ptr), mem::size_of::<usize>());

let footgun = &bar; // this is a shared reference to the zero-sized type identifying `bar`

//||とは、クロージャのこと
let fnptr: fn(i32) -> i32 = |x| x+2;
let fnptr_addr = fnptr as usize;

//Hashとは、ハッシュ値を計算するためのトレイトのこと
impl<A, B, const N: usize> Hash for [A; N]
where
    A: Hash,
{
    fn hash<H: Hasher>(&self, state: &mut H) {
        Hash::hash(&&self[..], state)
    }
}

//Cloneとは、値を複製するためのトレイトのこと
impl<A, const N: usize> Clone for [A; N]
where
    A: Clone,
{
    fn clone(&self) -> Self {
        let mut new: MaybeUninit<Self> = MaybeUninit::uninit();
        let mut new_ptr = new.as_mut_ptr() as *mut A;

        for elem in self.iter() {
            // SAFETY: `new_ptr` is a valid pointer to `N` initialized
            // elements of type `A`, and `elem` is a valid reference to
            // an initialized element of type `A`.
            unsafe {
                new_ptr.write(elem.clone());
                new_ptr = new_ptr.add(1);
            }
        }

        // SAFETY: `new` has been initialized above.
        unsafe { new.assume_init() }
    }
}

//Sendとは、スレッド間で安全に送信できることを示すトレイトのこと
unsafe impl<T: Send, const N: usize> Send for [T; N] {}

//Syncとは、複数のスレッドから安全に参照できることを示すトレイトのこと
unsafe impl<T: Sync, const N: usize> Sync for [T; N] {}

//Debugとは、デバッグ用の出力を行うためのトレイトのこと
impl<A, const N: usize> Debug for [A; N]
where
    A: Debug,
{
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        Debug::fmt(&&self[..], f)
    }
}

//
let my_num: i32 = 10;
let my_num_ptr: *const i32 = &my_num;
let mut my_speed: i32 = 88;
let my_speed_ptr: *mut i32 = &mut my_speed;

//Boxとは、ヒープ上に値を確保するための型のこと
let x = Box::new(5);
let y = x;
assert_eq!(*y, 5);

//Rcとは、参照カウントを用いた所有権の共有を行うための型のこと
use std::rc::Rc;

let my_speed: Box<i32> = Box::new(88);
let my_speed: *mut i32 = Box::into_raw(my_speed);

// By taking ownership of the original `Box<T>` though
// we are obligated to put it together later to be destroyed.
unsafe {
    drop(Box::from_raw(my_speed));
}

//ptr::addr_of!とは、参照を取得するマクロのこと
#[derive(Debug, Default, Copy, Clone)]
#[repr(C, packed)]
struct S {
    aligned: u8,
    unaligned: u32,
}
let s = S::default();
let p = std::ptr::addr_of!(s.unaligned); // not allowed with coercion

//ptr::addr_of_mut!とは、可変参照を取得するマクロのこと
#[derive(Debug, Default, Copy, Clone)]
#[repr(C, packed)]
struct S {
    aligned: u8,
    unaligned: u32,
}

//set_ptr_valueとは、ポインタの値を設定するための機能のこと
#![feature(set_ptr_value)]
let arr: [i32; 3] = [1, 2, 3];
let mut ptr = arr.as_ptr() as *const dyn Debug;
let thin = ptr as *const u8;
unsafe {
    ptr = thin.add(8).with_metadata_of(ptr);
    println!("{:?}", &*ptr); // will print "3"
}

//ptr_to_from_bitsとは、ポインタをビット列に変換する機能のこと
//*constとは、不変なポインタのこと
#![feature(ptr_to_from_bits)]
let array = [13, 42];
let p0: *const i32 = &array[0];
assert_eq!(<*const _>::from_bits(p0.to_bits()), p0);
let p1: *const i32 = &array[1];
assert_eq!(p1.to_bits() - p0.to_bits(), 4);

//
let ptr: *const u8 = &10u8 as *const u8;

unsafe {
    if let Some(val_back) = ptr.as_ref() {
        println!("We got back the value: {val_back}!");
    }
}

//
let ptr: *const u8 = &10u8 as *const u8;

unsafe {
    let val_back = &*ptr;
    println!("We got back the value: {val_back}!");
}

//assume_initとは、初期化されていることを保証する機能のこと
#![feature(ptr_as_uninit)]

let ptr: *const u8 = &10u8 as *const u8;

unsafe {
    if let Some(val_back) = ptr.as_uninit_ref() {
        println!("We got back the value: {}!", val_back.assume_init());
    }
}

//
let s: &str = "123";
let ptr: *const u8 = s.as_ptr();

unsafe {
    println!("{}", *ptr.offset(1) as char);
    println!("{}", *ptr.offset(2) as char);
}

//whileとは、条件が満たされる限り繰り返し処理を行う構文のこと
//wrapping_offsetとは、ポインタのオフセットを計算する機能のこと
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

//ptr_sub_ptrとは、ポインタの差を計算する機能のこと
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

//as_ptrとは、スライスをポインタに変換する機能のこと
//*ptrとは、ポインタを参照に変換する機能のこと
let s: &str = "123";
let ptr: *const u8 = s.as_ptr();

unsafe {
    println!("{}", *ptr.add(1) as char);
    println!("{}", *ptr.add(2) as char);
}

//wrapping_addとは、ポインタの加算を行う機能のこと
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

//
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

//
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
