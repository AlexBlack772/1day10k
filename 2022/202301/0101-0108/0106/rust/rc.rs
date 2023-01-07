//Rc<T>とは、参照カウントを使って複数の所有者を持つことができる構造体です。
pub struct Rc<T>
where
    T: ?Sized,
{ /* private fields */ }

//Rc::new()とは、Rc<T>の新しいインスタンスを作成するメソッドです。
use std::rc::Rc;

let five = Rc::new(5);

//weak()とは、Rc<T>の弱参照を作成するメソッドです。
use std::rc::{Rc, Weak};

struct Gadget {
    me: Weak<Gadget>,
}

impl Gadget {
    /// Construct a reference counted Gadget.
    fn new() -> Rc<Self> {
        // `me` is a `Weak<Gadget>` pointing at the new allocation of the
        // `Rc` we're constructing.
        Rc::new_cyclic(|me| {
            // Create the actual struct here.
            Gadget { me: me.clone() }
        })
    }

    /// Return a reference counted pointer to Self.
    fn me(&self) -> Rc<Self> {
        self.me.upgrade().unwrap()
    }
}

//get_mut_uncheckedとは、Rc<T>の中身を取得するメソッドです。
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::rc::Rc;

let mut five = Rc::<u32>::new_uninit();

// Deferred initialization:
Rc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)

//new_zeroed()とは、Rc<T>の中身をゼロで初期化するメソッドです。
#![feature(new_uninit)]

use std::rc::Rc;

let zero = Rc::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)

//try_new()とは、Rc<T>の新しいインスタンスを作成するメソッドです。
#![feature(allocator_api)]
use std::rc::Rc;

let five = Rc::try_new(5);

//
#![feature(allocator_api, new_uninit)]
#![feature(get_mut_unchecked)]

use std::rc::Rc;

let mut five = Rc::<u32>::try_new_uninit()?;

// Deferred initialization:
Rc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5);

#![feature(allocator_api, new_uninit)]

use std::rc::Rc;

let zero = Rc::<u32>::try_new_zeroed()?;
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0);

//get_mut_uncheckedとは、
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::rc::Rc;

let mut values = Rc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Rc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])

//#![]とは、Rc<T>の中身をゼロで初期化するメソッドです。
#![feature(new_uninit)]

use std::rc::Rc;

let values = Rc::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])

//Rc::get_mut(&mut five).unwrap().write(）
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::rc::Rc;

let mut five = Rc::<u32>::new_uninit();

// Deferred initialization:
Rc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)

//
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::rc::Rc;

let mut values = Rc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Rc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])

//Rc::as_ptr()
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let y = Rc::clone(&x);
let x_ptr = Rc::as_ptr(&x);
assert_eq!(x_ptr, Rc::as_ptr(&y));
assert_eq!(unsafe { &*x_ptr }, "hello");

