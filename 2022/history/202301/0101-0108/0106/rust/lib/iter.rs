//Iteratorとは、要素を順番に返すオブジェクトのこと
pub trait Iterator {
    type Item;
}

//iter()とは、Optionの値をイテレータに変換するためのメソッドのこと
let a = [1, 2, 3];

let mut iter = a.iter();

//iter_next_chunkとは、イテレータの要素をチャンクに分割するためのメソッドのこと
#![feature(iter_next_chunk)]

let mut iter = "lorem".chars();

//count()とは、イテレータの要素の数を返すためのメソッドのこと
let a = [1, 2, 3];
assert_eq!(a.iter().count(), 3);

let a = [1, 2, 3, 4, 5];
assert_eq!(a.iter().count(), 5);

//nth()とは、イテレータのn番目の要素を返すためのメソッドのこと
let a = [1, 2, 3];
let mut iter = a.iter();

//iter_advance_byとは、イテレータの要素をn個進めるためのメソッドのこと
//advance_by()とは、イテレータの要素をn個進めるためのメソッドのこと
#![feature(iter_advance_by)]

let a = [1, 2, 3, 4];
let mut iter = a.iter();

assert_eq!(iter.advance_by(2), Ok(()));
assert_eq!(iter.next(), Some(&3));
assert_eq!(iter.advance_by(0), Ok(()));
assert_eq!(iter.advance_by(100), Err(1)); 

//where とは、ジェネリクスの制約を指定するためのキーワードのこと
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

//step_by(2)とは、イテレータの要素を2個飛ばしで返すためのメソッドのこと
let a = [0, 1, 2, 3, 4, 5];
let mut iter = a.iter().step_by(2);

assert_eq!(iter.next(), Some(&0));
assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), Some(&4));
assert_eq!(iter.next(), None);

//chain(s2)とは、イテレータを連結するためのメソッドのこと
let s1 = &[1, 2, 3];
let s2 = &[4, 5, 6];

let mut iter = s1.iter().chain(s2);

//zip()とは、2つのイテレータを結合するためのメソッドのこと
let a1 = [1, 2, 3];
let a2 = [4, 5, 6];

let mut iter = a1.iter().zip(a2.iter());

assert_eq!(iter.next(), Some((&1, &4)));
assert_eq!(iter.next(), Some((&2, &5)));
assert_eq!(iter.next(), Some((&3, &6)));
assert_eq!(iter.next(), None);

//enumerate()とは、イテレータの要素にインデックスを付与するためのメソッドのこと
//zipperとは、2つのイテレータを結合するためのメソッドのこと
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

//iter_intersperseとは、イテレータの要素を指定した値で区切るためのメソッドのこと
#![feature(iter_intersperse)]

let hello = ["Hello", "World", "!"].iter().copied().intersperse(" ").collect::<String>();
assert_eq!(hello, "Hello World !");

//collect()とは、イテレータの要素を集めるためのメソッドのこと

//Debugとは、デバッグ用のトレイトのこと
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

//map(|x| 2 * x)とは、イテレータの要素を2倍にするためのメソッドのこと
let a = [1, 2, 3];

let mut iter = a.iter().map(|x| 2 * x);

assert_eq!(iter.next(), Some(2));
assert_eq!(iter.next(), Some(4));
assert_eq!(iter.next(), Some(6));
assert_eq!(iter.next(), None);

//filter(|x| x % 2 == 0)とは、イテレータの要素を偶数にするためのメソッドのこと

//mpscとは、マルチプロデューサー・シングルコンシューマーの略で、複数のスレッドから1つのスレッドにデータを送るための機能のこと
use std::sync::mpsc::channel;

let (tx, rx) = channel();
(0..5).map(|x| x * 2 + 1)
      .for_each(move |x| tx.send(x).unwrap());

let v: Vec<_> =  rx.iter().collect();
assert_eq!(v, vec![1, 3, 5, 7, 9]);

//
let a = [0, 1, 2];

let mut iter = a.iter().filter(|&x| *x > 1); // both & and *

assert_eq!(iter.next(), Some(&2));
assert_eq!(iter.next(), None);

//iter().peekable()とは、イテレータの要素を先読みするためのメソッドのこと
let xs = [1, 2, 3];

let mut iter = xs.iter().peekable();

//peekable()とは、イテレータの要素を先読みするためのメソッドのこと
let xs = [1, 2, 3];

let mut iter = xs.iter().peekable();

// peek_mut()とは、イテレータの要素を先読みして、値を変更するためのメソッドのこと
`peek_mut()` lets us see into the future
assert_eq!(iter.peek_mut(), Some(&mut &1));
assert_eq!(iter.peek_mut(), Some(&mut &1));
assert_eq!(iter.next(), Some(&1));

if let Some(mut p) = iter.peek_mut() {
    assert_eq!(*p, &2);
    // put a value into the iterator
    *p = &1000;
}

// The value reappears as the iterator continues
assert_eq!(iter.collect::<Vec<_>>(), vec![&1000, &3]);

//iter.by_ref()
//take_while(|n| **n != 3)とは、イテレータの要素を3まで取得するためのメソッドのこと
//cloned()とは、イテレータの要素を複製するためのメソッドのこと
//collect()とは、イテレータの要素を集めるためのメソッドのこと
let a = [1, 2, 3, 4];
let mut iter = a.iter();

let result: Vec<i32> = iter.by_ref()
                           .take_while(|n| **n != 3)
                           .cloned()
                           .collect();

assert_eq!(result, &[1, 2]);

let result: Vec<i32> = iter.cloned().collect();

assert_eq!(result, &[4]);

//Sizedとは、型のサイズがコンパイル時に決定できることを示すトレイトのこと
pub trait PartialEq<Rhs = Self>
where
    Rhs: ?Sized,
{
    fn eq(&self, other: &Rhs) -> bool;

    fn ne(&self, other: &Rhs) -> bool { ... }
}

//
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

struct Book {
    isbn: i32,
    format: BookFormat,
}

impl PartialEq for Book {
    fn eq(&self, other: &Self) -> bool {
        self.isbn == other.isbn
    }
}

let b1 = Book { isbn: 3, format: BookFormat::Paperback };
let b2 = Book { isbn: 3, format: BookFormat::Ebook };
let b3 = Book { isbn: 10, format: BookFormat::Paperback };

assert!(b1 == b2);
assert!(b1 != b3);
