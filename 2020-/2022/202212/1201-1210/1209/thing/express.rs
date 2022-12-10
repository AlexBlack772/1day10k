trait block {
    fn block(&self) -> bool;
}

impl block for bool {
    fn block(&self) -> bool {
        *self
    }
}

fn main() {
    let b = true;
    let c = b.block();
    println!("{}", c);
}

async fn main() {
    let b = true;
    let c = b.block();
    println!("{}", c);
}


await b.block();

const fn block() -> bool {
    true
}

loop {
    if b.block() {
        break;
    }


continue 'a;

break
}

for i in 0..10 {
    if b.block() {
        break;
    }
}

while b.block() {
    break;
}

match b.block() {
    true => break,
    false => continue,
}

impl block for bool {
    fn block(&self) -> bool {
        *self
    }
}

let b = true;

move || {
    b.block();
}

let mut b = true;

move || {
    b.block();
}

pub fn block(&self) -> bool {
    *self
}

self -> &Self
static -> &'static Self

self -> &mut Self

struct block {
    b: bool,
}

impl block {
    fn block(&self) -> bool {
        self.b
    }
}

type block = bool;

use std::ops::Deref;
use std::ops::DerefMut;

struct block(bool);

impl Deref for block {
    type Target = bool;

    fn deref(&self) -> &bool {
        &self.0
    }
}

unsafe impl Send for block {}

unsafe impl Sync for block {}

impl DerefMut for block {
    fn deref_mut(&mut self) -> &mut bool {
        &mut self.0
    }
}


