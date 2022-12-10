

struct account {
    name: String,
    balance: i32,
}

struct Person {
    name: String,
    age: i32,
    thing: str[],
    money: i32,
}

fn main() {
    let mut account = account {
        name: String::from(""),
        balance: 0,
    };
    let mut person = Person {
        name: String::from(""),
        age: 0,
        thing: str[],
        money: 0,
    };
    println!("Hello, world!");
    println!("What is your name?");
    let mut name = String::new();
    io::stdin().read_line(&mut name).expect("Failed to read line");
    println!("Hello, {}!", name);
    println!("How old are you?");
    let mut age = String::new();
    io::stdin().read_line(&mut age).expect("Failed to read line");
    println!("You are {} years old!", age);
    println!("How much money do you have?");
    let mut money = String::new();
    io::stdin().read_line(&mut money).expect("Failed to read line");
    println!("You have {} yen!", money);
    println!("What is your account name?");
    let mut account_name = String::new();
    io::stdin().read_line(&mut account_name).expect("Failed to read line");
    println!("Your account name is {}!", account_name);
    println!("How much money do you have in your account?");
    let mut account_money = String::new();
    io::stdin().read_line(&mut account_money).expect("Failed to read line");
    println!("You have {} yen in your account!", account_money);
    println!("What do you want to do?");
    println!("1. Deposit");
    println!("2. Withdraw");
    println!("3. Transfer");
    println!("4. Check balance");
    println!("5. Exit");
    let mut choice = String::new();
    io::stdin().read_line(&mut choice).expect("Failed to read line");
    println!("You chose {}!", choice);
    if choice == "1" {
        println!("How much money do you want to deposit?");
        let mut deposit = String::new();
        io::stdin().read_line(&mut deposit).expect("Failed to read line");
        println!("You deposited {} yen!", deposit);
        println!("Your balance is {} yen!", account_money + deposit);
    } else if choice == "2" {
        println!("How much money do you want to withdraw?");
        let mut withdraw = String::new();
        io::stdin

    }
}

#[derive(Debug)]
struct Account {
    name: String,
    balance: i32,
}

test = Account {
    name: String::from(""),
    balance: 0,
};

fn 
