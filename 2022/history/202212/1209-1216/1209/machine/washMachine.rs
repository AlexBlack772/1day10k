
use vendinfmachine.rs::VendingMachine;

trait Machine {
    fn buy(price: i32) -> i32;
}

bool isWashing = false;

struct Person {
    name: String,
    age: i32,
    thing: str[],
    money: i32,
}

trait Wash {
    fn wash(price: i32) -> i32;
}

enum price {
    small = 100,
    medium = 200,
    large = 300,
}

fn wash (price: i32) -> i32 {
   if Person.money < price {
       println!("You don't have enough money");
   } else {
         isWashing = true;
   }
}


fn kansou (price: i32) -> i32 {
   if Person.money < price {
       println!("You don't have enough money");
   } else {
         Person.money = Person.money - price;
         
   }
}

match price {
    small => println!("small"),
    medium => println!("medium"),
    large => println!("large"),
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}



