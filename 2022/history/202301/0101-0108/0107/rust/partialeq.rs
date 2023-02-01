//PartialEq<>とは、等価性を比較するためのトレイトです。
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

//Cloneとは、複製を作成するためのトレイトです。
pub trait Clone: Sized {
    fn clone(&self) -> Self;

    fn clone_from(&mut self, source: &Self) { ... }
}

//Generate<T>とは、T型の値を生成するための構造体です。
struct Generate<T>(fn() -> T);

impl<T> Copy for Generate<T> {}

impl<T> Clone for Generate<T> {
    fn clone(&self) -> Self {
        *self
    }
}

//