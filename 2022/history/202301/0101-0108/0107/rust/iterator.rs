//iter.next()とは、イテレータの次の値を返すメソッドです。
let a = [1, 2, 3];

let mut iter = a.iter();

// A call to next() returns the next value...
assert_eq!(Some(&1), iter.next());
assert_eq!(Some(&2), iter.next());
assert_eq!(Some(&3), iter.next());

// ... and then None once it's over.
assert_eq!(None, iter.next());

// More calls may or may not return `None`. Here, they always will.
assert_eq!(None, iter.next());
assert_eq!(None, iter.next());

//
// The even numbers in the range of zero to nine.
let iter = (0..10).filter(|x| x % 2 == 0);

// We might iterate from zero to ten times. Knowing that it's five
// exactly wouldn't be possible without executing filter().
assert_eq!((0, Some(10)), iter.size_hint());

// Let's add five more numbers with chain()
let iter = (0..10).filter(|x| x % 2 == 0).chain(15..20);

// now both bounds are increased by five
assert_eq!((5, Some(15)), iter.size_hint());

//iter().last()とは、イテレータの最後の値を返すメソッドです。
let a = [1, 2, 3];
assert_eq!(a.iter().last(), Some(&3));

let a = [1, 2, 3, 4, 5];
assert_eq!(a.iter().last(), Some(&5));

let a = [1, 2, 3];

let mut iter = a.iter();

assert_eq!(iter.nth(1), Some(&2));
assert_eq!(iter.nth(1), None);

//
fn advance_n_and_return_first<I>(iter: &mut I, n: usize) -> Option<I::Item>
where
    I: Iterator,
{
    let next = iter.next();
    if n > 1 {
        iter.nth(n - 2);
    }
    next
}

//
fn zip <U>(self, other: U) -> Zip <Self, <U as IntoIterator >:: IntoIter >ⓘ

    Self: Sized、
    U : IntoIterator、

//
let enumerate: Vec<_> = "foo".chars().enumerate().collect();

let zipper: Vec<_> = (0..).zip("foo".chars()).collect();

assert_eq!((0, 'f'), enumerate[0]);
assert_eq!((0, 'f'), zipper[0]);

assert_eq!((1, 'o'), enumerate[1]);
assert_eq!((1, 'o'), zipper[1]);

assert_eq!((2, 'o'), enumerate[2]);
assert_eq!((2, 'o'), zipper[2]);

//
use std::iter::zip;

let a = [1, 2, 3];
let b = [2, 3, 4];

let mut zipped = zip(
    a.into_iter().map(|x| x * 2).skip(1),
    b.into_iter().map(|x| x * 2).skip(1),
);

assert_eq!(zipped.next(), Some((4, 6)));
assert_eq!(zipped.next(), Some((6, 8)));
assert_eq!(zipped.next(), None);

//iter_intersperseとは、イテレータの要素の間に、指定した値を挿入するメソッドです。
#![feature(iter_intersperse)]

let hello = ["Hello", "World", "!"].iter().copied().intersperse(" ").collect::<String>();
assert_eq!(hello, "Hello World !");

//Debugとは、デバッグ用の情報を出力するメソッドです。
#![feature(iter_intersperse)]

#[derive(PartialEq, Debug)]
struct NotClone(usize);

let v = [NotClone(0), NotClone(1), NotClone(2)];
let mut it = v.into_iter().intersperse_with(|| NotClone(99));

assert_eq!(it.next(), Some(NotClone(0)));  // The first element from `v`.
assert_eq!(it.next(), Some(NotClone(99))); // The separator.
assert_eq!(it.next(), Some(NotClone(1)));  // The next element from `v`.
assert_eq!(it.next(), Some(NotClone(99))); // The separator.
assert_eq!(it.next(), Some(NotClone(2)));  // The last element from `v`.
assert_eq!(it.next(), None);  

//
let a = [1, 2, 3];

let mut iter = a.iter().map(|x| 2 * x);

assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), Some(4));
assert_eq!(iter.next(), Some(6));
assert_eq!(iter.next(), None);

//std::sync::mpsc::channelとは、複数のスレッド間でメッセージをやり取りするためのメソッドです。
use std::sync::mpsc::channel;

let (tx, rx) = channel();
(0..5).map(|x| x * 2 + 1)
      .for_each(move |x| tx.send(x).unwrap());

let v: Vec<_> =  rx.iter().collect();
assert_eq!(v, vec![1, 3, 5, 7, 9]);

//iter().filter(|x| **x > 1)とは、イテレータの要素をフィルタリングするメソッドです。
let a = [0, 1, 2];

let mut iter = a.iter().filter(|x| **x > 1); // need two *s!

assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), None);

//
let a = [0, 1, 2];

let mut iter = a.iter().filter(|&x| *x > 1); // both & and *

assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), None);

//
let a = ["1", "two", "NaN", "four", "5"];
let mut iter = a.iter().map(|s| s.parse()).filter(|s| s.is_ok()).map(|s| s.unwrap());
assert_eq!(iter.next(), Some(1));
assert_eq!(iter.next(), Some(5));
assert_eq!(iter.next(), None);

//
let xs = [1, 2, 3];

let mut iter = xs.iter().peekable();

// peek() lets us see into the future
assert_eq!(iter.peek(), Some(&&1));
assert_eq!(iter.next(), Some(&1));

assert_eq!(iter.next(), Some(&2));

// we can peek() multiple times, the iterator won't advance
assert_eq!(iter.peek(), Some(&&3));
assert_eq!(iter.peek(), Some(&&3));

assert_eq!(iter.next(), Some(&3));

// after the iterator is finished, so is peek()
assert_eq!(iter.peek(), None);
assert_eq!(iter.next(), None);

