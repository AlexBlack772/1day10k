//Rc<T>とは、複数の所有者を持つことができる参照カウント型です。
pub struct Rc<T>
where
    T: ?Sized,
{ /* private fields */ }

//Rc::new_cyclic(|me|とは、Rc::new()と同じように、Rc<T>を作成します。
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

//get_mut_uncheckedとは、Rc<T>の参照カウントを1減らし、Rc<T>の参照を返します。
#![feature(new_uninit)]
#![feature(get_mut_unchecked)]

use std::rc::Rc;

let mut five = Rc::<u32>::new_uninit();

// Deferred initialization:
Rc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)

//std::rc::Rcとは、複数の所有者を持つことができる参照カウント型です。
use std::rc::Rc;

let x = Rc::new(3);
assert_eq!(Rc::try_unwrap(x), Ok(3));

let x = Rc::new(4);
let _y = Rc::clone(&x);
assert_eq!(*Rc::try_unwrap(x).unwrap_err(), 4);


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

//Rc::into_raw()とは、Rc<T>を*mut Tに変換します。
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let x_ptr = Rc::into_raw(x);
assert_eq!(unsafe { &*x_ptr }, "hello");

//Rc::clone()とは、Rc<T>の参照カウントを1増やし、Rc<T>の参照を返します。
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let y = Rc::clone(&x);
let x_ptr = Rc::as_ptr(&x);
assert_eq!(x_ptr, Rc::as_ptr(&y));
assert_eq!(unsafe { &*x_ptr }, "hello");

//
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let x_ptr = Rc::into_raw(x);

unsafe {
    // Convert back to an `Rc` to prevent leak.
    let x = Rc::from_raw(x_ptr);
    assert_eq!(&*x, "hello");

    // Further calls to `Rc::from_raw(x_ptr)` would be memory-unsafe.
}

//downgradeとは、Rc<T>をWeak<T>に変換します。
use std::rc::Rc;

let five = Rc::new(5);

let weak_five = Rc::downgrade(&five);

//Rc::weak_count()とは、Rc<T>の弱い参照の数を返します。
use std::rc::Rc;

let five = Rc::new(5);
let _weak_five = Rc::downgrade(&five);

assert_eq!(1, Rc::weak_count(&five));

//
use std::rc::Rc;

let five = Rc::new(5);
let _also_five = Rc::clone(&five);

assert_eq!(2, Rc::strong_count(&five));

//Rc::into_raw()は、Rc<T>を*mut Tに変換します。
use std::rc::Rc;

let five = Rc::new(5);

unsafe {
    let ptr = Rc::into_raw(five);
    Rc::increment_strong_count(ptr);

    let five = Rc::from_raw(ptr);
    assert_eq!(2, Rc::strong_count(&five));
}

//
use std::rc::Rc;

let five = Rc::new(5);

unsafe {
    let ptr = Rc::into_raw(five);
    Rc::increment_strong_count(ptr);

    let five = Rc::from_raw(ptr);
    assert_eq!(2, Rc::strong_count(&five));
    Rc::decrement_strong_count(ptr);
    assert_eq!(1, Rc::strong_count(&five));
}

//Rc::get_mut()とは、Rc<T>の参照カウントが1の場合に、Rc<T>の参照を返します。
use std::rc::Rc;

let mut x = Rc::new(3);
*Rc::get_mut(&mut x).unwrap() = 4;
assert_eq!(*x, 4);

let _y = Rc::clone(&x);
assert!(Rc::get_mut(&mut x).is_none());

//
#![feature(get_mut_unchecked)]

use std::rc::Rc;

let mut x = Rc::new(String::new());
unsafe {
    Rc::get_mut_unchecked(&mut x).push_str("foo")
}
assert_eq!(*x, "foo");

//
use std::rc::Rc;

let mut data = Rc::new(5);

*Rc::make_mut(&mut data) += 1;         // Won't clone anything
let mut other_data = Rc::clone(&data); // Won't clone inner data
*Rc::make_mut(&mut data) += 1;         // Clones inner data
*Rc::make_mut(&mut data) += 1;         // Won't clone anything
*Rc::make_mut(&mut other_data) *= 2;   // Won't clone anything

// Now `data` and `other_data` point to different allocations.
assert_eq!(*data, 8);
assert_eq!(*other_data, 12);

//
#![feature(arc_unwrap_or_clone)]
let inner = String::from("test");
let ptr = inner.as_ptr();

let rc = Rc::new(inner);
let inner = Rc::unwrap_or_clone(rc);
// The inner value was not cloned
assert!(ptr::eq(ptr, inner.as_ptr()));
pub enum Option<T> {
    None,
    Some(T),
}
let rc = Rc::new(inner);
let rc2 = rc.clone();
let inner = Rc::unwrap_or_clone(rc);
// Because there were 2 references, we had to clone the inner value.
assert!(!ptr::eq(ptr, inner.as_ptr()));
// `rc2` is the last reference, so when we unwrap it we get back
// the original `String`.
let inner = Rc::unwrap_or_clone(rc2);
assert!(ptr::eq(ptr, inner.as_ptr()));