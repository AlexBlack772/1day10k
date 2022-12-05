use io::stdin

fn syoumei() -> String {
    let mut syoumei = String::new();
    println!("input name");
    io::stdin().read_line(&mut syoumei).expect("input name");
}

fn takuhai() -> String {
    let mut takuhai = String::new();
    println!("input address");
    io::stdin().read_line(&mut takuhai).expect("input address");
}

fn yuubin() -> String {
    let mut yuubin = String::new();
    println!("input postal code");
    io::stdin().read_line(&mut yuubin).expect("input postal code");
}

fn  signnature() -> String {
    let mut signnature = String::new();
    println!("input signnature");
    io::stdin().read_line(&mut signnature).expect("input signnature");
}

if signnature == "ok" {
    println!("ok");
} else {
    println!("no");
}

loop test {
    let mut test = String::new();
    println!("input test");
    io::stdin().read_line(&mut test).expect("input test");
}

