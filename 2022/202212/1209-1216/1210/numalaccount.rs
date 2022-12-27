

struct Account {
    balance: i32,
    name: String,
    time: i32,
}

fn deposit (account: &mut Account, amount: i32)-> i32 {
    account.balance += amount;
}

fn withdraw (account: &mut Account, amount: i32)-> i32 {
    account.balance -= amount;
}

fn kariire(account: &mut Account, amount: i32)-> i32 {
    account.balance += amount;
    account.balance -= amount;
}

fn main() {
    let mut account = Account {
        balance: 0,
        name: String::from("numal"),
        time: 0,
    };
    deposit(&mut account, 100);
    withdraw(&mut account, 50);
    kariire(&mut account, 100);
    println!("{} {}", account.balance, account.name);
}


fn 