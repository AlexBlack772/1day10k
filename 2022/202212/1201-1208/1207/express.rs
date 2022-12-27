fn add(str: &str) -> String {
    let mut sum = 0;
    for c in str.chars() {
        sum += c.to_digit(10).unwrap();
    }
    sum.to_string()
}

match add("123") {
    ref x if x.len() == 1 => println!("one digit: {}", x),
    ref x => println!("{} digits: {}", x.len(), x),
}

#[derive(Debug)]

struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let point = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = point;

    assert_eq!(0, a);
    assert_eq!(7, b);

    println!("Point {{ x: {}, y: {} }}", point.x, point.y);
}

