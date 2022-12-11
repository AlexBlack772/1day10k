
fn withdraw(account: &mut Account, amount: i32) -> i32 {
    account.balance -= amount;
}

fn deposit(account: &mut Account, amount: i32) -> i32 {
    account.balance += amount;
}

fn check(account: &Account) -> i32 {
    account.balance
}

fn balanceof(account: &Account) -> i32 {
    account.balance
}

fn main() {
    let mut account = Account {
        balance: 0,
        name: String::from("numal"),
        time: 0,
    };
    deposit(&mut account, 100);
    withdraw(&mut account, 50);
    println!("{} {}", account.balance, account.name);
}

struct Account {
    balance: i32,
    name: String,
    time: i32,
}

