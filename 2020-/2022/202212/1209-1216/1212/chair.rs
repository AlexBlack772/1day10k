fn sit () -> bool {
    true
}

fn main() {
    let chair = Chair {
        legs: 4,
        color: "brown".to_string(),
    };
    println!("Chair has {} legs", chair.legs);
    println!("Chair is {}", chair.color);
    println!("Can I sit on the chair? {}", chair.sit());
}

