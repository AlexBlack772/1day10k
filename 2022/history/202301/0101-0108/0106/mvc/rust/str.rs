//
let mut hello = String::from("Hello, ");

hello.push('w');
hello.push_str("orld!");

//
fn takes_str(s: &str) { }

let s = String::from("Hello");

takes_str(&s);

//
use std::mem;

let story = String::from("Once upon a time...");

// Prevent automatically dropping the String's data
let mut story = mem::ManuallyDrop::new(story);

let ptr = story.as_mut_ptr();
let len = story.len();
let capacity = story.capacity();

// story has nineteen bytes
assert_eq!(19, len);

// We can re-build a String out of ptr, len, and capacity. This is all
// unsafe because we are responsible for making sure the components are
// valid:
let s = unsafe { String::from_raw_parts(ptr, len, capacity) } ;

assert_eq!(String::from("Once upon a time..."), s);

//
let mut s = String::with_capacity(25);

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}

//
let mut s = String::with_capacity(10);

// The String contains no chars, even though it has capacity for more
assert_eq!(s.len(), 0);

// These are all done without reallocating...
let cap = s.capacity();
for _ in 0..10 {
    s.push('a');
}

assert_eq!(s.capacity(), cap);

// ...but this may make the string reallocate
s.push('a');

//
let mut s = String::from("f_o_ob_ar");

s.retain(|c| c != '_');

assert_eq!(s, "foobar");

//
let mut s = String::from("hello");

unsafe {
    let vec = s.as_mut_vec();
    assert_eq!(&[104, 101, 108, 108, 111][..], &vec[..]);

    vec.reverse();
}
assert_eq!(s, "olleh");

//
let mut array: [i32; 3] = [0; 3];

array[1] = 1;
array[2] = 2;

assert_eq!([1, 2], &array[1..]);

// This loop prints: 0 1 2
for x in array {
    print!("{x} ");
}

//
let array: [i32; 3] = [0; 3];

// This iterates by reference:
for item in array.iter().enumerate() {
    let (i, x): (usize, &i32) = item;
    println!("array[{i}] = {x}");
}

// This iterates by value:
for item in array.into_iter().enumerate() {
    let (i, x): (usize, i32) = item;
    println!("array[{i}] = {x}");
}

//
use std::collections::BTreeMap;

let map1 = BTreeMap::from([(1, 2), (3, 4)]);
let map2: BTreeMap<_, _> = [(1, 2), (3, 4)].into();
assert_eq!(map1, map2);

//
use std::collections::BTreeSet;

let set1 = BTreeSet::from([1, 2, 3, 4]);
let set2: BTreeSet<_> = [1, 2, 3, 4].into();
assert_eq!(set1, set2);

//
