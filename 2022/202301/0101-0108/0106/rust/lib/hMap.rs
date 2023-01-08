//hashmapとは、キーと値のペアを格納するデータ構造です。
use std::collections::HashMap;

let solar_distance = HashMap::from([
    ("Mercury", 0.4),
    ("Venus", 0.7),
    ("Earth", 1.0),
    ("Mars", 1.5),
]);

// random_stat_buffとは、ランダムな値を返す関数です。
use std::collections::HashMap;

// type inference lets us omit an explicit type signature (which
// would be `HashMap<&str, u8>` in this example).
let mut player_stats = HashMap::new();

fn random_stat_buff() -> u8 {
    // could actually return some random value here - let's just return
    // some fixed value for now
    42
}

// insert a key only if it doesn't already exist
player_stats.entry("health").or_insert(100);

// insert a key using a function that provides a new value only if it
// doesn't already exist
player_stats.entry("defence").or_insert_with(random_stat_buff);

// update a key, guarding against the key possibly not being set
let stat = player_stats.entry("attack").or_insert(100);
*stat += random_stat_buff();

// modify an entry before an insert with in-place mutation
player_stats.entry("mana").and_modify(|mana| *mana += 200).or_insert(100);

//Hashとは、キーと値のペアを格納するデータ構造です。
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

//RandomStateとは、ランダムな値を返す関数です。
use std::collections::HashMap;
use std::collections::hash_map::RandomState;

let s = RandomState::new();
let mut map = HashMap::with_hasher(s);
map.insert(1, 2);

//for key in map.keys()とは、mapのキーを取得する関数です。
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

for key in map.keys() {
    println!("{key}");
}

//Vec<&str>とは、文字列のベクターです。
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

