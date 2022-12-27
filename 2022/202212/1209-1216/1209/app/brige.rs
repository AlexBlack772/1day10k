

fn withdraw (price: i32) -> i32 {
    if Person.money < price {
        println!("You don't have enough money");
    } else {
          Person.money = Person.money - price;
          
    }
}

fn deposit (price: i32) -> i32 {
    if Person.money < price {
        println!("You don't have enough money");
    } else {
          Person.money = Person.money - price;
          
    }
}

fn 