//
use std::collections::HashMap;

// Type inference lets us omit an explicit type signature (which
// would be `HashMap<String, String>` in this example).
let mut book_reviews = HashMap::new();

// Review some books.
book_reviews.insert(
    "Adventures of Huckleberry Finn".to_string(),
    "My favorite book.".to_string(),
);
book_reviews.insert(
    "Grimms' Fairy Tales".to_string(),
    "Masterpiece.".to_string(),
);
book_reviews.insert(
    "Pride and Prejudice".to_string(),
    "Very enjoyable.".to_string(),
);
book_reviews.insert(
    "The Adventures of Sherlock Holmes".to_string(),
    "Eye lyked it alot.".to_string(),
);

// Check for a specific one.
// When collections store owned values (String), they can still be
// queried using references (&str).
if !book_reviews.contains_key("Les Misérables") {
    println!("We've got {} reviews, but Les Misérables ain't one.",
             book_reviews.len());
}

// oops, this review has a lot of spelling mistakes, let's delete it.
book_reviews.remove("The Adventures of Sherlock Holmes");

// Look up the values associated with some keys.
let to_find = ["Pride and Prejudice", "Alice's Adventure in Wonderland"];
for &book in &to_find {
    match book_reviews.get(book) {
        Some(review) => println!("{book}: {review}"),
        None => println!("{book} is unreviewed.")
    }
}

// Look up the value for a key (will panic if the key is not found).
println!("Review for Jane: {}", book_reviews["Pride and Prejudice"]);

// Iterate over everything.
for (book, review) in &book_reviews {
    println!("{book}: \"{review}\"");
}

//std::collections::HashMapとは、ハッシュマップを作成することができる。
use std::collections::HashMap;

let solar_distance = HashMap::from([
    ("Mercury", 0.4),
    ("Venus", 0.7),
    ("Earth", 1.0),
    ("Mars", 1.5),
]);

//derive(Hash, Eq, PartialEq, Debug)を使用すると、ハッシュマップを作成することができる。
use std::collections::HashMap;

#[derive(Hash, Eq, PartialEq, Debug)]
struct Viking {
    name: String,
    country: String,
}

impl Viking {
    /// Creates a new Viking.
    fn new(name: &str, country: &str) -> Viking {
        Viking { name: name.to_string(), country: country.to_string() }
    }
}

// Use a HashMap to store the vikings' health points.
let vikings = HashMap::from([
    (Viking::new("Einar", "Norway"), 25),
    (Viking::new("Olaf", "Denmark"), 24),
    (Viking::new("Harald", "Iceland"), 12),
]);

// Use derived implementation to print the status of the vikings.
for (viking, health) in &vikings {
    println!("{viking:?} has {health} hp");
}

//&とは、参照を表す。
use std::collections::HashMap;
let mut map: HashMap<&str, i32> = HashMap::with_capacity(10);


use std::collections::HashMap;
use std::collections::hash_map::RandomState;

let s = RandomState::new();
let mut map = HashMap::with_hasher(s);
map.insert(1, 2);


//
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

for key in map.keys() {
    println!("{key}");
}

//
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

let mut vec: Vec<&str> = map.into_keys().collect();
// The `IntoKeys` iterator produces keys in arbitrary order, so the
// keys must be sorted to test them against a sorted array.
vec.sort_unstable();
assert_eq!(vec, ["a", "b", "c"]);

//
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

for val in map.values() {
    println!("{val}");
}

//*とは、参照外し演算子。
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

for val in map.values_mut() {
    *val = *val + 10;
}

for val in map.values() {
    println!("{val}");
}

//
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

for (key, val) in map.iter() {
    println!("key: {key} val: {val}");
}

//
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

// Update all values
for (_, val) in map.iter_mut() {
    *val *= 2;
}

for (key, val) in &map {
    println!("key: {key} val: {val}");
}


//insert(）とは、ハッシュマップに値を挿入する。
use std::collections::HashMap;

let mut a = HashMap::new();
assert_eq!(a.len(), 0);
a.insert(1, "a");
assert_eq!(a.len(), 1);

//

use std::collections::HashMap;

let mut a = HashMap::new();
assert!(a.is_empty());
a.insert(1, "a");
assert!(!a.is_empty());

//hash_drain_filterとは、ハッシュマップから要素を削除する。
#![feature(hash_drain_filter)]
use std::collections::HashMap;

let mut map: HashMap<i32, i32> = (0..8).map(|x| (x, x)).collect();
let drained: HashMap<i32, i32> = map.drain_filter(|k, _v| k % 2 == 0).collect();

let mut evens = drained.keys().copied().collect::<Vec<_>>();
let mut odds = map.keys().copied().collect::<Vec<_>>();
evens.sort();
odds.sort();

assert_eq!(evens, vec![0, 2, 4, 6]);
assert_eq!(odds, vec![1, 3, 5, 7]);

//
use std::collections::HashMap;

let mut map: HashMap<i32, i32> = (0..8).map(|x| (x, x*10)).collect();
map.retain(|&k, _| k % 2 == 0);
assert_eq!(map.len(), 4);

