let mut kinri = 0.1;
let mut price = 100;

struct account {
    money: i32,
}

struct Person {
    name: String,
    age: i32,
    thing: str[],
    price: i32,
}

fn kakakuUp (price: i32) -> i32 {
    price = price + 1;
}

fn kakakuDown (price: i32) -> i32 {
    price = price - 1;
}


fn sikinteiyou (price: i32) -> i32 {
    if Person.money < price {
        println!("You don't have enough money");
    } else {
          Person.money = Person.money - price;
          
    }
}

fn kinriUp (price: i32) -> i32 {
    kinri = kinri + 1;
}

fn kinriDown (price: i32) -> i32 {
    kinri = kinri - 1;
}


impl account {
    fn new(money: i32) -> account {
        account {
            money: money,
        }
    }
}

trait account {
    fn new(money: i32) -> account;
}

fn main() {
    let mut account = account::new(100);
    let mut Person = Person::new("John", 20, "book", 100);
    let mut price = 100;
    let mut kinri = 0.1;
}
